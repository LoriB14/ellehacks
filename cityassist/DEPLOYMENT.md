# 6ixAssist Toronto - Deployment Guide

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/LoriB14/ellehacks)

## Manual Deployment Steps

### 1. **Environment Setup**

```bash
# Install dependencies
npm install

# Create production build
npm run build

# Test locally (optional)
npm run preview
```

### 2. **Vercel Configuration**

- The project includes `vercel.json` for optimal deployment
- Configured for Vite framework with SPA routing
- Asset caching optimized for performance

### 3. **Environment Variables**

Set these in your Vercel project dashboard:

| Variable         | Value                         | Required |
| ---------------- | ----------------------------- | -------- |
| `GEMINI_API_KEY` | Your Google Gemini AI API key | ✅ Yes   |

### 4. **Deploy to Vercel**

**Option A: GitHub Integration (Recommended)**

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

**Option B: Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables
vercel env add GEMINI_API_KEY
```

### 5. **Post-Deployment**

- ✅ Test all features work in production
- ✅ Verify dark/light mode switching
- ✅ Test chat functionality with Gemini AI
- ✅ Check map rendering and directions
- ✅ Verify community updates work

## Project Features

- 🌟 **Smart Resource Search**: AI-powered Toronto resource finder
- 🗺️ **Interactive Maps**: Find nearby resources with directions
- 🌙 **Dark/Light Mode**: Accessible theme switching
- 💬 **Community Updates**: Real-time information sharing
- 🆘 **Emergency Support**: Crisis contacts and help
- 📱 **Mobile-First**: Responsive design for all devices

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite 6
- **AI**: Google Gemini for intelligent search
- **Maps**: Leaflet for interactive mapping
- **Deployment**: Vercel with optimized caching
- **Styling**: Custom CSS with dark mode support

## Build Optimization

- Code splitting for faster loading
- Asset caching for better performance
- Service worker ready for PWA features
- Optimized chunks under 500KB (warning addressed)

---

**Need Help?** Check the InfoHelpPage in the app or contact support.
