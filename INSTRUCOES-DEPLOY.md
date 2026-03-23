# Instruções para Deploy no GitHub Pages

## Pré-requisito: Git instalado

O Git não foi encontrado no seu sistema. Para fazer o deploy:

1. **Instale o Git**: https://git-scm.com/download/win  
2. Reinicie o terminal/PowerShell após a instalação.

---

## Opção 1: Usar o script (recomendado)

Com o Git instalado, abra o PowerShell na pasta do projeto e execute:

```powershell
.\deploy.ps1
```

---

## Opção 2: Comandos manuais

```powershell
cd "c:\Users\Júverson Lessa\Documents\Aplicações\badge"

# Primeira vez (inicializar repo)
git init
git branch -M main
git remote add origin https://github.com/juversonlessa/Badge.git

# Adicionar e enviar
git add .
git commit -m "Update: propagar mudanças"
git push -u origin main
```

---

## Se o repositório já existir no GitHub

Se o repo `juversonlessa/Badge` já tiver commits, você pode:

**A) Integrar com o histórico existente:**
```powershell
git pull origin main --allow-unrelated-histories
# Resolver conflitos se houver, depois:
git push -u origin main
```

**B) Substituir completamente (cuidado - apaga o histórico remoto):**
```powershell
git push -u origin main --force
```

---

## Configurar GitHub Pages

No repositório GitHub: **Settings → Pages**

- **Source**: Deploy from a branch  
- **Branch**: `main` / pasta: `/ (root)`  
- Salvar

Site: **https://juversonlessa.github.io/Badge/**
