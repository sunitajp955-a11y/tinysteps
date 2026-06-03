# Deployment Guide for TinySteps

This guide covers how to deploy TinySteps to various platforms.

## 🚀 GitHub Pages (Automatic)

The repository includes an automatic GitHub Pages deployment workflow.

### Setup
1. Go to your repository settings
2. Navigate to **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select **gh-pages** branch
5. Click **Save**

Every push to the `main` branch will automatically build and deploy your app to:
```
https://sunitajp955-a11y.github.io/tinysteps/
```

### How it works
- GitHub Actions automatically runs on every push
- The `.github/workflows/deploy.yml` workflow builds the app
- Built files are deployed to the `gh-pages` branch
- No manual steps needed!

## 🌐 Vercel (Recommended for Production)

### Setup
1. Sign up at [vercel.com](https://vercel.com)
2. Click **New Project**
3. Import your GitHub repository
4. Vercel auto-detects the Vite setup
5. Click **Deploy**

Your app will be live at a Vercel URL, with automatic deployments on every push.

### Configuration
No special configuration needed - Vercel handles Vite projects automatically.

## 🚀 Netlify

### Setup
1. Sign up at [netlify.com](https://netlify.com)
2. Click **New site from Git**
3. Select your GitHub repository
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Click **Deploy**

Your app will be live at a Netlify URL.

## 📦 Manual Deployment

### Build locally
```bash
npm run build
```

This creates a `dist/` folder with production-ready files.

### Deploy to your own server
```bash
# Upload the entire 'dist' folder to your server
# Example with rsync:
rsync -avz dist/ user@server.com:/var/www/tinysteps/
```

### Docker deployment
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
```

Build and run:
```bash
docker build -t tinysteps .
docker run -p 3000:3000 tinysteps
```

## 🔄 Environment Variables

Create a `.env` file for development:
```
VITE_API_URL=http://localhost:3000
```

For production deployments, set these in your hosting platform's environment settings.

## 🛠️ Troubleshooting

### App shows blank page
- Check browser console for errors
- Verify GitHub Pages is enabled
- Check that `vite.config.js` has correct `base` path

### Styles not loading
- Ensure Tailwind CSS build succeeded
- Clear browser cache
- Check `tailwind.config.js` content paths

### Data not persisting
- localStorage is browser-dependent
- Verify browser privacy settings allow localStorage
- Check browser console for storage quota errors

## 📊 Performance Tips

### Before deploying
1. Run `npm run build` and check bundle size
2. Test in production mode: `npm run preview`
3. Use browser DevTools to check performance

### Optimization
- Vite already tree-shakes unused code
- Tailwind CSS purges unused styles
- React is optimized for production

## 🔒 Security

- All data stays in browser (localStorage)
- No backend = no server vulnerabilities
- HTTPS is enforced by GitHub Pages and Vercel
- No tracking or analytics

## 📝 Environment-specific notes

### GitHub Pages
- Free hosting
- Custom domain support
- Automatic HTTPS
- Built-in CI/CD

### Vercel
- Free tier available
- Faster deployment
- Better analytics
- Edge functions support

### Netlify
- Free tier available
- Drag-and-drop deployment
- Form handling
- Serverless functions

## 🎯 Recommended approach

For TinySteps, we recommend:
1. **Development**: Local with `npm run dev`
2. **Staging**: GitHub Pages (automatic)
3. **Production**: Vercel or Netlify

All are free and require minimal setup!

---

For more help, check the main [README.md](README.md) or open an issue on GitHub.
