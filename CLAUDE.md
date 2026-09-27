# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
npm run check     # Astro and TypeScript diagnostics
npm run build     # Production build into dist/
npm run preview   # Preview production build locally
```

There is no test runner or lint script configured in `package.json`.

## UI review workflow

Use `playwright-cli` (not computer use / screenshots) to inspect the running site. Snapshots are text-based and 100–400× cheaper in tokens than images.

```bash
npm run dev &                                      # start dev server in background
playwright-cli open http://localhost:4321/
playwright-cli --raw snapshot --depth=4            # read copy and structure
playwright-cli goto http://localhost:4321/experience
playwright-cli --raw snapshot --depth=5
playwright-cli screenshot --filename=home.png      # only when visual layout check needed
playwright-cli show --annotate                     # interactive design feedback with user
playwright-cli close
```

## Architecture

**Astro + React islands + Tailwind CSS** portfolio site, deployed to GitHub Pages via `.github/workflows/deploy.yml` on every push to `main`.

### Content & Configuration

- `src/content/profile.ts`: career history, skills, education, and contact details.
- `src/content/projects.ts`: canonical project summaries and case-study content.
- `src/content/site.ts`: navigation, site metadata, and shared links.

### Layout hierarchy

```
BaseLayout.astro   ← <html> shell, SEO meta, fonts, dark-mode script
  └── MainLayout.astro   ← Navbar + Footer wrapper for standard pages
        └── ProjectLayout.astro  ← Used by individual project case-study pages
```

Pages live in `src/pages/` with file-based routing. Project case studies use `ProjectLayout` with a `project` prop. Existing static wrappers and `[slug].astro` generate routes from `src/content/projects.ts`; exclude static wrappers from dynamic paths.

### Legacy chat

React chat components are retained under `src/components/chat/`, but the widget is not mounted. Do not restore the dead backend by default. `PUBLIC_CHAT_API_BASE_URL` must be explicitly configured before any future integration. The current interface uses lightweight native scripts for navigation, theme, filtering, and copying email.

### Design system

The site is a personal online CV, visually related to the separate Solvin studio site. Keep the name-first profile, career content, and résumé focus.

- Shared tokens and project visuals: `src/styles/globals.css`.
- CV layout and components: `src/styles/profile.css`.
- Sora headings, Inter body, JetBrains Mono labels; off-white, charcoal, and cobalt.
- Dark mode uses `data-theme="dark"` on `<html>`, not a `.dark` class.
- Never use `@apply` in CSS. Prefer semantic CSS using existing variables.
- Interactive components must support keyboard navigation and ARIA attributes.

### Deployment

Pushes to `main` trigger the GitHub Actions workflow which runs `astro build` and uploads `dist/` to GitHub Pages. A `.nojekyll` file is injected automatically. No manual deploy step is needed.
