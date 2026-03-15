# Generate Angular Component

When creating a new Angular component:

1. **Determine the component type:**
   - **Presentational (dumb):** `src/app/features/<feature>/components/<name>/`
   - **Container (smart):** `src/app/features/<feature>/containers/<name>/`

2. Use the Angular CLI:
   ```bash
   ng generate component <path/component-name> --standalone
   ```
3. Ensure the component uses:
   - `inject()` for dependency injection
   - Signals for state management where appropriate
   - `ChangeDetectionStrategy.OnPush`
   - New control flow syntax (`@if`, `@for`, `@switch`) — never `*ngIf`/`*ngFor`
4. Add a corresponding `*.spec.ts` test file
5. If the component needs data, inject a service — never use `HttpClient` directly in components
