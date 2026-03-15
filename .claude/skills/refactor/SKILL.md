# Refactoring Workflow

When asked to refactor code:

1. **Run checks first** to establish a green baseline:
   ```bash
   npm run build && npm run test
   ```
2. Make changes in small, incremental steps
3. After each meaningful change, re-run:
   ```bash
   npm run build && npm run test
   ```
4. Never change behavior and structure in the same step
5. If tests break, fix them before continuing
6. Run formatting at the end:
   ```bash
   npx prettier --write .
   ```
