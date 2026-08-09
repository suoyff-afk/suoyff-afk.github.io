# Workflow Shell Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate the SmCo Workflow into the portfolio shell without losing its scientific-instrument panel.

**Architecture:** The application shell will render Header and Footer for every route. The Workflow feature will become a standard-width case-study page whose warm-gray panel remains feature-owned; redundant local navigation will be replaced by a compact Research breadcrumb.

**Tech Stack:** React, React Router, TypeScript, CSS, Vitest, Testing Library

---

### Task 1: Lock The Shared Shell Contract

**Files:**
- Modify: `src/test/App.test.tsx`

- [ ] Replace the old assertion that Workflow omits `.site-header` and `.site-footer` with assertions requiring both elements.
- [ ] Assert that the global `SmCo Workflow` link is active while `Research` is not active on `/research/smco-workflow`.
- [ ] Assert that `Research / SmCo Workflow` breadcrumb exists and panel-level `Back to Research` and `View CV` links do not.
- [ ] Run `npm.cmd test -- --run src/test/App.test.tsx` and verify the test fails because the current route intentionally suppresses the shell.

### Task 2: Integrate The Workflow Page

**Files:**
- Modify: `src/app/App.tsx`
- Modify: `src/components/layout/Header.tsx`
- Modify: `src/features/console/ConsolePage.tsx`
- Modify: `src/features/console/console.css`

- [ ] Remove workflow-specific Header and Footer suppression from `App`.
- [ ] Set the Research `NavLink` to exact matching so only `SmCo Workflow` is active on the case-study route.
- [ ] Replace the Workflow action buttons with a breadcrumb linking to `/research`.
- [ ] Replace the full-screen canvas wrapper with the standard `page-frame interior-page` wrapper.
- [ ] Reduce the panel's outer radius, shadow, and minimum-height treatment while preserving the stage selector, previews, evidence content, and mobile transformation.
- [ ] Run `npm.cmd test -- --run src/test/App.test.tsx` and verify the shell contract passes.

### Task 3: Verify And Publish

**Files:**
- Verify: `src/test/App.test.tsx`
- Verify: `src/features/console/console.css`

- [ ] Capture desktop and 390-pixel mobile screenshots of `/research/smco-workflow` and compare header alignment, content width, spacing, and footer continuity with Research and CV.
- [ ] Run `npm.cmd test -- --run` and expect all tests to pass.
- [ ] Run `npm.cmd run build` and expect a successful Vite production build.
- [ ] Commit the implementation, push `main`, and verify the public Workflow route renders the shared shell.
