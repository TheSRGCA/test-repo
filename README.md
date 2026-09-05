# SRGCA — Personal Brand Website

Production-quality personal brand website for Sergio Armando (SRGCA). Dark, mobile-first Next.js site showcasing professional work in project management, branding, and digital media.

Built as a **static export** for deployment to any static hosting provider (Cloudflare Pages, Netlify, GitHub Pages, etc.).

## Overview

- **Dark, kinetic design** — Typography-led, mobile-first (tested at 390px)
- **Next.js 16** with App Router, TypeScript, and Tailwind CSS 4
- **Static export** — Deploys to any static host
- **SEO optimized** — Open Graph, Twitter Cards, proper meta tags, indexable
- **Production-ready** — Deploy in minutes

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
```

This generates a static site in the `out/` directory, ready for deployment to any static hosting provider.

## Deploy to Static Hosting

### Cloudflare Pages

1. Connect your repository in [Cloudflare Pages](https://pages.cloudflare.com)
2. Configure build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
3. Deploy
4. Add custom domain `srgca.online` in Cloudflare Pages settings
5. Cloudflare will automatically configure DNS and SSL

### Other Static Hosts (Netlify, GitHub Pages, etc.)

1. Import your repository or upload the `out/` directory
2. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `out`
3. Deploy

### Custom Domain Configuration (srgca.online)

If using **Cloudflare Pages**:
- Add the custom domain in Cloudflare Pages dashboard
- Cloudflare handles DNS automatically if domain is on Cloudflare

If using **other static hosts** with domain registered at **Hover** or another registrar:

**For Cloudflare Pages:**
- Add your site to Cloudflare (free plan)
- Point nameservers to Cloudflare
- Add `srgca.online` in Cloudflare Pages

**For direct static hosting (non-Cloudflare):**
- **A Record:**
  - Name: `@`
  - Value: Your hosting provider's IP (check their docs)
- **CNAME Record (www):**
  - Name: `www`
  - Value: Your hosting provider's domain (e.g., `yoursite.pages.dev`)
- **SSL:** Most providers auto-provision via Let's Encrypt

DNS propagation takes 5-30 minutes.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Static Export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Fonts:** Inter (body), JetBrains Mono (mono)
- **Deployment:** Cloudflare Pages, Netlify, or any static host

## Project Structure

```
/app
  ├── layout.tsx          # Root layout with SEO metadata
  ├── page.tsx            # Main page with all sections
  ├── globals.css         # Global styles and animations
  ├── icon.svg            # Favicon/icon
  └── favicon.ico         # Legacy favicon
/out                      # Generated static site (after build)
```

## Sections

- **Hero** — Project Management · Branding · Digital Media
- **Current Projects** — Doomsday Brand, Freelance consulting
- **Selected Work** — Insomniac Events, Epic Cataloges, DMS, Doomsday Brand
- **Skills** — Product, brand, and creative capabilities
- **About** — Professional background and current focus
- **Contact** — Get in touch CTA with social links

## Contact

**Sergio Armando (SRGCA)**  
Email: Info@srgca.org  
LinkedIn: [linkedin.com/in/sergio-a-01838b36](https://www.linkedin.com/in/sergio-a-01838b36)  
X: [@TheSRG_CA](https://x.com/TheSRG_CA)

---

Built with Next.js. FIDM Graduate.
