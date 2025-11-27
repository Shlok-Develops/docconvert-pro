# Deployment Guide for DocConvert Pro

## Prerequisites
- Git installed on your machine
- GitHub account
- Hosting platform account (Render, Railway, or similar)

## Step 1: Push to GitHub

1. Install Git from https://git-scm.com/download/win (if not already installed)

2. Open PowerShell in your project directory and run:

```powershell
git init
git add .
git commit -m "Initial commit - DocConvert Pro"
```

3. Create a new repository on GitHub (https://github.com/new)
   - Name it: `docconvert-pro`
   - Don't initialize with README (we already have one)

4. Connect and push to GitHub:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/docconvert-pro.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Render (Recommended - Free Tier)

### Option A: Using Dockerfile (Recommended)

1. Go to https://render.com and sign up/login
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: docconvert-pro
   - **Environment**: Docker
   - **Plan**: Free
   - **Advanced**: Add environment variables if needed

5. Click "Create Web Service"
6. Wait for deployment (5-10 minutes)
7. Your app will be live at: `https://docconvert-pro.onrender.com`

### Option B: Using render.yaml

1. Push the `render.yaml` file to your repo
2. On Render dashboard, click "New +" → "Blueprint"
3. Connect your repository
4. Render will automatically detect and deploy using the blueprint

## Step 3: Deploy to Railway (Alternative)

1. Go to https://railway.app and sign up/login
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect and deploy
5. Add environment variables in Settings if needed
6. Your app will be live at the provided Railway URL

## Step 4: Deploy to Vercel + Backend Separately

### Frontend (Vercel):
1. Go to https://vercel.com
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: client
   - **Build Command**: npm run build
   - **Output Directory**: dist

### Backend (Render/Railway):
Deploy the backend separately and update the frontend API calls to point to your backend URL.

## Environment Variables

Make sure to set these in your hosting platform:

```
NODE_ENV=production
PORT=3001
MAX_FILE_SIZE=52428800
FILE_RETENTION_HOURS=1
```

## Important Notes

1. **LibreOffice, ImageMagick, Ghostscript**: The Dockerfile installs these automatically
2. **File Storage**: Render free tier has ephemeral storage - files are deleted on restart
3. **Cold Starts**: Free tier services may sleep after inactivity (30-60 seconds to wake)
4. **Upgrade**: For production use, consider paid plans with persistent storage

## Custom Domain (Optional)

1. Purchase a domain from Namecheap, GoDaddy, etc.
2. In your hosting platform settings, add custom domain
3. Update DNS records as instructed by the platform

## Monitoring

- Check logs in your hosting platform dashboard
- Set up uptime monitoring with UptimeRobot (free)
- Monitor conversion success rates

## Troubleshooting

### Deployment fails:
- Check build logs in hosting platform
- Ensure all dependencies are in package.json
- Verify Dockerfile syntax

### Conversions fail:
- Check if LibreOffice/ImageMagick are installed (logs)
- Verify file size limits
- Check server logs for detailed errors

### App is slow:
- Free tier has limited resources
- Consider upgrading to paid plan
- Optimize file processing
