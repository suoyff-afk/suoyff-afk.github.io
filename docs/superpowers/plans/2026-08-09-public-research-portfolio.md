# Public Research Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reframe Yifan Suo's site as a low-maintenance public research portfolio, turn Console into a SmCo workflow case study, and make all canonical GitHub Pages routes directly accessible.

**Architecture:** Preserve the existing React/Vite feature structure and warm-gray visual system. Change public information architecture at the route and content boundaries, reuse the existing workflow interaction as a focused case study, and extend the build output with a GitHub Pages SPA fallback while keeping Sites worker output intact.

**Tech Stack:** React, TypeScript, React Router, Vite, Vitest, Testing Library, CSS, GitHub Actions Pages

---

### Task 1: Public Navigation And Canonical Route Contract

**Files:**
- Modify: `src/test/App.test.tsx`
- Modify: `src/test/routing.test.ts`
- Modify: `src/test/content-contracts.test.ts`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/features/home/HomePage.tsx`
- Modify: `src/features/research/researchContent.ts`
- Modify: `src/app/routes.ts`
- Modify: `src/app/App.tsx`

- [ ] **Step 1: Write failing tests for the public information architecture**

Assert that Home and global navigation contain Research and CV but no Console link, the SmCo card links to `/research/smco-workflow`, that route has the workflow title, and `/console` redirects to the canonical route.

- [ ] **Step 2: Run focused tests and verify the expected failures**

Run: `npm test -- src/test/App.test.tsx src/test/routing.test.ts src/test/content-contracts.test.ts`

- [ ] **Step 3: Implement the minimal route and navigation changes**

Remove public Console links, add the canonical workflow route and title, update the SmCo action, and make `/console` a React Router redirect.

- [ ] **Step 4: Run focused tests and verify they pass**

Run: `npm test -- src/test/App.test.tsx src/test/routing.test.ts src/test/content-contracts.test.ts`

- [ ] **Step 5: Commit the public route contract**

Commit: `Reframe workflow as SmCo case study`

### Task 2: Visitor-Facing SmCo Workflow Case Study

**Files:**
- Modify: `src/test/App.test.tsx`
- Modify: `src/features/console/ConsolePage.tsx`
- Modify: `src/features/console/consoleContent.ts`
- Modify: `src/features/console/consoleTypes.ts`
- Modify: `src/features/console/console.css`

- [ ] **Step 1: Write failing workflow content and interaction tests**

Assert the case-study headline, complete four-stage pipeline, Back to Research and View CV actions, Current Evidence, Limitation, and Next Validation labels. Assert that personal-workspace and live-HPC language is absent while stage selection still updates evidence.

- [ ] **Step 2: Run the workflow test and verify the expected failure**

Run: `npm test -- src/test/App.test.tsx -t "SmCo workflow"`

- [ ] **Step 3: Implement the external case-study presentation**

Retain the immersive warm-gray surface, stage navigation, approved images, and evidence tags. Replace operational workspace modules with a concise workflow overview, selected evidence panel, limitations, and next validation. Add the two navigation actions and use `assetUrl` for all images.

- [ ] **Step 4: Run workflow tests and verify they pass**

Run: `npm test -- src/test/App.test.tsx -t "SmCo workflow"`

- [ ] **Step 5: Run the complete application test file**

Run: `npm test -- src/test/App.test.tsx`

- [ ] **Step 6: Commit the case-study page**

Commit: `Present SmCo workflow as public case study`

### Task 3: GitHub Pages Deep-Link Fallback

**Files:**
- Modify: `src/test/siteWorker.test.ts`
- Modify: `build/sites-vite-plugin.ts`

- [ ] **Step 1: Write a failing build-output test**

Exercise the build plugin close-bundle hook in a temporary project and assert that `dist/client/404.html` is byte-for-byte equivalent to `dist/client/index.html` while worker and hosting outputs remain present.

- [ ] **Step 2: Run the focused test and verify the expected failure**

Run: `npm test -- src/test/siteWorker.test.ts`

- [ ] **Step 3: Add the GitHub Pages SPA fallback to the existing plugin**

After Vite emits the client shell, copy `dist/client/index.html` to `dist/client/404.html`. Do not alter the existing worker bundle or `.openai/hosting.json` behavior.

- [ ] **Step 4: Run the focused test and verify it passes**

Run: `npm test -- src/test/siteWorker.test.ts`

- [ ] **Step 5: Run a production build and inspect required artifacts**

Run: `npm run build`

Verify `dist/client/index.html`, `dist/client/404.html`, `dist/server/index.js`, and `dist/.openai/hosting.json` exist, and verify the two HTML shells match.

- [ ] **Step 6: Commit the deep-link fix**

Commit: `Add GitHub Pages SPA fallback`

### Task 4: Integrated Quality And Visual Verification

**Files:**
- Modify only files required by verified regressions.

- [ ] **Step 1: Run the complete automated test suite**

Run: `npm test`

- [ ] **Step 2: Run a clean production build**

Run: `npm run build`

- [ ] **Step 3: Start the existing Vite preview**

Run: `npm run dev -- --host 127.0.0.1`

- [ ] **Step 4: Inspect Home, Research, SmCo Workflow, and CV at desktop width**

Verify hierarchy, navigation, content integrity, route transitions, stage selection, image captions, and absence of Console/live-HPC language.

- [ ] **Step 5: Inspect all four routes at a narrow mobile width**

Verify mobile navigation, stage-grid operation, readable evidence, and no horizontal overflow.

- [ ] **Step 6: Re-run tests and build after any visual corrections**

Run: `npm test`

Run: `npm run build`

- [ ] **Step 7: Commit verified corrections, if any**

Commit: `Polish public portfolio presentation`

### Task 5: Public Deployment And Completion Audit

**Files:**
- No planned source changes.

- [ ] **Step 1: Confirm the worktree is clean and inspect the final commit range**

Run: `git status --short --branch`

Run: `git log --oneline github/main..HEAD`

- [ ] **Step 2: Push `main` to the configured GitHub remote**

Run: `git push github main`

- [ ] **Step 3: Verify the GitHub Pages deployment completes successfully**

Inspect the latest `Deploy GitHub Pages` workflow run and require a successful deploy job.

- [ ] **Step 4: Verify public root and direct canonical URLs**

Verify successful responses and correct page content at:

- `https://suoyff-afk.github.io/`
- `https://suoyff-afk.github.io/research`
- `https://suoyff-afk.github.io/research/smco-workflow`
- `https://suoyff-afk.github.io/cv`

Also verify `https://suoyff-afk.github.io/console` resolves through the compatibility redirect.

- [ ] **Step 5: Audit every design-spec acceptance criterion against current evidence**

Check navigation, project coverage, canonical routing, workflow framing, scientific integrity, deep links, automated verification, responsive behavior, and public deployment. Do not mark completion if any criterion lacks direct evidence.
