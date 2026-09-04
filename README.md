# SRGCA — Personal Brand Website

Production-quality personal brand website for Sergio Armando (SRGCA). Dark, mobile-first Next.js site showcasing Doomsday Brand, product and brand leadership, and professional work.

## Overview

- **Dark, kinetic design** — Typography-led, mobile-first (tested at 390px)
- **Next.js 16** with App Router, TypeScript, and Tailwind CSS 4
- **SEO optimized** — Open Graph, Twitter Cards, proper meta tags, indexable
- **Production-ready** — Deploy to Vercel in minutes

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

### Quick Deploy

1. Push this repository to your Git provider (GitHub, GitLab, Bitbucket)
2. Import the project in [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build
4. Click "Deploy"

### Custom Domain (srgca.online)

After deploying to Vercel:

1. Go to your project settings → **Domains**
2. Add `srgca.online` and `www.srgca.online`
3. Vercel will provide DNS records to configure:

**For the root domain (srgca.online):**
- Type: `A`
- Name: `@`
- Value: `76.76.21.21` (Vercel's IP)

**For www subdomain:**
- Type: `CNAME`
- Name: `www`
- Value: `cname.vercel-dns.com`

4. Add these records in your domain registrar's DNS settings
5. Wait for DNS propagation (5-30 minutes)
6. Vercel will automatically provision SSL certificates

### Environment Variables

No environment variables required for the base site.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Fonts:** Inter (body), JetBrains Mono (mono)
- **Deployment:** Vercel (recommended)

## Project Structure

```
/app
  ├── layout.tsx          # Root layout with SEO metadata
  ├── page.tsx            # Main page with all sections
  ├── globals.css         # Global styles and animations
  ├── icon.svg            # Favicon/icon
  └── favicon.ico         # Legacy favicon
```

## Sections

- **Hero** — Typography-led introduction with social links
- **Now** — Current focus on Doomsday Brand
- **Selected Work** — Freelance/Insomniac, Epic Cataloges, DMS
- **Skills** — Product, brand, and creative capabilities
- **About** — Background and approach
- **Contact** — Get in touch CTA with social links

## Contact

**Sergio Armando (SRGCA)**  
Email: Info@srgca.org  
LinkedIn: [linkedin.com/in/sergio-a-01838b36](https://www.linkedin.com/in/sergio-a-01838b36)  
X: [@TheSRG_CA](https://x.com/TheSRG_CA)

---

Built with Next.js. Educated at FIDM.
