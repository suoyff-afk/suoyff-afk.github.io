# Public Research Portfolio Reframing

## Goal

Reframe Yifan Suo's existing website as a low-maintenance public research portfolio for hiring teams, materials R&D leaders, and research collaborators. Preserve the approved warm-gray scientific-studio visual language while removing the impression that the site is a second daily workspace.

## Product Position

The website is a curated external presentation layer. Codex remains the active research workspace and source of truth; the website is updated only when a project reaches a meaningful public milestone.

The site must help a visitor answer four questions quickly:

1. Who is Yifan Suo?
2. What materials and computational problems does he work on?
3. What did he personally contribute and what evidence exists?
4. How can the visitor inspect a deeper case or make contact?

## Audience Priorities

1. Hiring managers and materials R&D leaders need a fast identity statement, project relevance, technical breadth, and credible outcomes.
2. Research collaborators need methods, workflow logic, evidence boundaries, and current research questions.
3. Yifan needs a site that remains useful without daily manual maintenance.

## Information Architecture

### Global Navigation

- Keep only `Research` and `CV` in the primary navigation.
- Keep the wordmark as the Home link.
- Remove `Console` from desktop navigation, mobile navigation, and Home calls to action.
- Keep email access in the existing Home and footer contact surfaces.

### Home

Home remains a concise identity and orientation page:

- State `Computational Materials Scientist` prominently.
- Retain the process-structure-property positioning and conceptual workflow figure.
- Keep only `View CV` and `Research` as primary actions.
- Do not add project dashboards, status summaries, activity feeds, or administrative controls.

### Research

Research is the primary portfolio destination:

- Retain the research-area overview as a conceptual orientation device.
- Present projects as an extensible card collection rather than a chronological activity log.
- Cover SmCo, dual-laser LPBF, solid-state battery FE-ANN, thermal-shock fracture, SiC ceramics, and Shining 3D R&D.
- Each card must use the strongest verified material available: research problem, Yifan's contribution, methods, evidence or outcome, and publication/project state.
- A project without an approved result image remains text-only. The interface must not show decorative scientific placeholders or generated result imagery.
- SmCo remains the featured project and is the only card with an `Explore research workflow` action.

### SmCo Research Workflow

The current immersive Console visual is retained but reframed as a public project case study at `/research/smco-workflow`.

- Use `SmCo Process-Structure-Property Workflow` as the page identity.
- Explain the pipeline as `LPBF thermal history -> CUDA 3D grain evolution -> S2M mesh conversion -> MOOSE / NISOS magnetic response`.
- Keep the stage selector and approved real SmCo simulation figure.
- Replace personal-workspace language with visitor-facing case-study language.
- Replace `HPC handoff`, `Live monitor not connected`, `Extraction gate`, and similar operational labels with `Computational pipeline`, `Current evidence`, `Limitation`, and `Next validation`.
- Show only verified status and evidence from the existing content source. Missing figures use a clear evidence-unavailable state without suggesting failure or fabricated progress.
- Provide a visible `Back to Research` route and a secondary `View CV` route.
- Keep `/console` as a compatibility redirect to `/research/smco-workflow`; it is not a public navigation destination.

### CV

- Preserve the current CV structure and honest pending portrait/PDF states.
- Keep education, research and R&D experience, skills, location, and contact information as the evidence layer behind the portfolio narrative.
- Do not block this release on a portrait or PDF.

## Visual Direction

- Preserve the current warm-gray paper palette, editorial serif display type, restrained monospaced labels, rounded research surface, and soft spatial depth.
- Preserve the workflow page's stronger immersive panel hierarchy without turning it into a futuristic control room.
- Avoid additional cards where headings, whitespace, or a simple rule can provide structure.
- Keep interactions purposeful: workflow stage selection, navigation, CV access, and email copy only.
- Do not introduce gradients or accents outside the established palette merely to signal interactivity.

## Content Integrity

- Use only real research images or clearly labelled conceptual illustrations.
- Do not invent results, HPC states, publications, collaborations, metrics, or project readiness.
- Distinguish verified evidence, documented background, current limitation, and next validation.
- Preserve conservative scientific wording such as `indicates`, `current dataset`, and `requires further verification` where applicable.

## Routing And Deployment

- Add `/research/smco-workflow` as the canonical workflow route.
- Redirect `/console` to the canonical route so existing links do not break.
- Extend page-title handling to the canonical workflow route.
- Make the GitHub Pages artifact include a `404.html` copy of the built application shell so direct visits to `/research`, `/cv`, and `/research/smco-workflow` load the React router instead of GitHub's default 404 page.
- Preserve the existing Sites-compatible worker output and GitHub Pages deployment workflow.

## Responsive And Accessible Behavior

- Retain keyboard-operable stage selection and visible focus states.
- Preserve mobile menu focus handling and body scroll lock.
- On small screens, workflow navigation becomes a compact stage grid and all evidence remains readable without horizontal scrolling.
- Images retain meaningful alt text; captions identify conceptual and simulation imagery truthfully.
- Route changes and hash navigation continue to move focus predictably.

## Explicit Non-Goals

- No daily research tracking or manual progress maintenance.
- No live HPC integration, job submission, queue monitoring, or fabricated status panel.
- No document or literature manager.
- No authentication, database, CMS, uploads, or private workspace.
- No generated scientific result images.
- No broad visual redesign of Home, Research, or CV.

## Acceptance Criteria

1. Global navigation and Home contain no `Console` link.
2. Research presents all verified research and R&D projects, with SmCo featured and linked to `Explore research workflow`.
3. The canonical workflow route is `/research/smco-workflow`, and `/console` redirects to it.
4. The workflow page reads as an external SmCo case study, not a personal dashboard, while retaining the approved immersive warm-gray design.
5. No live-HPC or daily-workspace claim remains visible.
6. Existing scientific evidence and limitation wording remain traceable and non-fabricated.
7. Direct GitHub Pages visits to `/research`, `/cv`, and `/research/smco-workflow` load successfully.
8. Automated tests and the production build pass.
9. Desktop and mobile visual checks show no navigation, overflow, focus, or legibility regression.
10. The public GitHub Pages deployment completes and the root plus all canonical direct links are verified.
