# Astro + Tailwind CSS + JavaScript Copilot Instructions

## Project Structure
- Use the recommended Astro structure:
  - src/components/
  - src/layouts/
  - src/pages/
  - src/styles/
  - public/
  - astro.config.mjs

## General Principles
- Write concise, technical code with accurate Astro examples.
- Leverage Astro's partial hydration and multi-framework support.
- Prioritize static generation and minimal JavaScript for performance.
- Use descriptive variable names and Astro's naming conventions.
- Organize files using Astro's file-based routing system.
- Refer to Astro's official docs for best practices.

## Accessibility
- Use semantic HTML in Astro components.
- Implement ARIA attributes and keyboard navigation.

## Component Development
- Create .astro files for components.
- Use framework-specific components as needed.
- Compose reusable components and use props for data passing.

## Content Management
- Use Markdown/MDX for content-heavy pages.
- Leverage frontmatter and content collections.

## Data Fetching
- Use Astro.props, getStaticPaths(), and Astro.glob().
- Implement error handling for data fetching.

## Integrations & Plugins
- Use Astro integrations (e.g., @astrojs/image, @astrojs/tailwind).
- Configure integrations in astro.config.mjs.

## Performance Optimization
- Minimize client-side JS; use static generation.
- Use client:* directives for partial hydration.
- Lazy load images/assets and use built-in asset optimization.
- Prioritize Core Web Vitals and use Lighthouse/WebPageTest.

## Routing & Pages
- Use file-based routing in src/pages/.
- Implement dynamic routes and 404 handling.

## SEO & Meta Tags
- Use <head> for meta info and canonical URLs.
- Use <SEO> component pattern for reusable SEO.

## Styling
- Use scoped styles in .astro files and global styles in layouts.
- Use CSS preprocessors if needed.
- Implement responsive design with CSS custom properties/media queries.
- Integrate Tailwind CSS with @astrojs/tailwind.
- Use Tailwind utility classes, responsive utilities, color palette, and spacing scale.
- Implement custom theme extensions in tailwind.config.cjs if needed.
- Never use @apply directive.

## Key Conventions
- Follow Astro's Style Guide and use TypeScript for type safety.
- Implement error handling and logging.
- Use Astro's RSS feed and Image component for content-heavy sites.

## Testing
- Implement unit tests for utilities and helpers.
- Use Cypress for end-to-end testing.
- Implement visual regression testing if applicable.