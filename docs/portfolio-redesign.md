# Portfolio redesign — September 2026

## Implemented direction

The purpose is a personal online CV, with projects as supporting evidence. The main website supplies the visual family—off-white, charcoal, cobalt, Sora and Inter, restrained rules, and rounded controls—but not the homepage structure or sales language.

The profile leads with Jose’s full name, AI Developer role, current position, professional summary, career progression, contributions, skills, projects, education, and recognition. A section directory supports scanning on desktop; the mobile version includes direct résumé and contact actions. A small Solvin reference in the footer establishes the connection without displacing the personal identity.

The personal JG monogram, CV document layout, compact project rows, and professional enquiries footer distinguish this site from the Solvin studio. The earlier studio-style hero, giant glasses mark, slogans, method section, and sales call to action were replaced following the user’s correction.

The refresh covers the homepage, project collection, ten case studies, experience, résumé, notes, contact, mobile navigation, dark theme, social metadata, favicon, and a 404 page. The existing career content in `profile.ts` and `docs/cv.md` was preserved. Project pages keep original URLs where they existed.

## Project selection

The GitHub repository inventory and selected READMEs were reviewed through authenticated read-only access. The most useful new additions were:

- Solvin GraphRAG: document evidence, hybrid retrieval, human review, and knowledge governance; documented as a working MVP with a stub-provider demo by default.
- Marker: club operations and an attributed transaction ledger; development stage, with payment-provider integration still future work.
- Civi: household and workout workflows spanning chat and a dashboard; finance and habit domains remain roadmap items.
- Oprenta: service-business operations, web and mobile interfaces, and offline field actions; development stage rather than a claimed commercial rollout.
- Readmission prediction: completed public academic capstone; reported metrics include the missed AUC and fairness targets and the precision/recall tradeoff.
- Maritime learning: anonymized offline-capable demo; organizational approval is pending and the governing manual remains authoritative.

The four earlier projects remain available with refreshed copy: Gentleman POS, RAG on Me, Quest to Solvin, and Customer Churn API. They are no longer advertised with unsupported performance claims or unverified live demos.

Private project summaries contain no source excerpts or repository links. Existing professional experience remains separate from independent portfolio projects. Project visuals are authored concept illustrations, not screenshots or evidence of customer activity.

`src/content/projects.ts` is the canonical content source. The Markdown case studies are synchronized reading copies for future public-document ingestion. Review any summary again before including it in a new assistant corpus.

## Assistant follow-up

The dead widget has been removed from the page shell and the retired API is no longer a fallback endpoint. This phase does not claim to restore live AI chat.

A subsequent assistant build should:

1. Confirm the hosting location and API contract for a replacement backend.
2. Ingest the updated, public portfolio and résumé; explicitly exclude private repository contents and internal records.
3. Ground answers in public citations and distinguish current work from historical experiments.
4. Implement visible loading, cancellation, offline, timeout, unavailable, and retry states.
5. Verify rate limits, allowed origins, request size limits, retention choices, and server-side secret handling.
6. Test retrieval and refusal behavior before restoring a visible chat entry point.

The main website assistant has its own product-brief purpose. Reusing that endpoint for résumé questions requires an explicit scope and backend review rather than simply changing a URL.

## Release

No deployment is performed by the redesign task. The existing workflow publishes on pushes to `main`; inspect the complete working-tree diff before committing because the checkout contained prior career updates and unrelated untracked assets.

## Verification completed

- `npm run build`: 17 static routes generated successfully.
- `npm run check`: zero errors and zero warnings; four existing unused-code hints remain in the unmounted chat components.
- Production browser checks: all 17 routes at 1440, 390, and 320 pixels; additional homepage checks at 768, 1024, and 1920 pixels. No horizontal document overflow or missing images.
- Project category counts, persistent dark/light theme, mobile menu and Escape focus return, email clipboard action, and print-to-PDF action passed.
- With JavaScript disabled, all projects and mobile navigation remain available.
- 434 generated internal links and asset references resolve, including in-page anchors. No private repository URLs or retired chatbot endpoint appear in generated HTML.
- No browser JavaScript errors, failed local asset requests, retired chatbot calls, or React hydration requests occurred in the production checks.
- Desktop and mobile screenshots were visually reviewed, including the project collection, dark theme, and case studies.
- Changed files pass whitespace checking; the pre-existing `docs/cv.md` Markdown hard-break whitespace was left intact.
