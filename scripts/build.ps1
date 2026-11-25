# Validates PHP and packages the site for deployment (excludes .git).
$ErrorActionPreference = "Stop"
$Root = Split-Path -Parent $PSScriptRoot
$OutDir = Join-Path $Root "build\package"
$ZipPath = Join-Path $Root "build\banu-kabi-cabs.zip"

Write-Host "Building Banu Kabi Cabs from $Root"

$phpFiles = Get-ChildItem -Path $Root -Recurse -Filter "*.php" -File |
    Where-Object { $_.FullName -notmatch '\\build\\' }

$failed = @()
foreach ($file in $phpFiles) {
    $lint = & php -l $file.FullName 2>&1
    if ($LASTEXITCODE -ne 0) {
        $failed += "$($file.FullName): $lint"
    }
}

if ($failed.Count -gt 0) {
    Write-Host "PHP syntax errors:" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host $_ }
    exit 1
}

Write-Host "PHP syntax check passed ($($phpFiles.Count) files)."

if (Test-Path $OutDir) {
    Remove-Item -Recurse -Force $OutDir
}
New-Item -ItemType Directory -Path $OutDir -Force | Out-Null

$excludeDirs = @('.git', 'build', 'node_modules', 'vendor')
Get-ChildItem -Path $Root -Force | Where-Object {
    $excludeDirs -notcontains $_.Name
} | ForEach-Object {
  Copy-Item -Path $_.FullName -Destination $OutDir -Recurse -Force
}

if (Test-Path $ZipPath) {
    Remove-Item -Force $ZipPath
}
$zipParent = Split-Path $ZipPath -Parent
if (-not (Test-Path $zipParent)) {
    New-Item -ItemType Directory -Path $zipParent -Force | Out-Null
}
Compress-Archive -Path (Join-Path $OutDir '*') -DestinationPath $ZipPath -Force

Write-Host "Package: $OutDir"
Write-Host "Archive: $ZipPath"
Write-Host "Build complete."