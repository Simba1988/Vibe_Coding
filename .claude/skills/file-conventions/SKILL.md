# File & Naming Conventions

When creating new files:

1. **Components:** `src/app/features/<feature>/components/<name>/<name>.ts`
2. **Container/smart components:** `src/app/features/<feature>/containers/<name>/<name>.ts`
3. **Services:** `src/app/core/services/<name>.service.ts` (app-wide) or `src/app/features/<feature>/services/<name>.service.ts` (feature-scoped)
4. **Models/interfaces:** `src/app/features/<feature>/models/<name>.model.ts`
5. **Shared utilities:** `src/app/shared/`
6. All file names use `kebab-case`
7. One export per file
8. Every component must have a co-located `.spec.ts` file
