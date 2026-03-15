# Commit Workflow

When committing work after completing a task:

1. **Run all checks first** (see skills/run-checks)
2. **Stage changes:**
   ```bash
   git add -A
   ```
3. **Commit with a conventional commit message:**
   ```bash
   git commit -m "feat: complete task <number> — <short description>"
   ```
4. Commit message rules:

- Use conventional commit prefixes: `feat:`, `fix:`, `refactor:`, `test:`, `chore:`
- Keep the subject line under 72 characters
- Reference the task number

5. **Never push** — pushing is explicitly denied
