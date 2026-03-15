# Task 004: Clean Code & Project Structure

## Goal
Refactor the codebase so that every component follows Angular 21 best practices: separate files for template, styles, and logic; proper folder structure per CLAUDE.md; and removal of all scaffold boilerplate.

## Prerequisites
- Tasks 001, 002, and 003 must be complete and passing before starting this task.

## Context
After rapid feature development in tasks 001–003, code quality may have drifted. This task is a dedicated cleanup pass — no new features, only structural and quality improvements.

## Requirements

### 1. Remove Angular Scaffold Boilerplate
- Delete the default placeholder content from `app.html` (the giant Angular logo SVG, "Hello" greeting, pill links, social links, and all associated inline `<style>` blocks).
- `app.html` should contain only the actual application shell (toolbar/header, `<router-outlet />`, and any app-level layout).

### 2. Separate Template, Styles, and Logic
For **every** component in the project:
- **Template** must be in its own `.html` file (use `templateUrl`, never inline `template`).
- **Styles** must be in its own `.scss` file (use `styleUrl` / `styleUrls`, never inline `styles` or `<style>` blocks in templates).
- **TypeScript** file contains only component logic — no HTML strings, no CSS strings.

### 3. Enforce Folder Structure
Verify the project matches the structure defined in CLAUDE.md:
- Move any misplaced files to the correct location.
- Update all import paths after moving files.

### 4. Angular 21 Best Practices Audit
Verify and fix across all components:
- [ ] `ChangeDetectionStrategy.OnPush` on every component.
- [ ] `inject()` for dependency injection — no constructor DI.
- [ ] `input()` / `output()` signal functions — no `@Input()` / `@Output()` decorators.
- [ ] New control flow syntax only (`@if`, `@for`, `@switch`) — no `*ngIf` / `*ngFor`.
- [ ] Standalone components only — no NgModules for declarations.
- [ ] Observables in templates use `async` pipe or are converted to signals.
- [ ] All subscriptions have proper teardown (`async` pipe, `takeUntilDestroyed()`).

### 5. TypeScript Quality
- [ ] No `any` types anywhere in application code.
- [ ] Explicit interfaces/types for all API responses and domain models.
- [ ] `readonly` on properties that should not be reassigned.
- [ ] `const` over `let` everywhere possible. No `var`.
- [ ] Remove any leftover `console.log` statements.

### 6. Styling Cleanup
- [ ] No inline `<style>` blocks in any template file.
- [ ] CSS custom properties (variables) used for colors, spacing, and typography in `styles.scss`.
- [ ] Component styles are scoped — minimal global styles.
- [ ] Remove any unused CSS rules or classes.

### 7. Formatting
- Run `npx prettier --write .` as the final step.

## Constraints
- **No new features.** This is a refactor-only task.
- **No behavioral changes.** The app must work identically before and after.
- **Preserve all existing tests.** Fix import paths if files were moved.
- Follow all conventions defined in CLAUDE.md and the SKILL.md for component generation.

## Verification Steps
1. `npm run build` — zero errors, zero warnings.
2. `npm run test` — all tests pass.
3. `npx prettier --check .` — no formatting issues.
4. Manually verify: search, pagination, and UI polish still work as expected.

## Acceptance Criteria
- [ ] No default Angular scaffold content remains in `app.html`.
- [ ] Every component has separate `.ts`, `.html`, and `.scss` files.
- [ ] Folder structure matches CLAUDE.md spec.
- [ ] All components use `OnPush`, `inject()`, and new control flow syntax.
- [ ] No `any` types in application code.
- [ ] No `console.log` statements.
- [ ] No inline styles in templates.
- [ ] `npm run build` passes with zero errors/warnings.
- [ ] `npm run test` passes.
- [ ] `npx prettier --check .` passes.
- [ ] App behavior is unchanged.
