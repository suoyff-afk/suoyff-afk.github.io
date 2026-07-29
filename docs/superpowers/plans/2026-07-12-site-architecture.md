# Site Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reorganize the research portfolio into `app`, `components`, `features`, `shared`, and shared style foundations while preserving current routes, visuals, content, and tests.

**Architecture:** Keep the application shell in `src/app`, shared UI in `src/components`, page-specific code and content in `src/features`, non-visual utilities in `src/shared`, and global visual foundations in `src/styles`. This is a refactor: behavior and design should remain unchanged.

**Tech Stack:** React, TypeScript, Vite, React Router, Vitest, Testing Library, CSS.

---

## Target File Structure

- Create: `src/app/App.tsx`
- Create: `src/app/RouteEffects.tsx`
- Create: `src/app/routes.ts`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Create: `src/components/common/CopyEmail.tsx`
- Create: `src/components/common/EvidenceTag.tsx`
- Create: `src/features/home/HomePage.tsx`
- Create: `src/features/home/home.css`
- Create: `src/features/research/ResearchPage.tsx`
- Create: `src/features/research/ResearchProjectCard.tsx`
- Create: `src/features/research/researchContent.ts`
- Create: `src/features/research/researchTypes.ts`
- Create: `src/features/research/research.css`
- Create: `src/features/console/ConsolePage.tsx`
- Create: `src/features/console/consoleContent.ts`
- Create: `src/features/console/consoleTypes.ts`
- Create: `src/features/console/console.css`
- Create: `src/features/cv/CvPage.tsx`
- Create: `src/features/cv/cvContent.ts`
- Create: `src/features/cv/cvTypes.ts`
- Create: `src/features/cv/cv.css`
- Create: `src/shared/copyText.ts`
- Create: `src/styles/base.css`
- Create: `src/styles/layout.css`
- Modify: `src/main.tsx`
- Modify: `src/test/App.test.tsx`
- Modify: `src/test/copyEmail.test.ts`
- Modify: `src/test/routing.test.ts`
- Add: `src/test/content-contracts.test.ts`
- Remove after migration: `src/App.tsx`
- Remove after migration: `src/routing.ts`
- Remove after migration: `src/components/CopyEmail.tsx`
- Remove after migration: `src/components/EvidenceTag.tsx`
- Remove after migration: `src/components/Footer.tsx`
- Remove after migration: `src/components/Header.tsx`
- Remove after migration: `src/components/ResearchProjectCard.tsx`
- Remove after migration: `src/content/siteContent.ts`
- Remove after migration: `src/pages/HomePage.tsx`
- Remove after migration: `src/pages/ResearchPage.tsx`
- Remove after migration: `src/pages/ConsolePage.tsx`
- Remove after migration: `src/pages/CvPage.tsx`
- Remove after migration: `src/utils/copyText.ts`
- Remove after migration: `src/styles/site.css`

## Task 1: Add Content Contract Tests

**Files:**
- Add: `src/test/content-contracts.test.ts`

- [ ] **Step 1: Write the failing test**

Add `src/test/content-contracts.test.ts` with imports from the target feature modules before those modules exist:

```ts
import { describe, expect, it } from "vitest";
import { workflowStages } from "../features/console/consoleContent";
import { education, experience } from "../features/cv/cvContent";
import { industryResearch, researchAreas, researchMethods, researchProjects } from "../features/research/researchContent";

describe("feature content contracts", () => {
  it("keeps research project IDs stable and SmCo featured", () => {
    expect(researchProjects.map((project) => project.id)).toEqual([
      "smco",
      "dual-laser",
      "battery",
      "thermal-shock",
      "sic",
    ]);
    expect(researchProjects[0]).toMatchObject({
      id: "smco",
      featured: true,
      action: { label: "Open workflow console", to: "/console" },
    });
    expect(industryResearch.id).toBe("shining-3d");
    expect(researchAreas).toHaveLength(4);
    expect(researchMethods).toContain("CUDA / GPU simulation");
  });

  it("keeps console stages stable", () => {
    expect(workflowStages.map((stage) => stage.id)).toEqual([
      "thermal",
      "grain",
      "mesh",
      "magnetic",
      "figures",
    ]);
    expect(workflowStages.every((stage) => stage.evidence.length > 0)).toBe(true);
  });

  it("keeps CV timeline modules populated", () => {
    expect(education).toHaveLength(3);
    expect(experience.length).toBeGreaterThanOrEqual(6);
    expect(experience.map((entry) => entry.title).join(" ")).toContain("Shining 3D");
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/test/content-contracts.test.ts`

