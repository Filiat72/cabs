import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = path.join(root, "build", "netlify");
const publicDir = path.join(root, "public");

fs.rmSync(pub, { recursive: true, force: true });
fs.mkdirSync(pub, { recursive: true });
fs.cpSync(path.join(publicDir, "assets"), path.join(pub, "assets"), {
  recursive: true,
});

const result = spawnSync("php", ["index.php"], {
  cwd: publicDir,
  encoding: "utf8",
});

if (result.status !== 0) {
  console.error(result.stderr || result.stdout || "php index.php failed");
  process.exit(result.status ?? 1);
}

fs.writeFileSync(path.join(pub, "index.html"), result.stdout, "utf8");

const redirects = `# SPA-style single page
/privacy-policy    /index.html   200
/terms-and-conditions    /index.html   200
`;
fs.writeFileSync(path.join(pub, "_redirects"), redirects, "utf8");

console.log(`Netlify publish directory: ${pub}`);