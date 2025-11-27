# Quick GitHub Setup

## 1. Install Git (if not installed)
Download from: https://git-scm.com/download/win

After installation, restart PowerShell.

## 2. Configure Git (First time only)
```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## 3. Initialize Repository
```powershell
git init
git add .
git commit -m "Initial commit - DocConvert Pro"
```

## 4. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `docconvert-pro`
3. Description: "Universal Document Conversion Web Application"
4. Keep it Public (or Private if you prefer)
5. **DO NOT** check "Initialize with README"
6. Click "Create repository"

## 5. Push to GitHub
Replace `YOUR_USERNAME` with your GitHub username:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/docconvert-pro.git
git branch -M main
git push -u origin main
```

If prompted, enter your GitHub credentials or use a Personal Access Token.

## 6. Verify
Go to your GitHub repository URL and verify all files are uploaded.

## Next Steps
See DEPLOYMENT.md for deploying your app to make it globally accessible.
