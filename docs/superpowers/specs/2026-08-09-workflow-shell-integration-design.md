# Workflow Shell Integration

## Goal

Make the SmCo Workflow feel like a flagship case study inside the same portfolio rather than a separate application, while preserving its research-instrument panel and verified scientific content.

## Layout

- Render the global Header and Footer on `/research/smco-workflow` and the legacy `/console` redirect.
- Use the same page background, maximum content width, gutters, and vertical rhythm as Research and CV.
- Keep the warm-gray workflow panel as a contained feature surface inside the portfolio page.
- Replace the full-screen console canvas with a standard case-study wrapper.

## Navigation

- Keep `Research`, `SmCo Workflow`, and `CV` in the global navigation.
- Remove the panel-level `Back to Research` and `View CV` buttons because they duplicate the global navigation.
- Add a compact `Research / SmCo Workflow` breadcrumb above the panel title.

## Visual Continuity

- Preserve the current serif workflow title, warm scientific-instrument palette, stage selector, preview figures, and evidence panel.
- Reduce outer corner radius and shadow slightly so the panel reads as editorial content rather than a separate operating system.
- Preserve the existing responsive transformation of the stage selector and evidence panels.

## Behavior And Evidence

- Keep the four interactive stages and their current verified content unchanged.
- Do not add HPC status, live metrics, fabricated figures, or placeholder results.
- Keep `/console` redirecting to `/research/smco-workflow`.

## Verification

- Update navigation tests to require the global Header and Footer on the Workflow route.
- Verify all four stages still switch correctly.
- Compare desktop and mobile screenshots against Research and CV for header alignment, content width, spacing, and footer continuity.
- Run the full test suite and production build before deployment.
