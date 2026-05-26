# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

## Vercel Deployment Guide

This project is fully configured and ready for Vercel deployment.

### 1. Recommended: Git Integration (Continuous Deployment)
The easiest way to deploy this project is via the Vercel dashboard:
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket).
2. Go to the [Vercel Dashboard](https://vercel.com/new).
3. Import your repository.
4. Vercel will automatically detect **Vite** and configure the optimal build parameters:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**. Any future pushes to your main branch will automatically trigger new production deployments.

### 2. Alternative: Vercel CLI (Manual Deployment)
If you prefer deploying directly from your terminal:
1. Install the Vercel CLI globally:
   ```bash
   npm install -g vercel
   ```
2. Log in to your Vercel account:
   ```bash
   vercel login
   ```
3. Run the deployment command in the project root:
   ```bash
   vercel
   ```
4. Follow the interactive prompts (select defaults). To deploy to production, run:
   ```bash
   vercel --prod
   ```

### 3. SPA Routing & Caching Config
The project root contains a optimized `vercel.json` file which:
- Routes all virtual page paths (e.g., `/about`, `/services`, `/contact`) to `index.html` to support **React Router** client-side routing cleanly.
- Implements high-performance HTTP headers to cache Vite's hashed assets (`dist/assets/*`) in browser and Vercel CDN caches indefinitely for instant loading speeds.
