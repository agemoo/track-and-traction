# Track & Traction homepage UX/UI redesign

## Purpose

This redesign prepares the published Track & Traction homepage for the COMM 3030 UX/UI Website Design assignment. The page should help a student or early career independent musician understand the project quickly, choose a useful topic, and open the One Session, One Week Content Planner.

The work must create a visible difference from the saved before screenshot while keeping the existing pillar article and planner useful.

## Approved direction

The page uses the clear visitor path from the Guided Landing Page concept and borrows the editorial character of the Artist Field Notes concept.

The structure is practical and direct. The visual identity comes from a single orange audio waveform, narrow display type, documentary music images, thin editorial rules, and a restrained blue, orange, cream, and ink palette.

The homepage should feel like notes left beside a keyboard after rehearsal. It should not look like a software dashboard or a music marketing sales funnel.

## Visitor path

The homepage follows this order:

1. Understand the project in the hero.
2. Open the free planner from the main action.
3. Choose one of three content categories.
4. Learn the four step weekly method.
5. Read the existing pillar content.
6. Find the planner again near the end of the page.
7. Continue to Instagram, YouTube, or LinkedIn.

The navigation contains The method, Content ideas, About, and Open the free planner. On small screens, the links collapse into a compact menu while the planner action stays easy to reach.

## Hero

The hero uses the following copy:

### Heading

Make music.

Plan the week.

### Supporting copy

A rehearsal, Cubase session, or show usually leaves useful material behind. This page helps you decide what to post before those files disappear into your camera roll.

### Main action

Build my content week

The action opens `planner.html`. The hero image remains grounded in real music making. The orange waveform sits over the image as the page's signature visual device.

## Category buttons

Three large category buttons appear directly below the hero. Each one uses a short field note label, a clear topic name, and one sentence explaining what the visitor will find.

### Music making

Label: Session notes

Description: Composition, arranging, Cubase sessions, and instrument parts.

### Rehearsal and performance

Label: Stage notes

Description: Practice clips, live footage, mistakes, and what changed before the show.

### Artist promotion

Label: Traction notes

Description: Simple content plans, platform choices, and results worth checking next week.

Each button moves the visitor to the matching section of the existing pillar article. The entire card is interactive, not only the title.

## Weekly method

The method section gives visitors a quick overview before the longer article:

1. Capture
2. Choose
3. Schedule
4. Review

This sequence is short enough to scan and gives the numbered structure a real purpose.

## Social platforms

The homepage shows three visible social destinations:

1. Instagram for rehearsal clips, Cubase sessions, arrangement notes, and planner traffic.
2. YouTube for searchable Shorts and longer process videos.
3. LinkedIn for weekly notes about decisions, mistakes, tests, and results.

The social section appears before the footer. Until real account links are ready, the controls remain visually complete but use safe placeholder behavior. They must not send visitors to an unrelated profile.

## Visual system

### Color

* Ink blue: `#14243A`
* Action blue: `#174CFF`
* Marker orange: `#FF5932`
* Paper cream: `#FBFAF6`
* Cool grey: `#E8EDF4`

Orange is reserved for the waveform, small labels, and selected or active states. Blue is used for the main planner action. Ink blue carries navigation, body contrast, and the footer.

### Type

Encode Sans Condensed remains the display and interface face. Literata remains the reading face. Large headings use tight spacing and short line lengths. Article paragraphs keep a comfortable reading width.

### Layout

The desktop hero uses a text and image split. Category buttons form a three column editorial row. Thin rules create structure without turning every section into a rounded card.

On mobile, the hero stacks with the copy first. Categories become a single column. Buttons use full width where useful, and body text remains readable without zooming.

## Motion

Motion should help the page explain itself.

### Page entrance

The hero copy enters with a short upward fade. The waveform draws across the image once. The image itself stays still so the opening does not feel busy.

### Category interaction

Hover and keyboard focus move the category title a few pixels and reveal a small directional cue. Border and background changes provide a clear selected state.

### Method reveal

The four method steps appear in order when the section enters the viewport. The total sequence should finish quickly.

### Planner action

The planner button uses a small arrow movement on hover and focus. It does not pulse or animate continuously.

### Accessibility

All animation respects `prefers-reduced-motion`. With reduced motion enabled, content appears immediately and every interaction still works. Focus states remain visible. Motion must not be required to understand the page.

## Content voice

The writing uses concrete music details and plain verbs. It can mention rehearsal, Cubase, live footage, camera roll files, and actual weekly review work. It avoids inflated marketing claims, generic creator language, and promises of fast growth.

Final public copy must not contain em dashes or en dashes. Sentence rhythm should vary, but the copy should remain easy for an international student to explain in class.

## Existing content and boundaries

The current pillar article remains on the homepage. The redesign changes its entry points, hierarchy, and presentation rather than replacing it with a short sales page.

The printable planner remains a separate page. No account system, download tracking service, social login, or new publishing system is included in this assignment update.

The current four local images remain available. A new image is only needed if the existing hero cannot support the waveform treatment clearly.

## Technical behavior

Category buttons use page anchors. The planner actions link to `planner.html`. Existing JavaScript interactions remain functional. New motion uses lightweight CSS where possible and a small observer for scroll based reveals.

The page must work when JavaScript is unavailable. All content remains visible, all anchors work, and the planner remains reachable.

## Verification

The finished page will be checked at desktop and mobile widths. Verification covers:

* No horizontal overflow
* Readable navigation and body copy
* Working category anchors
* Working planner links
* Three visible social platform controls
* Visible keyboard focus
* Reduced motion behavior
* Existing planner interaction and print behavior
* Existing automated tests plus new checks for assignment requirements

After verification, the published GitHub Pages URL must be opened from the visitor side. The user will submit the saved before screenshot and the public homepage URL.
