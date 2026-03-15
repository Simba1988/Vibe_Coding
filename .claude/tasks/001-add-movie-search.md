# Task 001: Add movie search

## Goal
Build a movie search feature using OMDb.

## Requirements
- Add a search input
- Debounce user typing
- Call OMDb API
- Show loading, empty, success, and error states
- Render poster, title, year, imdbRating
- If a movie is missing the image, show a missing image placeholder
- When a movie is clicked, show all the details for it in a modal

## API Configuration
- OMDb API base URL: `https://www.omdbapi.com/`
- API key should be stored in `src/environments/environment.ts`
- Use Angular's `environment` pattern for config

## Constraints
- Angular 21.2.0 standalone components
- Use HttpClient
- Use RxJS operators, not imperative event handling
- Keep styling simple

## Acceptance criteria
- Search runs after brief pause in typing
- Duplicate queries are ignored
- API errors show a friendly message
- Feature is testable
