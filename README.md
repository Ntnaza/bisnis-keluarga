# Rumah Restu

Static React + Vite landing page for a family culinary business. The experience is frontend-only and ready for Vercel deployment.

## Run locally

```bash
npm install
npm run dev
```

## Hero frames

The current frame set belongs in `public/frames/Risol/` and uses `ezgif-frame-001.jpg` through `ezgif-frame-091.jpg`. The canvas preloads them and maps scroll progress across the 400vh hero section. A CSS fallback remains visible when the frame set is not available.

Update `WHATSAPP_URL` in `src/main.jsx` with the real business number before launch.
