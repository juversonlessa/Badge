# Servidor local padrao do projeto Badge (portfolio).
# Host e porta fixos para nao conflitar com outras apps (React 3000, Vite 5173, etc.).
$ListenUri = "tcp://127.0.0.1:3848"
Set-Location $PSScriptRoot
Write-Host "Badge: http://127.0.0.1:3848" -ForegroundColor Cyan
npx --yes serve . -l $ListenUri --no-port-switching -n
