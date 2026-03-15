
# Run checks

When asked to verify work:

1. **Ensure correct Node version:**
   ```bash
   source ~/.nvm/nvm.sh && nvm use
   ```
2. **Format code first (fix, don't just check):**
   ```bash
   npx prettier --write .
   ```
3. **Lint/Format verification:**
   ```bash
   npx prettier --check .
   ```
4. **Unit tests:**
   ```bash
   npm run test
   ```
5. **Production build:**
   ```bash
   npm run build
   ```
6. **On failure:**
   - Summarize failures with file paths and line numbers
   - Propose minimal, targeted fixes for each failure
   - Apply fixes and re-run the failing step before continuing
   - Never proceed to commit if any check fails
