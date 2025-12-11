# Git Installation & GitHub Setup Guide

## 🚨 STEP 1: Install Git for Windows

### Download and Install
1. **Download Git**: https://git-scm.com/download/win
2. **Run the installer** (Git-2.xx.x-64-bit.exe)
3. **Important Installation Options**:
   - ✅ Select: **"Git from the command line and also from 3rd-party software"**
   - ✅ Select: **"Use Windows' default console window"**
   - ✅ Accept all other defaults

4. **Close ALL PowerShell windows** after installation
5. **Open a NEW PowerShell window**

### Verify Installation
```powershell
git --version
```
Expected output: `git version 2.43.0.windows.1` (or similar)

---

## 🔧 STEP 2: Configure Git (First Time Only)

```powershell
# Set your name (will appear in commits)
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

---

## 📦 STEP 3: Initialize Git Repository

```powershell
# Navigate to project root
cd d:\unphuc-crm

# Initialize Git repository
git init

# Add all files to staging
git add .

# Create first commit
git commit -m "Initial commit: UNPHUC CRM with Baileys WhatsApp integration"
```

---

## 🌐 STEP 4: Create GitHub Repository

### Option A: Via GitHub Website
1. Go to https://github.com/new
2. Repository name: `unphuc-crm`
3. Description: "WhatsApp AI CRM with Baileys integration"
4. Choose: **Private** or **Public**
5. **DO NOT** initialize with README, .gitignore, or license
6. Click **"Create repository"**

### Option B: Via GitHub CLI (if installed)
```powershell
gh repo create unphuc-crm --private --source=. --remote=origin
```

---

## 🚀 STEP 5: Push to GitHub

After creating the GitHub repository, you'll see commands like this:

```powershell
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/unphuc-crm.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username!**

---

## 🔐 STEP 6: Authentication

### If prompted for credentials:

**Option A: Personal Access Token (Recommended)**
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control of private repositories)
4. Copy the token
5. Use token as password when pushing

**Option B: GitHub CLI**
```powershell
# Install GitHub CLI
winget install --id GitHub.cli

# Authenticate
gh auth login
```

---

## 📝 Important Files to Verify

### Update .gitignore (if needed)
```
# Environment variables
.env
.env.local
backend/.env

# WhatsApp session files (SENSITIVE!)
backend/auth_info/

# Dependencies
node_modules/
backend/node_modules/

# Build outputs
dist/
dist-ssr/

# Logs
*.log
npm-debug.log*
```

---

## 🎯 Quick Reference Commands

### Daily Git Workflow
```powershell
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub
git push

# Pull latest changes
git pull
```

### View History
```powershell
# View commit history
git log --oneline

# View changes
git diff
```

---

## ⚠️ CRITICAL: Protect Sensitive Files

Make sure these are in `.gitignore`:
- ✅ `backend/.env` (database credentials, JWT secret)
- ✅ `backend/auth_info/` (WhatsApp session files)
- ✅ `node_modules/`

**Never commit sensitive credentials to GitHub!**

---

## 🔄 After Git is Installed

You can then install Baileys:
```powershell
cd backend
npm install @whiskeysockets/baileys --legacy-peer-deps
npm run baileys
```

---

## 📞 Need Help?

If you encounter issues:
1. **Git not recognized**: Restart terminal after installation
2. **Authentication failed**: Use Personal Access Token instead of password
3. **Permission denied**: Check if you have write access to the repository
