## Project Overview

A small, focused Angular 21 application demonstrating component architecture, RxJS stream management, and modern Angular patterns. The app should be modest in scope but coherent and polished.

## Tech Stack

- **Framework:** Angular 21 (standalone components, new control flow syntax)
- **Language:** TypeScript (strict mode)
- **Reactive:** RxJS 7+ (streams, operators, teardown)
- **Styling:** SCSS with Angular component styles (no CSS framework required, but Tailwind or Angular Material are acceptable)
- **Build:** Angular CLI (`ng serve`, `ng build`)
- **Package Manager:** npm
- **Node.js:** v25.6.1 (pinned in `.nvmrc` — run `nvm use` before any commands)

## Architecture Principles

### Component Design
- Use **standalone components** exclusively — no NgModules for component declarations.
- Use the **new control flow** syntax: `@if`, `@for`, `@switch`, `@empty`, `@defer` — never `*ngIf` or `*ngFor`.
- Keep components small and single-purpose. Split into smart (container) and dumb (presentational) components.
- Use `ChangeDetectionStrategy.OnPush` on all components.
- Inputs via `input()` signal function. Outputs via `output()` function or traditional `@Output()`.

### State & Data Flow
- Services handle all data fetching and state. Components never call `HttpClient` directly.
- Use a **service-with-subject** pattern or **signal-based state** for local app state.
- Parent-to-child: inputs. Child-to-parent: outputs/events. Cross-cutting: injectable services.
- Avoid deeply nested prop drilling — prefer a shared service when data spans 3+ levels.

### RxJS Discipline
- **Create streams** with `HttpClient`, `Subject`, `BehaviorSubject`, or `fromEvent` as appropriate.
- **Pipe and transform** — use operators like `map`, `switchMap`, `catchError`, `debounceTime`, `distinctUntilChanged`, `tap`, `shareReplay`, `combineLatest`, `startWith`, `filter`, `retry`, `finalize`.
- **Teardown/unsubscribe** — use one of these patterns consistently:
  - `async` pipe in templates (preferred — automatic cleanup).
  - `takeUntilDestroyed()` from `@angular/core/rxjs-interop` in injection context.
  - `DestroyRef` + `takeUntilDestroyed(destroyRef)` when subscribing imperatively.
- Never leave subscriptions unmanaged. No naked `.subscribe()` without cleanup.
- Handle errors in streams with `catchError` — never let an observable die silently.

### Error / Loading / Empty States
- Every data-driven view must handle three states: **loading**, **data**, and **error**.
- Use an `@if`/`@else` pattern or a wrapper component to toggle between states.
- Empty state: when data arrives successfully but the collection is empty, show a meaningful message.

## File & Folder Structure

```
src/
├── app/
│   ├── core/                  # Singleton services, interceptors, guards
│   │   └── services/
│   ├── features/              # Feature-area folders (each a self-contained unit)
│   │   └── <feature>/
│   │       ├── components/    # Presentational (dumb) components
│   │       ├── containers/    # Smart/container components
│   │       ├── models/        # Interfaces and types for this feature
│   │       └── services/      # Feature-scoped services (if any)
│   ├── shared/                # Reusable pipes, directives, utility components
│   ├── app.ts                 # Root component (standalone)
│   ├── app.html               # Root component template
│   ├── app.scss               # Root component styles
│   ├── app.config.ts          # Application config (providers)
│   └── app.routes.ts          # Route definitions
├── environments/
├── styles.scss                # Global styles, CSS variables
└── main.ts                    # bootstrapApplication entry point
```

## Coding Standards

### TypeScript
- Enable `strict: true` in `tsconfig.json`.
- Define explicit interfaces/types for all API responses and domain models — no `any`.
- Use `readonly` on properties that should not be reassigned.
- Prefer `const` over `let`. Never use `var`.

