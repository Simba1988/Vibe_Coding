
# Task 003: Polish UI

## Goal
Make the UI look modern and polished.

## Design Direction
- Clean, airy layout with generous whitespace
- Soft rounded corners on cards and inputs
- Subtle box shadows for depth (no harsh borders)
- A muted, modern color palette (e.g., white/light-gray background, one accent color)
- Clear visual hierarchy: large search bar at top, grid of movie cards below
- Smooth hover transitions on interactive elements

## Requirements
- Use Angular Material for UI components (toolbar, cards, buttons, dialog, input)
- Search bar: rounded corners, white background, subtle shadow
- Movie cards: consistent sizing, poster image prominent, clean typography
- Responsive grid layout using CSS Grid or Flexbox (not a layout library)
- Smooth transitions/animations for state changes (loading → results)

## Constraints
- Angular 21 standalone components
- Install Angular Material via `ng add @angular/material`
- Do not install Angular Flex Layout (deprecated)
- Keep custom CSS minimal — leverage Material's theming system

## Acceptance Criteria
- [ ] Angular Material is installed and themed
- [ ] Search bar has rounded corners, white background, and shadow
- [ ] Movie results display in a responsive card grid
- [ ] Cards have hover effect with subtle shadow/scale transition
- [ ] Layout works well at 360px, 768px, and 1440px widths
- [ ] Color contrast meets WCAG AA standards
- [ ] Interactive elements have visible focus indicators
