# External Showcase Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish and publish Yifan Suo's research portfolio as a shareable, evidence-first external showcase for recruiters and collaborators, while retaining the warm-gray scientific-studio identity and the explicitly labeled SmCo simulation result.

**Architecture:** Preserve the existing React/Vite feature structure and routes. Make targeted copy and metadata corrections in the presentation layer, then add a small Sites worker-output adapter that packages the existing static SPA as a Cloudflare Worker-compatible application. The worker serves built assets and falls back to `index.html` for portfolio routes. Sites metadata is added only after the hosted project is created.

**Tech Stack:** React 19, TypeScript, React Router, Vite, Vitest, Testing Library, OpenAI Sites, Cloudflare Worker ESM.

---

### Task 1: Establish a clean baseline and encode the public-content contract

**Files:**
- Modify: `work/site/src/test/App.test.tsx`
- Verify: `work/site/src/test/content-contracts.test.ts`
- Verify: `work/site/src/features/home/HomePage.tsx`
- Verify: `work/site/src/features/console/ConsolePage.tsx`
- Verify: `work/site/src/components/layout/Footer.tsx`

- [ ] **Step 1: Run the existing test suite and production build before changes.**

Run: `npm.cmd test`
Expected: the existing suite completes successfully.

Run: `npm.cmd run build`
Expected: TypeScript and the Vite build complete successfully.

- [ ] **Step 2: Add a failing rendered-content test for the corrected public-facing language.**

In `App.test.tsx`, add a focused test that renders Home, Console, and the standard layout and asserts:

```ts
expect(screen.getByText(/PHD STUDENT.*TU DARMSTADT/i)).toBeInTheDocument();
expect(screen.getByText(/Additive manufacturing.*Computational materials science/i)).toBeInTheDocument();
expect(screen.getByRole("contentinfo")).toHaveTextContent(/TU Darmstadt.*Computational materials science/i);
expect(screen.getByText("Simulation result")).toBeInTheDocument();
```

The assertions must avoid matching the malformed replacement characters. Do not change scientific claims in `consoleContent.ts` or `researchContent.ts`.

- [ ] **Step 3: Run the focused test and confirm that it fails for the existing malformed separators.**

Run: `npm.cmd test -- --run src/test/App.test.tsx`
Expected: the new content-contract assertion fails before implementation.

### Task 2: Correct public copy, metadata, and evidence labeling without changing scientific scope

**Files:**
- Modify: `work/site/src/features/home/HomePage.tsx`
- Modify: `work/site/src/features/console/ConsolePage.tsx`
- Modify: `work/site/src/components/layout/Footer.tsx`
- Modify: `work/site/index.html`
- Test: `work/site/src/test/App.test.tsx`

- [ ] **Step 1: Replace malformed visual separators with stable, accessible markup.**

Use `{" "} / {" "}` or an equivalent ASCII-safe JSX construction in all three presentation components. Preserve the existing wording and hierarchy:

```tsx
<p className="eyebrow">PHD STUDENT {" / "} TU DARMSTADT<br />MECHANICS OF FUNCTIONAL MATERIALS</p>
```

The Console subline and footer note use the same delimiter. Do not put simulated live values, user portraits, or additional performance metrics on these pages.

- [ ] **Step 2: Make the public metadata match the validated positioning.**

In `index.html`, retain the concise page title and update the description to mention process-structure-property modeling, additive manufacturing, and TU Darmstadt. Add a warm-gray `theme-color` meta tag. Do not add a canonical URL or social image before a stable public domain exists, and do not fabricate an Open Graph image.

- [ ] **Step 3: Keep evidence provenance explicit in the Console.**

Ensure every occurrence of `smco-multilayer-comparison.png` visible in the Console continues to have nearby `Simulation result` or `simulation record` text. Retain the existing `Live monitor not connected` and `Monitor not connected` state, since HPC telemetry is not wired to the public site.

- [ ] **Step 4: Run the focused test and full suite.**

Run: `npm.cmd test -- --run src/test/App.test.tsx`
Expected: the new contract test passes.

Run: `npm.cmd test`
Expected: all tests pass with no regressions to routing, accessible navigation, content provenance, CV pending state, or console interactions.

### Task 3: Add a minimal Sites-compatible static-worker build adapter

**Files:**
- Add: `work/site/build/sites-vite-plugin.ts`
- Add: `work/site/worker/index.ts`
- Modify: `work/site/vite.config.ts`
- Modify: `work/site/tsconfig.node.json`
- Add: `work/site/.gitignore`

- [ ] **Step 1: Add a testable static SPA worker entry point.**

Create `worker/index.ts` as Worker-compatible ESM with no Node runtime imports. Its `fetch` handler must:

