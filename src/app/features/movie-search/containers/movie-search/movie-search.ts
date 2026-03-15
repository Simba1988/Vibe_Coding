import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  Subject,
  Observable,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  catchError,
  of,
  startWith,
  map,
} from 'rxjs';
import { MovieService } from '../../services/movie.service';
import { MovieSearchResult, OmdbDetailResponse } from '../../models/movie.model';
import { MovieCardComponent } from '../../components/movie-card/movie-card';
import { MovieDetailModalComponent } from '../../components/movie-detail-modal/movie-detail-modal';

interface LoadingState {
  readonly status: 'loading';
}
interface IdleState {
  readonly status: 'idle';
}
interface SuccessState {
  readonly status: 'success';
  readonly data: MovieSearchResult;
}
interface ErrorState {
  readonly status: 'error';
  readonly message: string;
}
interface EmptyState {
  readonly status: 'empty';
  readonly query: string;
}

export type SearchViewState = IdleState | LoadingState | SuccessState | ErrorState | EmptyState;

@Component({
  selector: 'app-movie-search',
  imports: [AsyncPipe, MovieCardComponent, MovieDetailModalComponent],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSearchComponent {
  private readonly movieService = inject(MovieService);
  private readonly searchSubject = new Subject<string>();

  protected selectedMovieDetail$: Observable<OmdbDetailResponse | null> | null = null;
  protected showModal = false;

  protected readonly viewState$: Observable<SearchViewState> = this.searchSubject.pipe(
    debounceTime(300),
    map((query) => query.trim()),
    distinctUntilChanged(),
    switchMap((query) => {
      if (!query) {
        return of<SearchViewState>({ status: 'idle' });
      }
      return this.movieService.searchMovies(query).pipe(
        map((result): SearchViewState => {
          if (result.movies.length === 0) {
            return { status: 'empty', query };
          }
          return { status: 'success', data: result };
        }),
        catchError((error: Error) =>
          of<SearchViewState>({ status: 'error', message: error.message }),
        ),
        startWith<SearchViewState>({ status: 'loading' }),
      );
    }),
    startWith<SearchViewState>({ status: 'idle' }),
  );

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onMovieClick(imdbId: string): void {
    this.showModal = true;
    this.selectedMovieDetail$ = this.movieService
      .getMovieDetail(imdbId)
      .pipe(catchError(() => of(null)));
  }

  onCloseModal(): void {
    this.showModal = false;
    this.selectedMovieDetail$ = null;
  }
}
