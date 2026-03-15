import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/movie-search/containers/movie-search/movie-search').then(
        (m) => m.MovieSearchComponent,
      ),
  },
];
