# Research Image Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert Research into an image-led, scalable card gallery using only verified local scientific assets.

**Architecture:** Extend the typed research project data with optional media and results fields, then render a shared `ResearchProjectCard` component in featured and standard variants. Keep media absence as a supported state rather than a placeholder.

**Tech Stack:** React, TypeScript, CSS, Vitest, Testing Library, Vite.

---

### Task 1: Lock the card behavior with tests

**Files:**
- Modify: `src/test/App.test.tsx`

- [x] Assert one wide Research Areas figure with the conceptual-only caption and four compact area labels.
- [x] Assert five academic project cards, with SmCo marked featured and four prior projects rendered from the shared card structure.
- [x] Assert SmCo exposes exactly two concise outcomes, no parameter grid, and a Console link.
- [x] Assert cards with media expose an image and caption; cards without media do not render an empty media element.

### Task 2: Extend project content and assets

**Files:**
- Modify: `src/content/siteContent.ts`
- Add verified files only: `public/assets/research/*`

- [x] Add optional media, results, methods, and action fields.
- [x] Copy only reviewed, lightweight result images into the local prototype.
- [x] Keep provenance and public-release boundaries in the QA record, not visible absolute paths.

### Task 3: Build the reusable card and gallery

**Files:**
- Create: `src/components/ResearchProjectCard.tsx`
- Modify: `src/pages/ResearchPage.tsx`

- [x] Render the Research Areas workflow image with the conceptual caption and four compact labels.
- [x] Render SmCo as the featured card and prior academic projects as standard cards.
- [x] Render Industry R&D through the same card component without forcing scientific media.

### Task 4: Implement responsive visual styling

**Files:**
- Modify: `src/styles/site.css`

- [x] Use a two-column card grid on desktop, one column on mobile, and a full-span featured card.
- [x] Preserve scientific figures with `object-fit: contain`, restrained borders, small radius, and no decorative gradients or random metrics.
- [x] Collapse media-free cards cleanly without an empty media slot.

### Task 5: Verify and deliver

**Files:**
- Modify: `design-qa.md`
- Refresh: `../../outputs/yifan-research-site.zip`

- [x] Run focused RED/GREEN tests, full tests, and production build.
- [x] Inspect desktop, intermediate, and mobile viewports; verify captions, image crops, no overflow, and Console navigation.
- [x] Refresh the archive and QA record.
