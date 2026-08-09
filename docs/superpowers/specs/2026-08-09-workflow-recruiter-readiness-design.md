# Workflow Recruiter Readiness

## Goal

Make the SmCo case study quickly explain Yifan Suo's role, existing engineering evidence, and transferable research experience without adding unverified claims or fabricated figures.

## First-View Positioning

- Add a factual role line: PhD researcher at TU Darmstadt working in computational materials science, additive manufacturing, and multiphysics simulation.
- Use `SmCo Multiphysics Workflow` as the mobile title while retaining the full process-structure-property title on larger screens.
- Rename the repeated `Verified evidence only` status to the less defensive `Research evidence`.

## Contribution And Evidence

- Add a `My contribution` module based only on existing portfolio records: workflow integration, simulation setup, parameter studies, post-processing, validation, and interpretation.
- Do not imply independent development of CUDA, S2M, MOOSE, or NISOS solvers; use language such as `used`, `integrated`, and `evaluated`.
- Rename the stage summary to `Stage result` and the source field to `Method / source`.
- For stages without an attached result image, replace the large empty-result panel with a compact `Ongoing validation` notice so existing quantitative evidence remains prominent.

## Related Work

- Add links to Dual-laser LPBF, solid-state battery FE-ANN, and Shining 3D work at the bottom of the case study.
- Add stable project anchors on the Research page so these links open the relevant project card.
- Keep CV and Contact available through the shared site navigation and footer; do not add a download action until a real CV PDF is available.

## Evidence Boundary

- Keep all current values and limitations unchanged.
- Do not add the unverified expected-graduation date.
- Do not create scientific imagery or claim that missing publication-ready figures exist.

## Verification

- Test role positioning, contribution wording, related-project anchors, compact ongoing-validation states, and responsive title content.
- Visually inspect desktop and 390-pixel mobile layouts.
- Run the full test suite and production build before public deployment.
