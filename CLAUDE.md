# CLAUDE.md - AI Assistant Guide for Contrasentido Blog

## Project Overview

**Contrasentido** is a Spanish-language blog built with Next.js, deployed as a static site to GitHub Pages. The blog features a minimalist, Kindle-inspired reading experience with markdown-based content management.

- **Live Site:** https://contrasentido.ar (also https://serugeneris.github.io)
- **Framework:** Next.js 14.2.12 with static export
- **Content:** Markdown files with YAML front matter
- **License:** Apache 2.0

## Directory Structure

```
/
├── src/
│   ├── components/          # React components
│   │   ├── layout.js        # Main layout wrapper (header/footer)
│   │   └── search.js        # Search form component
│   ├── pages/               # Next.js pages
│   │   ├── index.jsx        # Home page with featured post + search
│   │   ├── _app.tsx         # Next.js app wrapper
│   │   ├── _document.tsx    # HTML document template
│   │   ├── posts/[id].js    # Dynamic post detail page
│   │   └── fonts/           # Geist font files
│   └── styles/
│       ├── globals.css      # Global styles (Kindle theme)
│       └── Home.module.css  # CSS modules
├── lib/
│   └── posts.js             # Post data utilities (getSortedPostsData, getPostData, etc.)
├── posts/                   # Markdown blog posts (content)
├── public/
│   └── images/              # Blog post images
├── scripts/
│   └── deploy.mjs           # Manual deployment script
└── .github/workflows/
    └── nextjs.yml           # GitHub Actions CI/CD
```

## Quick Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build static site to /out directory
npm run start    # Run production server
npm run lint     # Run ESLint
npm run deploy   # Manual deploy to GitHub Pages
```

## Creating Blog Posts

Posts are markdown files in the `/posts/` directory with YAML front matter:

```markdown
---
title: "Post Title"
date: "YYYY-MM-DD"
description: "Short description for SEO and previews"
---

Your markdown content here...
```

**Naming convention:** Use kebab-case for filenames (e.g., `mi-nuevo-post.md`). The filename becomes the URL slug.

**Images:** Store images in `/public/images/` and reference them in markdown as `/images/filename.png`. The first image in a post becomes the featured image.

## Key Technical Details

### Static Site Generation
- Uses `getStaticProps` and `getStaticPaths` for pre-rendering
- Output is purely static HTML (Next.js `output: 'export'`)
- All images are unoptimized (required for static export)
- Trailing slashes enabled for GitHub Pages compatibility

### Post Processing (lib/posts.js)
- `getSortedPostsData()` - Returns all posts sorted by date (newest first)
- `getAllPostIds()` - Returns post IDs for static generation
- `getPostData(id)` - Parses markdown to HTML using remark
- `searchPosts(query, allPosts)` - Client-side filtering

### Styling Approach
- Kindle-inspired design: warm paper background (#f2e9d8), serif fonts (Georgia)
- CSS-in-JS with styled-jsx (`<style jsx>`)
- Global CSS variables in `/src/styles/globals.css`
- Responsive breakpoint at 768px
- Dark mode support via `prefers-color-scheme`

## Code Conventions

### File Naming
- Components: PascalCase functions, lowercase filenames (e.g., `layout.js` exports `Layout`)
- Pages: lowercase with brackets for dynamic routes (`[id].js`)
- CSS: kebab-case for modules (`Home.module.css`)
- Posts: kebab-case markdown files

### React Patterns
- Functional components only (no classes)
- Hooks for state management (useState, useCallback)
- Static generation preferred over SSR

### Language
- Code comments and variable names: English
- Blog content: Spanish

## Deployment

### Automatic (GitHub Actions)
Pushes to `main` branch trigger automatic deployment via `.github/workflows/nextjs.yml`:
1. Install dependencies
2. Build static site
3. Deploy to GitHub Pages

### Manual
Run `npm run deploy` which:
1. Builds the site
2. Creates `.nojekyll` marker
3. Pushes `/out` to `gh-pages` branch

## Important Configuration

### next.config.mjs
```javascript
{
  reactStrictMode: true,
  output: 'export',           // Static export for GitHub Pages
  images: { unoptimized: true },
  trailingSlash: true,
  distDir: 'out',
}
```

### ESLint
Uses `next/core-web-vitals` and `next/typescript` presets. Run `npm run lint` before committing.

## Common Tasks

### Add a new blog post
1. Create `posts/your-post-slug.md` with front matter
2. Add images to `public/images/`
3. Run `npm run dev` to preview
4. Commit and push to trigger deployment

### Modify the layout
Edit `src/components/layout.js` - contains header, footer, and page wrapper.

### Update global styles
Edit `src/styles/globals.css` for theme colors and typography.

### Add a new page
Create a file in `src/pages/`. Use `.jsx` or `.tsx` extension. Export a default React component.

## Dependencies

| Package | Purpose |
|---------|---------|
| next | React framework with SSG |
| react, react-dom | UI library |
| gray-matter | Parse YAML front matter |
| remark, remark-html | Markdown to HTML conversion |
| gh-pages | Manual deployment tool |

## Troubleshooting

### Build fails with image errors
Ensure `images.unoptimized: true` is set in `next.config.mjs` (required for static export).

### Posts not appearing
- Check front matter syntax (must be valid YAML)
- Ensure date format is `YYYY-MM-DD`
- Verify filename has `.md` extension

### Deployment not updating
- Check GitHub Actions workflow status
- For manual deploy, ensure you're authenticated with `gh-pages`

## SEO Notes

- Each post generates Open Graph meta tags automatically
- Featured images are used for `og:image`
- Base URL for absolute paths: `https://contrasentido.ar`
