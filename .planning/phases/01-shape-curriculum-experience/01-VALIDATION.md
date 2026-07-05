# Phase 1 Validation Strategy

**Phase:** 1
**Slug:** shape-curriculum-experience
**Created:** 2026-07-04

## Validation Architecture

This phase produces a design/shape artifact, not code. Validation is document and source-coverage based.

## Required Checks

### Requirement Coverage

Every v1 requirement from `.planning/REQUIREMENTS.md` must be referenced in at least one plan and addressed in the final shape artifact:

- CURR-01, CURR-02, CURR-03
- INFO-01, INFO-02, INFO-03
- LESS-01, LESS-02, LESS-03
- METH-01, METH-02, METH-03
- CAP-01, CAP-02
- DSGN-01, DSGN-02, DSGN-03

### Decision Coverage

The final shape artifact must explicitly honor:

- D-01 shape-only output
- D-02 hybrid integration
- D-03 brand preservation
- D-04 curriculum journey
- D-05 lesson content model
- D-06 AI + draw.io learning method
- D-07 capstone directions
- D-08 canonical refs

### Impeccable Shape Coverage

The artifact must include the core `/impeccable shape` brief structure:

1. Feature Summary
2. Primary User Action
3. Design Direction
4. Scope
5. Layout Strategy
6. Key States
7. Interaction Model
8. Content Requirements
9. Recommended References
10. Open Questions or explicit defaults

### Brand And Accessibility Coverage

The artifact must preserve:

- dark arena / pit slate / cyan-silver signal identity
- sponsor-grade credibility
- anti-reference: cartoonish/kid-only STEM
- mobile readability
- WCAG AA contrast expectation
- reduced-motion expectation for future implementation

## Suggested Verification Commands

Because this is a documentation/shape phase, verification can be source checks:

```bash
test -f .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md
rg "CURR-01|INFO-01|LESS-01|METH-01|CAP-01|DSGN-01" .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md
rg "D-01|D-02|D-03|D-04|D-05|D-06|D-07|D-08" .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md
rg "Feature Summary|Primary User Action|Design Direction|Layout Strategy|Content Requirements" .planning/phases/01-shape-curriculum-experience/01-SHAPE-BRIEF.md
```

## Manual Review

Ask the user to confirm the shape brief before any implementation/craft phase begins.
