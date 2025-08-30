# Changelog

All notable changes to this project will be documented in this file.

## 2025-08-30

Highlights:
- Dark mode added with persistent Light/Dark toggle and animated transitions
- Glassmorphism navbar + consistent mobile menu styling
- SEO upgrades (Open Graph, Twitter, JSON‑LD LocalBusiness, rel=me)
- Google data wired: coordinates and opening hours
- Performance: lazy/eager image loading; optional image optimizer pipeline
- Accessibility: better nav semantics and external link attributes

Details:
- Fix invalid nested paragraph in About section
- Correct Tailwind classes (e.g., gray vs grey, missing shades)
- Remove undefined `animate-grow` class
- Consolidate Swiper CSS imports to `src/index.css`
- Add canonical, robots, sitemap.xml, and brand manifest entries
- Add `public/_headers` for caching/security on Netlify
- Add `tools/optimize-images.mjs` (Sharp) with `prestart`/`prebuild` hooks
- Enable Tailwind dark mode (`darkMode: 'class'`) and add dark styles across sections

