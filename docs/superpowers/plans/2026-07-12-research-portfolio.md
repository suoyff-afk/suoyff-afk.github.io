# Research Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the SmCo-centric Research page with a project-led portfolio covering the user's verified academic and industry research history.

**Architecture:** Keep all factual content in `siteContent.ts` as typed arrays. Render a single editorial Research route with dedicated sections for research areas, the SmCo flagship, prior academic projects, Industry R&D, and methods. Reuse `EvidenceTag` and existing navigation patterns.

**Tech Stack:** React 19, TypeScript, React Router, CSS, Vitest, Testing Library.

---

### Task 1: Lock the new information architecture with tests

**Files:**
- Modify: `src/test/App.test.tsx`

- [ ] Add assertions for the broad Research subtitle, four research areas, SmCo flagship heading, four independent academic project articles, Industry R&D, and methods index.
- [ ] Assert dual-laser status and venue, battery FE-ANN contribution, MOOSE thermal-shock work, SiC XRD/SEM work, and Shining 3D separation.
- [ ] Remove assertions tied to the old stage-by-stage Research evidence list while keeping Console evidence tests intact.
- [ ] Run `npm.cmd test -- src/test/App.test.tsx` and confirm failures are caused by missing new headings and regions.

### Task 2: Add the typed portfolio content model

**Files:**
- Modify: `src/content/siteContent.ts`

- [ ] Add `ResearchProject` and `ResearchArea` types.
- [ ] Add four research areas, four prior academic projects, one industry entry, and a cross-project methods list using CV-grounded language.
- [ ] Keep `workflowStages` unchanged for Console and keep the concise SmCo workflow stages for the flagship feature.

### Task 3: Rebuild the Research page

**Files:**
- Modify: `src/pages/ResearchPage.tsx`

- [ ] Replace the SmCo-specific introduction with the approved broad positioning.
- [ ] Render research-area index, flagship SmCo section with concise evidence and Console CTA, academic project archive, Industry R&D section, and methods index.
- [ ] Use semantic sections, articles, headings, lists, and stable accessible labels.

### Task 4: Implement responsive editorial styling

**Files:**
- Modify: `src/styles/site.css`

- [ ] Add full-width project record styles using borders and grid columns rather than standalone cards.
- [ ] Give the SmCo flagship stronger scale without oversized hero typography.
- [ ] Stack metadata, narrative, and methods at the existing mobile breakpoint and prevent horizontal overflow.

### Task 5: Verify and deliver

**Files:**
- Modify: `design-qa.md`
- Refresh: `../../outputs/yifan-research-site.zip`
- Refresh: `../../outputs/yifan-research-site-design-qa.md`

- [ ] Run `npm.cmd test` and require all tests to pass.
- [ ] Run `npm.cmd run build` and require a successful production build.
- [ ] Inspect `/research` at desktop and `390 x 844`, confirm hierarchy, project completeness, and no horizontal overflow.
- [ ] Verify browser console has no warnings or errors and the Console CTA navigates correctly.
- [ ] Refresh the deliverable archive and QA record.

