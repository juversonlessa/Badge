# Deploy Badge para GitHub Pages
# Execute após instalar Git: https://git-scm.com/download/win

$ErrorActionPreference = "Stop"
$repoUrl = "https://github.com/juversonlessa/Badge.git"

Write-Host "=== Deploy Badge -> GitHub Pages ===" -ForegroundColor Cyan

# Verificar se Git está instalado
try {
    git --version | Out-Null
} catch {
    Write-Host "Git nao encontrado. Instale em: https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $projectDir

# Inicializar repo se nao existir
if (-not (Test-Path ".git")) {
    Write-Host "Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    git branch -M main
    git remote add origin $repoUrl
}

# Adicionar, commitar e enviar
git add .
$status = git status --short
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "Nenhuma alteracao para enviar." -ForegroundColor Yellow
    exit 0
}
git commit -m "Update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git push -u origin main

Write-Host "`nDeploy concluido! Site: https://juversonlessa.github.io/Badge/" -ForegroundColor Green
