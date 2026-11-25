import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "build", "netlify");
const publicDir = path.join(root, "public");
const templatesDir = path.join(root, "templates");

const templateChain = [
  path.join(templatesDir, "layout/header.php"),
  path.join(templatesDir, "sections/hero.php"),
  path.join(templatesDir, "sections/booking-form.php"),
  path.join(templatesDir, "sections/tariff.php"),
  path.join(templatesDir, "sections/fleet.php"),
  path.join(templatesDir, "sections/services.php"),
  path.join(templatesDir, "sections/about.php"),
  path.join(templatesDir, "sections/footer.php"),
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

/** Mirrors public/index.php includes without requiring PHP on CI. */
function renderTemplatesToHtml() {
  const vars = {};
  let html = "";

  for (const file of templateChain) {
    const raw = fs.readFileSync(file, "utf8");
    let chunk = raw.replace(/<\?php([\s\S]*?)\?>/g, (_, code) => {
      const asset = code.match(/\$assetVersion\s*=\s*'([^']+)'/);
      if (asset) vars.assetVersion = asset[1];
      const phone = code.match(/\$phoneNumber\s*=\s*'([^']+)'/);
      if (phone) vars.phoneNumber = phone[1];
      return "";
    });

    chunk = chunk.replaceAll(
      "<?php echo $assetVersion; ?>",
      () => vars.assetVersion ?? ""
    );
    chunk = chunk.replaceAll(
      "<?php echo htmlspecialchars($phoneNumber, ENT_QUOTES, 'UTF-8'); ?>",
      () => escapeHtml(vars.phoneNumber ?? "")
    );

    html += chunk;
  }

  html += `
<script src="assets/js/fleet.js"></script>

</body>
</html>
`;

  return html;
}

function renderWithPhp() {
  const result = spawnSync("php", ["index.php"], {
    cwd: publicDir,
    encoding: "utf8",
  });
  if (result.status !== 0) return null;
  return result.stdout;
}

fs.rmSync(pub, { recursive: true, force: true });
fs.mkdirSync(pub, { recursive: true });
fs.cpSync(path.join(publicDir, "assets"), path.join(pub, "assets"), {
  recursive: true,
});

const phpHtml = renderWithPhp();
const html = phpHtml ?? renderTemplatesToHtml();

if (!html?.trim()) {
  console.error("Static build produced empty HTML");
  process.exit(1);
}

fs.writeFileSync(path.join(pub, "index.html"), html, "utf8");

const redirects = `# SPA-style single page
/privacy-policy    /index.html   200
/terms-and-conditions    /index.html   200
`;
fs.writeFileSync(path.join(pub, "_redirects"), redirects, "utf8");

console.log(
  `Netlify publish directory: ${pub} (${phpHtml ? "php" : "node"} render)`
);