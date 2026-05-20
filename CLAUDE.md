# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server at localhost:4321
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

All site-wide text, projects, navigation, and SEO metadata live in a single source-of-truth file: [`src/content/site.ts`](src/content/site.ts). Edit this file to change copy, add projects, or update links — no page edits needed for most content changes.

### Layout hierarchy

```
BaseLayout.astro   ← <html> shell, SEO meta, fonts, dark-mode script
  └── MainLayout.astro   ← Navbar + Footer wrapper for standard pages
        └── ProjectLayout.astro  ← Used by individual project case-study pages
```

Pages live in `src/pages/` with file-based routing. Project case studies are static `.astro` files under `src/pages/projects/`.

### React islands (partial hydration)

Only two components are React; everything else is Astro (zero JS by default):

- **`ChatWidget.tsx`** (`client:load`) — Full-page chat drawer with a floating action button. Coordinates state, focus management, and mobile keyboard handling. Its sub-components live in `src/components/chat/`:
  - `useChatApi.ts` — fetch wrapper with AbortController and 20 s timeout
  - `useKeyboardInset.ts` — Visual Viewport API hook for mobile keyboard height
  - `MessageList.tsx` — pure presentational message renderer
  - `ChatInput.tsx` — textarea with auto-resize and error display
- **`ThemeToggle.tsx`** — Dark/light/system theme switcher persisted in `localStorage`

### Chat API

The chat widget calls an external RAG backend. The endpoint is configured in [`src/config/chat.ts`](src/config/chat.ts):

- Default base URL: `https://rag-on-me.solvin.co`
- Override at build/dev time with env var `PUBLIC_CHAT_API_BASE_URL`
- Request shape: `{ messages: [{ role, content }], thread_id }`
- Response is parsed defensively — `output.messages` is the primary field; several fallback keys are tried

### Design system (Tailwind)

Custom tokens in [`tailwind.config.mjs`](tailwind.config.mjs):

- **`tuxedo.*`** — semantic palette (`tuxedo-black`, `tuxedo-white`, `tuxedo-midnight`, `tuxedo-pearl`, etc.) used throughout components
- **`primary.*`** / **`accent.*`** — gray scales for UI chrome
- Dark mode via `class` strategy; `dark` class toggled on `<html>` by `BaseLayout`

### Styling rules

- Never use `@apply` directive in CSS.
- Prefer Tailwind utility classes scoped inside `.astro` files; use `src/styles/globals.css` for truly global overrides.
- All interactive React components must implement keyboard navigation and ARIA attributes.

### Deployment

Pushes to `main` trigger the GitHub Actions workflow which runs `astro build` and uploads `dist/` to GitHub Pages. A `.nojekyll` file is injected automatically. No manual deploy step is needed.
