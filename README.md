# Texture Lounge

Site for Texture Lounge, a barber salon in Edinburgh.

## Stack

React 19 + TypeScript, Vite, Tailwind CSS, Framer Motion, React Router. Deployed on Cloudflare Pages, with a Pages Function backing the chat widget on Workers AI.

## Development

```
npm install
npm run dev      # local dev server
npm run build    # production build
npm run preview  # preview the production build
```

## Deploy

```
npm run build
npx wrangler pages deploy dist --project-name texture-lounge-website
```
