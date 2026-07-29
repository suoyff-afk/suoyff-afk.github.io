# Site Architecture Design

Date: 2026-07-12

## Goal

Reorganize the research portfolio codebase so future updates are easier to make without changing the current visual design, routes, content, or behavior.

The main maintenance goal is simple: when adding or updating a research project, CV entry, or console item, the relevant files should be easy to find and should not require reading the whole application.

## Current Problem

The current implementation works, but responsibilities are still concentrated:

- `src/content/siteContent.ts` mixes site-wide identity, research projects, console content, and CV content.
- `src/styles/site.css` mixes global styles, layout styles, and page-specific styles.
- `src/pages/` contains page components, but their content and styling live elsewhere.
- `src/components/` mixes globally reusable components with research-specific UI.

This is manageable now, but it will become harder to maintain as more research projects, images, and workflow views are added.

## Proposed Structure

Use a feature-oriented structure with a small application shell and shared components.

```text
src/
  app/
    App.tsx
    routes.ts
    RouteEffects.tsx
  components/
    layout/
      Header.tsx
      Footer.tsx
    common/
      CopyEmail.tsx
      EvidenceTag.tsx
  features/
    home/
      HomePage.tsx
      home.css
    research/
      ResearchPage.tsx
      ResearchProjectCard.tsx
      researchContent.ts
      researchTypes.ts
      research.css
    console/
      ConsolePage.tsx
      consoleContent.ts
      consoleTypes.ts
      console.css
    cv/
      CvPage.tsx
      cvContent.ts
      cvTypes.ts
      cv.css
  shared/
    copyText.ts
  styles/
    tokens.css
    base.css
    layout.css
  main.tsx
  vite-env.d.ts
```

## Folder Responsibilities

`app/` contains application-level wiring:

- route definitions
- page title metadata
- route switch behavior
- scroll and focus effects when pages change

`components/` contains UI used across multiple pages:

- `layout/` for site frame components such as Header and Footer
- `common/` for small reusable UI such as copy buttons and evidence tags

`features/` contains page-specific code:

- page component
- page-specific content
- page-specific types
- page-specific CSS
- page-specific helper components

`styles/` contains shared visual foundations:

- `tokens.css` for colors, type scale, spacing, borders, and shadows
- `base.css` for global document defaults
- `layout.css` for shared page shell, header, footer, and container behavior

`shared/` contains non-visual utilities that are not tied to one page.

## Maintenance Rules

Global style changes should go through `styles/tokens.css`, `styles/base.css`, or `styles/layout.css`.

Page-specific style changes should stay inside the relevant feature folder, for example `features/research/research.css`.

Research project updates should primarily touch:

- `features/research/researchContent.ts`
- real image assets in `public/`
- `features/research/research.css` only when the layout itself needs to change

CV updates should primarily touch:

- `features/cv/cvContent.ts`

Console content updates should primarily touch:

- `features/console/consoleContent.ts`

## Scope

This refactor must preserve:

- existing routes and URLs
- existing visible content
- existing visual design
- current accessibility behavior
- current test behavior
- current production build output behavior

This refactor must not add:

- a CMS
- a backend
- a new styling framework
- a new state library
- invented scientific content or images

## Testing Approach

Keep existing behavior tests passing throughout the refactor.

Add or preserve tests for:

- route rendering
- navigation destinations
- missing Contact route/link behavior
- copy email behavior
- research content contracts, especially stable project IDs and required media metadata where applicable

Run at minimum:

- `npm test`
- `npm run build`

After implementation, use browser QA to verify the main pages still render correctly.

## Implementation Order

1. Split content and types by feature while preserving exported values.
2. Move page components into feature folders.
3. Move globally reusable components into `components/layout` and `components/common`.
4. Keep research-specific card UI in `features/research`.
5. Extract application routing and route effects into `app/`.
6. Split the large CSS file into shared style foundations and feature CSS.
7. Update tests and imports after each small move.
8. Run full verification and refresh the user-facing output ZIP.

## Acceptance Criteria

The refactor is complete when:

- the project builds successfully
- all tests pass
- Home, Research, Console, and CV render with the same visible design and content
- no Contact page navigation is reintroduced
- future Research updates have a clear primary edit location
- future CV and Console updates have clear primary edit locations
- the output ZIP is refreshed

