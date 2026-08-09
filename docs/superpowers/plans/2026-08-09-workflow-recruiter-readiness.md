# Workflow Recruiter Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Surface existing SmCo engineering evidence and Yifan Suo's personal contribution for technical recruiters.

**Architecture:** Extend the existing Workflow content model with a factual profile and related-project metadata. Keep rendering inside `ConsolePage`, add stable anchors through `ResearchProjectCard`, and use responsive CSS for the short mobile title and compact no-figure states.

**Tech Stack:** React, React Router, TypeScript, CSS, Vitest, Testing Library

---

### Task 1: Define Recruiter-Facing Contracts

**Files:**
- Modify: `src/test/App.test.tsx`
- Modify: `src/test/content-contracts.test.ts`

- [ ] Add assertions for the role line, `My contribution`, conservative tool-role wording, `Stage result`, and `Method / source`.
- [ ] Add assertions that Thermal, Mesh, and Magnetic stages use `Ongoing validation` rather than `RESULT FIGURE NOT ATTACHED`.
- [ ] Add assertions for related links to `#dual-laser`, `#battery`, and `#shining-3d`.
- [ ] Run the targeted tests and verify they fail because the recruiter-facing modules do not exist.

### Task 2: Implement Content And Layout

**Files:**
- Modify: `src/features/console/consoleTypes.ts`
- Modify: `src/features/console/consoleContent.ts`
- Modify: `src/features/console/ConsolePage.tsx`
- Modify: `src/features/console/console.css`
- Modify: `src/features/research/ResearchProjectCard.tsx`

- [ ] Add typed workflow profile and related-project content using only existing verified records.
- [ ] Render desktop and mobile title variants, role line, contribution module, and related-project links.
- [ ] Replace the large empty-result panel with a compact ongoing-validation notice.
- [ ] Rename evidence labels and add project-card IDs for direct linking.
- [ ] Run targeted tests and verify they pass.

### Task 3: Validate And Publish

**Files:**
- Verify: `src/features/console/console.css`
- Verify: `src/test/App.test.tsx`

- [ ] Capture desktop and mobile screenshots and check first-view hierarchy, evidence visibility, overflow, and related-work layout.
- [ ] Run all tests and the production build.
- [ ] Commit, push `main`, and verify the public Workflow route.
