# Jose Fernando Gonzales — Portfolio

A personal online CV and supporting project portfolio built with Astro 5 for [solvin-it.github.io](https://solvin-it.github.io), aligned with the implemented Solvin main website: off-white and charcoal surfaces, cobalt accents, Sora / Inter typography, and the official glasses-and-bowtie mark.

## Develop and verify

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

The production output is `dist/`. GitHub Actions publishes it to GitHub Pages when `main` is pushed. This redesign can be reviewed locally before deployment.

## Purpose and design

This site is Jose’s professional profile, not a second Solvin studio homepage. It leads with his name, current position, summary, career, skills, and education. Projects support the CV. Solvin’s colors and typography establish a family resemblance; the personal monogram, document layout, section directory, compact project rows, and professional contact language make this site distinct.

`src/styles/profile.css` owns this CV-specific layout and is loaded after the shared design tokens and component styles.

## Content and routes

- `src/content/profile.ts`: career history, education, skills, and achievements. Existing profile content is retained.
- `src/content/projects.ts`: the canonical public summaries for ten projects, including explicit maturity, scope, and limitations. Private projects have no source links.
- `src/content/site.ts`: navigation, contact links, and site metadata.
- `src/components/ProjectVisual.astro`: conceptual illustrations, explicitly distinguished from product screenshots.
- `src/styles/globals.css`: shared design system, responsive behavior, dark theme, and résumé print styles.
- `public/brand/`: official brand marks copied from the main website.

Routes: `/`, `/projects/`, `/projects/[slug]/`, `/experience/`, `/resume/`, `/notes/`, `/contact/`, and `/404.html`. The four original case-study URLs remain valid. Six newer case studies are generated from the shared project data. Notes are short observations linked to the case studies.

Navigation and project content work without JavaScript. Small browser scripts enable theme selection, mobile navigation, filters, email copying, and printing. The résumé's **Print / Save as PDF** button opens the browser print dialog; there is no placeholder download or external PDF library.

## Case-study editorial rules

Public pages contain original high-level summaries, not copied private source or internal documentation. No private repository URLs, credentials, customer data, manual text, or deployment configuration are included. The maritime demo is anonymized. Only public repositories have source links.

Project descriptions were refreshed from project READMEs in September 2026. They describe documented scope, not independent production certification. Prototypes and academic work are labelled; unsupported impact metrics and unverified live demos were removed. See [the redesign notes](docs/portfolio-redesign.md) for the current scope and follow-up work.

## Chatbot status

The original RAG-on-Me widget is **not mounted**. Its retired endpoint is no longer a default, and the legacy client rejects requests when no backend is configured. The existing React source remains for reference; it is not loaded by the redesigned pages.

Rebuilding the assistant is a separate phase. Setting `PUBLIC_CHAT_API_BASE_URL` alone does not restore the widget. Before reintroducing it, refresh its public knowledge sources and verify the backend, CORS, citations, failure states, usage limits, and data-handling behavior. Do not connect it to private project repositories or publish model/API secrets in frontend variables.
