# Deployment Guide

## Step 1: Backend (Render/Railway)

1. Push your code to GitHub
2. Go to [Render.com](https://render.com) or [Railway.app](https://railway.app)
3. Create new Web Service
4. Connect your GitHub repo
5. Set environment variables:
   - MONGODB_URL=your-mongodb-uri
   - JWT_SECRET=your-secret
   - JWT_EXPIRES_IN=1h
   - CORS_ORIGIN=https://your-netlify-site.netlify.app
6. Start command: `npm start`
7. Note your backend URL (e.g., https://your-app.onrender.com)

## Step 2: Frontend (Netlify)

### Option A: Netlify UI (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Click "Add new site" → "Deploy manually"
4. Build your frontend:
   ```bash
   cd D:\VotingApp\frontend
   npm ci
   npm run build
   ```
5. Drag the `frontend/dist` folder to Netlify
6. Your site will be live at `https://random-name.netlify.app`

### Option B: GitHub Integration
1. Push your code to GitHub
2. In Netlify, click "Add new site" → "Import from Git"
3. Connect GitHub and select your repo
4. Build settings:
   - Build command: `cd frontend && npm ci && npm run build`
   - Publish directory: `frontend/dist`
5. Deploy

## Step 3: Update CORS
1. Get your Netlify URL
2. Update backend environment variable:
   - CORS_ORIGIN=https://your-site.netlify.app
3. Redeploy backend

## Step 4: Set Frontend API URL
1. In Netlify dashboard → Site settings → Environment variables
2. Add: `VITE_API_BASE_URL=https://your-backend.onrender.com`
3. Redeploy frontend

## Step 5: Test
1. Open your Netlify site
2. Try login/signup
3. Check Network tab for API calls

## Custom Domain (Optional)
1. In Netlify → Domain settings
2. Add custom domain
3. Update CORS_ORIGIN with new domain
4. Redeploy backend
