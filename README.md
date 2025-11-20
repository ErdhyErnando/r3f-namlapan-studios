# react-three-fiber starter inspired by [wawa sensei](https://github.com/wass08/r3f-vite-starter/tree/main)

## Setup

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Configure 3D Model Hosting
Due to the large size of the 3D model (100MB+), it's hosted on Cloudflare R2 instead of being committed to Git.

**For development with the actual model:**
1. Follow the instructions in [R2_SETUP.md](./R2_SETUP.md)
2. Copy `.env.example` to `.env`
3. Update `VITE_MODEL_URL` with your R2 public URL

**For development without the model:**
The app will attempt to load from `public/models/namlapan-studio.glb` as a fallback.

### 3. Run Development Server
```bash
pnpm run dev
```

## Project Structure
- `/src/components` - React Three Fiber components
- `/src/pages` - Page components
- `/public/models` - 3D models (excluded from Git)

## Deployment
Make sure to set the `VITE_MODEL_URL` environment variable in your deployment platform (Vercel, Netlify, etc.) pointing to your R2 bucket URL.

