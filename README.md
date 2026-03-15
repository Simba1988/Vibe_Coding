# Movie Search

A movie search application built with Angular 21 and the OMDb API. Search for movies with debounced input, browse paginated results in a responsive card grid, and view detailed information in a modal.

## Features

- Debounced search with loading, error, and empty states
- Paginated results (10 per page) with Previous/Next navigation
- Movie detail modal with poster, rating, genre chips, plot, and credits
- Responsive grid layout (2–5 columns depending on screen width)
- Angular Material UI components with M3 theming

## Tech Stack

- **Framework:** Angular 21 (standalone components, signal inputs/outputs, new control flow)
- **UI:** Angular Material 21 (M3 theme)
- **Reactive:** RxJS 7 (debounceTime, switchMap, distinctUntilChanged, catchError)
- **Styling:** SCSS with CSS custom properties
- **Testing:** Vitest 4
- **API:** [OMDb API](https://www.omdbapi.com/)

## Prerequisites

- Node.js v25.6.1 (pinned in `.nvmrc`)
- npm 11+

## Getting Started

```bash
# Use the correct Node version
nvm use

# Install dependencies
npm install

# Set up your OMDb API key
# Edit src/environments/environment.ts and replace YOUR_API_KEY_HERE with your key
# Get a free key at https://www.omdbapi.com/apikey.aspx
```

## Running the App

```bash
npm run start
```

Open http://localhost:4200 in your browser.

## Running Tests

```bash
npm run test
```

## Production Build

```bash
npm run build
```

Output is written to `dist/Vibe_Coding/`.

## Architecture

The project follows a feature-based folder structure with smart/dumb component separation:

```
src/app/
├── features/movie-search/
│   ├── components/        # Presentational: movie-card, movie-detail-modal, pagination
│   ├── containers/        # Smart: movie-search (RxJS pipeline, state management)
│   ├── models/            # TypeScript interfaces for API and domain types
│   └── services/          # MovieService (HTTP, retry, error mapping)
├── app.ts                 # Root component with Material toolbar
├── app.config.ts          # Providers (router, HTTP, animations)
└── app.routes.ts          # Lazy-loaded route to MovieSearchComponent
```

All components use `ChangeDetectionStrategy.OnPush`, the `inject()` function for DI, and `input()`/`output()` signal functions.