Expected: FAIL because `../features/console/consoleContent`, `../features/cv/cvContent`, and `../features/research/researchContent` do not exist yet.

- [ ] **Step 3: Create feature content modules**

Split the current `src/content/siteContent.ts` into:

- `src/features/research/researchTypes.ts`
- `src/features/research/researchContent.ts`
- `src/features/console/consoleTypes.ts`
- `src/features/console/consoleContent.ts`
- `src/features/cv/cvTypes.ts`
- `src/features/cv/cvContent.ts`

Move the existing values without changing text:

- `EvidenceState` should live in `src/features/research/researchTypes.ts` for now and be imported where needed.
- `ResearchArea`, `ResearchProject`, `researchAreas`, `researchProjects`, `industryResearch`, and `researchMethods` should live in research files.
- `WorkflowStage` and `workflowStages` should live in console files.
- `TimelineEntry`, `education`, `experience`, and skill/CV content should live in CV files.
- Shared `email` can stay in a feature until Task 3 moves shared contact content.

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/test/content-contracts.test.ts`

Expected: PASS.

## Task 2: Move Shared Utilities and Components

**Files:**
- Create: `src/shared/copyText.ts`
- Create: `src/components/common/CopyEmail.tsx`
- Create: `src/components/common/EvidenceTag.tsx`
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/Footer.tsx`
- Modify: `src/test/App.test.tsx`
- Modify: `src/test/copyEmail.test.ts`

- [ ] **Step 1: Update tests to import target paths**

Change imports in `src/test/App.test.tsx`:

```ts
import { App } from "../app/App";
import { CopyEmail } from "../components/common/CopyEmail";
import { ResearchProjectCard } from "../features/research/ResearchProjectCard";
import type { ResearchProject } from "../features/research/researchTypes";
```

Change imports in `src/test/copyEmail.test.ts` to target:

```ts
import { copyText } from "../shared/copyText";
```

- [ ] **Step 2: Run affected tests to verify they fail**

Run: `npm test -- src/test/App.test.tsx src/test/copyEmail.test.ts`

Expected: FAIL because target imports do not exist yet.

- [ ] **Step 3: Move utility and shared components**

Move existing implementation content without changing behavior:

- `src/utils/copyText.ts` to `src/shared/copyText.ts`
- `src/components/CopyEmail.tsx` to `src/components/common/CopyEmail.tsx`
- `src/components/EvidenceTag.tsx` to `src/components/common/EvidenceTag.tsx`
- `src/components/Header.tsx` to `src/components/layout/Header.tsx`
- `src/components/Footer.tsx` to `src/components/layout/Footer.tsx`

Update imports inside moved files to point at new locations.

- [ ] **Step 4: Run affected tests**

Run: `npm test -- src/test/App.test.tsx src/test/copyEmail.test.ts`

Expected: PASS or only fail for page/component files not moved until Task 3. If page imports are still missing, continue Task 3 before judging the full app test.

## Task 3: Move Pages and Research-Specific Components

**Files:**
- Create: `src/features/home/HomePage.tsx`
- Create: `src/features/research/ResearchPage.tsx`
- Create: `src/features/research/ResearchProjectCard.tsx`
- Create: `src/features/console/ConsolePage.tsx`
- Create: `src/features/cv/CvPage.tsx`
- Modify imports inside moved page files

- [ ] **Step 1: Move page files and research card**

Move existing implementation content without changing JSX structure:

- `src/pages/HomePage.tsx` to `src/features/home/HomePage.tsx`
- `src/pages/ResearchPage.tsx` to `src/features/research/ResearchPage.tsx`
- `src/pages/ConsolePage.tsx` to `src/features/console/ConsolePage.tsx`
- `src/pages/CvPage.tsx` to `src/features/cv/CvPage.tsx`
- `src/components/ResearchProjectCard.tsx` to `src/features/research/ResearchProjectCard.tsx`

Update imports:

- research page imports research content from `./researchContent`
- console page imports console content from `./consoleContent`
- CV page imports CV content from `./cvContent`
- shared UI imports come from `../../components/common/...`
- routing imports should wait for Task 4 if necessary

- [ ] **Step 2: Run route and app tests**

Run: `npm test -- src/test/App.test.tsx src/test/content-contracts.test.ts`

Expected: PASS after imports are corrected.

## Task 4: Extract App Shell and Routing

