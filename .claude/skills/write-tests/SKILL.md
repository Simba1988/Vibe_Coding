# Write Unit Tests

When writing or updating tests:

1. Use Vitest with jsdom (already configured in the project)
2. Co-locate test files: `*.spec.ts` next to the source file
3. For components:
  - Use Angular's `TestBed` with `provideExperimentalZonelessChangeDetection()`
  - Mock services using `vi.fn()` or provide fakes via `providers`
  - Test user-visible behavior, not implementation details
  - Test all states: loading, success, error, empty
4. For services:
  - Use `HttpTestingController` from `@angular/common/http/testing`
  - Verify correct URL, method, and request body
  - Simulate error responses and verify error handling
5. Prefer `describe`/`it` blocks with clear, behavior-driven descriptions
6. Never use `any` in tests — type mock data properly
