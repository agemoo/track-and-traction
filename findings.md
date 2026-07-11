# Findings

## Project

- `AGENTS.md` says `TRACK_AND_TRACTION.md` is canonical.
- Track & Traction is an independent academic growth marketing project for student and early-career independent musicians.
- Its promise is to help musicians turn one song, rehearsal, recording session, or performance into a manageable week of content.
- The first resource is the One Session, One Week Content Planner.
- The work must not be framed as paid client work or as an established business.

## Assignment

- The page is being created from scratch under option 3.
- Required elements: at least 600 words, catchy title, subheadings, a heading image, images for each major subtopic, strong writing, and a public URL.
- Rubric areas: content, branding/impression management, text layout/use of multimedia, and writing/proofreading.
- The course policy states a 25% AI tolerance. The user must personally review, verify, and edit the final prose before submission.

## Design

- Brand register is the correct Impeccable register because this is a landing page and long-form marketing surface.
- The project has no existing frontend code, CSS tokens, or committed visual identity.
- Avoid generic music cues: neon nightclub gradients, waveform wallpaper, black-and-acid-green palettes, and “go viral” language.
- Avoid generic AI landing-page cues: repeated card grids, tiny uppercase eyebrows everywhere, gradient text, excessive rounding, and zero imagery.
- Recommended design is an image-led, high-contrast field guide with one signature interactive content sequencer.

## Technical

- There is no Git repository in the workspace.
- A static site keeps deployment easy and is sufficient for the assignment.
- Node is available, so built-in `node:test` can validate page structure without adding dependencies.

## Visual QA

- At 390×844, the landing page has no horizontal overflow. The wordmark, navigation, full-width planner action, hero copy, and image remain readable.
- The mobile H1 stays within the 335px content width and the hero remains 704px tall.
- At 390×844, the printable planner has no horizontal overflow and its controls stack clearly.
- At 1440×900, DOM geometry reports no horizontal overflow and the article headings stay within their grid columns.
- All four images resolve when their sections enter the viewport.
- The Tuesday sequencer state updates its pressed state, heading, format, and next action correctly.
- The final orange accent at `oklch(0.58 0.17 43)` has an estimated 4.60:1 contrast against white, keeping small wordmark text and white-on-orange selected controls within the AA target.
- Impeccable's static detector flagged `index.html` and `planner.html` as single-font because it scans each HTML file without resolving the linked stylesheet. The implemented CSS explicitly pairs Encode Sans Condensed for display with Atkinson Hyperlegible Next for body text, so the warning is a cross-file false positive rather than a design defect.

## Font Catalog Check

- Google Fonts describes Encode Sans as a warm, practical humanist workhorse with open apertures and multiple widths.
- Google Fonts describes Atkinson Hyperlegible Next as a legibility-focused grotesque with distinctive character forms and expanded weights.
- Initial pairing: Encode Sans Condensed for display and Atkinson Hyperlegible Next for article text.
- After visual review, Literata replaced Atkinson for article text. Its serif texture gives the long-form page more character while Encode Sans Condensed keeps navigation and headlines direct.

## 2026-07-03 Requested Refinements

- The wordmark overlap comes from drawing the orange dot with `box-shadow`; the shadow extends outside the beat element's 0.72rem layout box.
- The Planner blocks typing over the guidance because seven Purpose fields use `value`, which is actual form data. Other fields already use the correct `placeholder` pattern.
- Navigation should contain exactly The Method, The Week, and Open the Planner.
- Hero reading-time metadata and its divider should be removed together by deleting the metadata component.
- Literata will replace Atkinson Hyperlegible Next for body copy, creating a clearer serif/sans contrast while preserving Encode Sans Condensed for display.
- Browser interaction confirmed that a Purpose field starts empty and accepts typing immediately while retaining its placeholder attribute.
- The focus placeholder color `oklch(0.48 0.03 230)` is lighter than the default muted color while retaining an estimated 6.48:1 contrast against white.