**Files:**
- Create: `src/app/App.tsx`
- Create: `src/app/RouteEffects.tsx`
- Create: `src/app/routes.ts`
- Modify: `src/main.tsx`
- Modify: `src/test/routing.test.ts`

- [ ] **Step 1: Update route utility test import**

Change `src/test/routing.test.ts` import to:

```ts
import { assetUrl, routerBasename } from "../app/routes";
```

- [ ] **Step 2: Run route utility test to verify it fails**

Run: `npm test -- src/test/routing.test.ts`

Expected: FAIL because `src/app/routes.ts` does not exist yet.

- [ ] **Step 3: Move routing utilities**

Move the existing `src/routing.ts` contents into `src/app/routes.ts`.

If `App.tsx` currently contains route metadata, place it in `src/app/routes.ts` as a typed exported constant:

```ts
export const pageRoutes = [
  { path: "/", label: "Home", title: "Yifan Suo | Computational Materials Scientist" },
  { path: "/research", label: "Research", title: "Research | Yifan Suo" },
  { path: "/console", label: "Console", title: "Workflow Console | Yifan Suo" },
  { path: "/cv", label: "CV", title: "CV | Yifan Suo" },
] as const;
```

Keep labels and destinations aligned with the current header navigation.

- [ ] **Step 4: Extract route effects and app shell**

Move current `src/App.tsx` to `src/app/App.tsx`.

Extract scroll, title, and focus behavior into `src/app/RouteEffects.tsx` while preserving current behavior tested by `App.test.tsx`.

Update `src/main.tsx` to import:

```ts
import { App } from "./app/App";
import { routerBasename } from "./app/routes";
```

- [ ] **Step 5: Run routing and app tests**

Run: `npm test -- src/test/routing.test.ts src/test/App.test.tsx`

Expected: PASS.

## Task 5: Split Styles Without Changing Visuals

**Files:**
- Create: `src/styles/base.css`
- Create: `src/styles/layout.css`
- Create: `src/features/home/home.css`
- Create: `src/features/research/research.css`
- Create: `src/features/console/console.css`
- Create: `src/features/cv/cv.css`
- Modify: `src/main.tsx` or page-level imports

- [ ] **Step 1: Add CSS import smoke test**

Add to `src/test/App.test.tsx` if not already covered:

```ts
it("renders all main pages after style module split", () => {
  for (const path of ["/", "/research", "/console", "/cv"]) {
    const { unmount } = renderAt(path);
    expect(screen.getByRole("main")).toBeInTheDocument();
    unmount();
  }
});
```

- [ ] **Step 2: Run app test**

Run: `npm test -- src/test/App.test.tsx`

Expected: PASS before CSS split. This test is a guard for import/runtime errors during the split.

- [ ] **Step 3: Split CSS by responsibility**

Move CSS rules from `src/styles/site.css` into:

- `src/styles/base.css` for document defaults and global element defaults
- `src/styles/layout.css` for header, footer, navigation, page shell, and shared containers
- `src/features/home/home.css` for home-only classes
- `src/features/research/research.css` for research-only classes
- `src/features/console/console.css` for console-only classes
- `src/features/cv/cv.css` for CV-only classes

Keep CSS selectors and declarations unchanged where possible. Keep import order:

```ts
import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./features/home/home.css";
import "./features/research/research.css";
import "./features/console/console.css";
import "./features/cv/cv.css";
```

- [ ] **Step 4: Run app tests**

Run: `npm test -- src/test/App.test.tsx`

Expected: PASS.

## Task 6: Remove Old Paths and Verify Build

**Files:**
- Remove old migrated files listed in Target File Structure
- Modify imports in tests and source until no old paths remain

- [ ] **Step 1: Search for old imports**

Run:

```powershell
rg "src/content|../content|./content|../pages|./pages|../components/(CopyEmail|EvidenceTag|Footer|Header|ResearchProjectCard)|../utils|./utils|../routing|./routing" src
```

Expected: no output after cleanup.

- [ ] **Step 2: Run full test suite**

Run: `npm test`

Expected: all tests pass.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: TypeScript build and Vite build complete with exit code 0.

- [ ] **Step 4: Browser QA**

Open the current local site and inspect:

- `/`
- `/research`
- `/console`
- `/cv`

Expected: pages render with the same visible design, navigation, and content as before the refactor.

- [ ] **Step 5: Refresh output ZIP**

Refresh `outputs/yifan-research-site.zip` from the verified `work/site` source so the user-facing deliverable matches the refactored source.

