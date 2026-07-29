# External Research Showcase Optimization

## Goal

Prepare Yifan Suo's research portfolio as a shareable external website for hiring teams and research collaborators. Preserve the approved calm, warm-gray scientific-studio visual language while improving content hierarchy, visual consistency, mobile resilience, and publication readiness.

## Audience And Outcome

- Primary visitors: hiring managers and potential research collaborators.
- Secondary visitor: Yifan using Console as a personal, evidence-first research environment.
- Deliverable: a shareable Sites deployment of the validated portfolio.

## Page Responsibilities

1. Home states the computational materials identity and gives direct access to Research, CV, and Console.
2. Research presents a project-led portfolio: current SmCo work plus dual-laser PBF, battery FE-ANN, thermal-shock fracture, SiC, and Shining 3D R&D.
3. CV provides verified text-based background and retains honest pending states for an authentic portrait and CV PDF.
4. Console remains a non-live research workflow view. Its SmCo figure is labelled as a simulation result and its HPC state is explicitly not connected to live monitoring.

## Visual And Content Rules

- Keep the warm-gray paper palette, large rounded Console surface, editorial typography, restrained technical microcopy, and responsive layouts.
- Remove visible encoding/typographic inconsistencies and align labels, captions, buttons, and empty states across routes.
- Use only real or clearly conceptual scientific imagery. Do not generate, imply, or publish invented results, metrics, job states, or identities.
- Retain the current SmCo simulation image at the user's direction and label it consistently as a simulation result. A shareable deployment does not replace any required supervisor or publication-rights clearance.
- Do not add real-time HPC, authentication, databases, uploads, a synthetic portrait, or a fabricated CV PDF.

## Delivery Architecture

- Preserve the existing React/Vite multi-route architecture and its test suite.
- Add Sites hosting metadata and only the necessary Workers-compatible build configuration.
- Keep source and public assets inside the existing project structure.
- Deploy with shareable access. If the available Sites access level would make the site publicly indexed or otherwise broader than a shareable link, pause for explicit user approval before that deployment action.

## Error And Empty States

- Missing portrait and CV PDF remain explicit, accessible, non-deceptive pending states.
- Console must distinguish unavailable live monitoring from factual research evidence.
- All routes retain readable textual information if image loading fails.

## Acceptance Criteria

- All four routes are accessible and visually coherent on desktop and mobile without horizontal overflow.
- Primary navigation, Research-to-Console handoff, Console stage selection, email interaction, and pending CV states work.
- The visible source contains no encoding artifacts such as replacement characters or invalid separators.
- Every scientific figure has a truthful label or caption.
- Automated tests and production build pass.
- A Sites deployment is created with the approved shareable access level and its URL is returned.