```ts
const response = await env.ASSETS.fetch(request);
if (response.status !== 404 || request.method !== "GET") return response;
if (new URL(request.url).pathname.includes(".")) return response;
return env.ASSETS.fetch(new Request(new URL("/index.html", request.url)));
```

This preserves asset 404 responses while allowing `/research`, `/console`, and `/cv` to load the React router on direct navigation.

- [ ] **Step 2: Add the minimal Vite build plugin.**

Create `build/sites-vite-plugin.ts`. After Vite has emitted the client bundle, copy the ESM-compatible worker source to `dist/server/index.js` and copy `.openai/hosting.json` to `dist/.openai/hosting.json` when it exists. Use Vite's `Plugin` type and `node:fs/promises`; do not add another application framework or replace React Router.

- [ ] **Step 3: Update Vite output layout.**

Update `vite.config.ts` to retain `react()` and configure:

```ts
build: { outDir: "dist/client", emptyOutDir: true }
```

Register the new Sites build plugin after React. Extend `tsconfig.node.json` to include `vite.config.ts` and `build` so the adapter type-checks with the project configuration.

- [ ] **Step 4: Add a minimal source-control ignore policy.**

Create `.gitignore` that excludes `node_modules/`, `dist/`, `.wrangler/`, logs, and TypeScript build-info files. Keep the two real source images under `public/assets/` tracked. Do not ignore `.openai/hosting.json`, because it is required by Sites deployment.

- [ ] **Step 5: Verify the deployable artifact shape.**

Run: `npm.cmd run build`
Expected: `dist/client/index.html` and `dist/server/index.js` exist.

Run: `Test-Path 'dist/client/index.html'`
Expected: `True`.

Run: `Test-Path 'dist/server/index.js'`
Expected: `True`.

### Task 4: Create the Sites project, persist deployment metadata, and publish the validated source

**Files:**
- Add: `work/site/.openai/hosting.json`
- Verify: `work/site/dist/.openai/hosting.json`

- [ ] **Step 1: Create exactly one Sites project after local validation.**

Use `sites_create_site` once with a stable portfolio name and a unique slug derived from `yifan-suo-research-workflow`. Preserve the returned project ID and source-repository write credential only for the deployment session. If the slug conflicts, retry only with the tool-reported conflict resolution path.

- [ ] **Step 2: Persist only allowed hosting metadata.**

Create `.openai/hosting.json` containing the exact `project_id` returned by Sites and no runtime secrets, D1 bindings, R2 bindings, or fake data services.

Run: `npm.cmd run build`
Expected: the build plugin copies the hosting metadata to `dist/.openai/hosting.json` and leaves `dist/server/index.js` intact.

- [ ] **Step 3: Initialize the isolated site source repository if it is still absent.**

The parent workspace does not expose a usable Git repository. Initialize Git only inside `work/site`, set the source repository returned by Sites, commit the exact validated source, and push with the temporary credential as a one-command HTTP authorization header. Do not initialize, repair, or rewrite Git metadata outside `work/site`.

- [ ] **Step 4: Package and save one deployment version.**

Run the Sites `package-site.sh` helper against `work/site` to create the required archive. Save a Sites version using the pushed branch-head commit SHA and the resulting archive. Verify that the archive contains `dist/server/index.js` and `dist/.openai/hosting.json`.

- [ ] **Step 5: Request final just-in-time publishing approval.**

Because the selected audience includes external HR and collaborators, ask one concise question that names the resolved access level before any shared or public deployment action. Only deploy after the user explicitly confirms that access level. Do not deploy a public link solely from the earlier design-selection answer.

- [ ] **Step 6: Deploy and verify the Site.**

After approval, deploy the saved version, poll deployment status to success, and open the exact returned URL in Codex. Report only the usable URL and the short user-facing outcome.

### Task 5: Final acceptance check

**Files:**
- Verify: `work/site/src/**`
- Verify: `work/site/index.html`
- Verify: `work/site/dist/**`

- [ ] **Step 1: Run final validation.**

Run: `npm.cmd test`
Expected: all tests pass.

Run: `npm.cmd run build`
Expected: a clean client and worker artifact are emitted.

Run a source scan for the three previously detected malformed glyph code points: `U+8DEF`, `U+74BA`, and `U+FFFD`.
Expected: no matches.

- [ ] **Step 2: Confirm the external-showcase acceptance criteria.**

- All four routes remain accessible and responsive through the SPA fallback.
- The Home, Research, CV, and Console pages keep their distinct responsibilities.
- The only real result image is labeled as a simulation result; conceptual imagery remains labeled conceptual.
- The Console does not imply live HPC telemetry or a connected run monitor.
- CV PDF and portrait remain honest pending states.
- No invented figures, metrics, identities, or fake scientific media have been introduced.
- The Sites deployment, if approved, reaches the requested shareable access level and returns a working URL.