### Angular Conventions
- File naming: `kebab-case` — `user-list.ts`, `user-list.html`, `user-list.scss`, `user-list.spec.ts` (Angular 21 omits the `.component` / `.service` suffix by default; either convention is fine, but be consistent within the project).
- One component/service/pipe per file.
- Use `inject()` function for dependency injection, not constructor injection.
- Use `provideHttpClient(withInterceptorsFromDi())` or `withFetch()` in `app.config.ts`.
- Register services with `providedIn: 'root'` unless feature-scoped.

### Templates
- Use the `async` pipe to subscribe to observables in templates whenever possible.
- Keep template expressions simple — move logic to the component class or a pipe.
- Use `trackBy` function (via `@for (item of items; track item.id)`) for all lists.

### Styling
- Component-scoped SCSS. Minimal global styles.

### Formatting
- Prettier is configured in `.prettierrc`: single quotes, 100 char print width, Angular HTML parser.
- Always run `npx prettier --write .` before considering work done.
- Do not override Prettier's formatting choices with manual formatting.
- Use CSS custom properties (variables) for colors, spacing, and typography to keep theming consistent.
- The app should look clean and intentional — not default browser styling. A simple card/list layout with clear visual hierarchy is sufficient.

## API / Data

- **Primary API:** OMDb (https://www.omdbapi.com/)
- API key must be stored in `src/environments/environment.ts` — never hardcoded in services or components.
- Add `src/environments/environment.ts` to `.gitignore` if it contains a real key.
- Add basic retry logic (`retry(2)`) and meaningful error messages for all HTTP calls.
- Proxy config (`proxy.conf.json`) if needed for CORS during development.

## Commands

```bash
# Install dependencies
npm install

# Start dev server (default: http://localhost:4200)
npm run start

# Run tests
npm run test

# Check formatting
npx prettier --check .

# Fix formatting
npx prettier --write .

# Production build
npm run build
```

## README Expectations

The project must include a short `README.md` covering:
1. What the app does (1–2 sentences).
2. How to install and run it (`npm install` → `ng serve`).
3. Any environment setup or API keys needed.
4. Brief note on architecture decisions (optional but appreciated).

## API Configuration
- OMDb API base URL: `https://www.omdbapi.com/`
- API key should be stored in `src/environments/environment.ts`
- Use Angular's `environment` pattern for config

## API Response Shapes

Search endpoint: `GET /?s={query}&apikey={key}&page={n}`

## Quality Checklist

Before considering the project complete, verify:

- [ ] App compiles with zero errors and zero warnings.
- [ ] All components are standalone with `OnPush` change detection.
- [ ] New control flow syntax used everywhere (`@if`, `@for`).
- [ ] At least one meaningful RxJS pipeline with 2+ operators piped together.
- [ ] All subscriptions are properly cleaned up (async pipe or `takeUntilDestroyed`).
- [ ] Loading, error, and empty states are handled for data views.
- [ ] No `any` types in application code.
- [ ] UI is clean, readable, and responsive at common widths.
- [ ] README is present with run instructions.

## What NOT to Do

- Do not over-engineer. No NgRx, no complex routing guards, no auth flows — unless it naturally fits the chosen feature in a minimal way.
- Do not use legacy Angular patterns: no NgModules for declarations, no `*ngIf`/`*ngFor`, no constructor-based DI.
- Do not leave `console.log` statements in committed code.
- Do not ignore error states — an API call that can fail must show the user what happened.
- Do not install heavy UI libraries just for one button style. Keep dependencies lean.

## Planned Tasks
See `.claude/tasks/` for feature specs. Reference the relevant file when asking to implement a feature.

## Acceptance criteria
- Search only shows 10 results per page
- Pagination arrows are visible

## Workflow

1. **One task at a time.** Complete and verify each task before moving to the next.
2. **Read the full task file** before writing any code.
3. **Run checks** (see skills/run-checks) after completing each task.
4. **Commit after each task** with a message like: `feat: complete task 001 — add movie search`.
5. If a task depends on another, verify the dependency is implemented and passing before starting.
