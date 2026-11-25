# Renders the PHP site to static HTML for Netlify (no PHP at runtime).
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$Pub = Join-Path $Root "build\netlify"
$PublicDir = Join-Path $Root "public"

Write-Host "Building static site for Netlify..."

if (Test-Path $Pub) {
    Remove-Item -Recurse -Force $Pub
}
New-Item -ItemType Directory -Path $Pub -Force | Out-Null

Copy-Item -Path (Join-Path $PublicDir "assets") -Destination (Join-Path $Pub "assets") -Recurse -Force

Push-Location $PublicDir
try {
    $html = & php index.php
    if ($LASTEXITCODE -ne 0) {
        throw "php index.php failed with exit code $LASTEXITCODE"
    }
    [System.IO.File]::WriteAllText((Join-Path $Pub "index.html"), $html, [System.Text.UTF8Encoding]::new($false))
} finally {
    Pop-Location
}

$redirects = @"
# SPA-style single page; optional clean URLs for assets stay as files.
/privacy-policy    /index.html   200
/terms-and-conditions    /index.html   200
"@
[System.IO.File]::WriteAllText((Join-Path $Pub "_redirects"), $redirects.Trim(), [System.Text.UTF8Encoding]::new($false))

Write-Host "Netlify publish directory: $Pub"
Write-Host "Netlify static build complete."