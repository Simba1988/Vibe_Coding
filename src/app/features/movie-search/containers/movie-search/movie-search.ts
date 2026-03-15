import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {
  BehaviorSubject,
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
import { PaginationComponent } from '../../components/pagination/pagination';

interface LoadingState {
  readonly status: 'loading';
}
interface IdleState {
  readonly status: 'idle';
}
interface SuccessState {
  readonly status: 'success';
  readonly data: MovieSearchResult;
  readonly currentPage: number;
  readonly totalPages: number;
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

const RESULTS_PER_PAGE = 10;

@Component({
  selector: 'app-movie-search',
  imports: [AsyncPipe, MovieCardComponent, MovieDetailModalComponent, PaginationComponent],
  templateUrl: './movie-search.html',
  styleUrl: './movie-search.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieSearchComponent {
  private readonly movieService = inject(MovieService);
  private readonly searchSubject = new Subject<string>();
  private readonly pageSubject = new BehaviorSubject<number>(1);

  protected selectedMovieDetail$: Observable<OmdbDetailResponse | null> | null = null;
  protected showModal = false;

  private readonly query$ = this.searchSubject.pipe(
    debounceTime(300),
    map((query) => query.trim()),
    distinctUntilChanged(),
  );

  protected readonly viewState$: Observable<SearchViewState> = this.query$.pipe(
    switchMap((query) => {
      if (!query) {
        this.pageSubject.next(1);
        return of<SearchViewState>({ status: 'idle' });
      }

      this.pageSubject.next(1);

      return this.pageSubject.pipe(
        distinctUntilChanged(),
        switchMap((page) =>
          this.movieService.searchMovies(query, page).pipe(
            map((result): SearchViewState => {
              if (result.movies.length === 0) {
                return { status: 'empty', query };
              }
              const totalPages = Math.ceil(result.totalResults / RESULTS_PER_PAGE);
              return { status: 'success', data: result, currentPage: page, totalPages };
            }),
            catchError((error: Error) =>
              of<SearchViewState>({ status: 'error', message: error.message }),
            ),
            startWith<SearchViewState>({ status: 'loading' }),
          ),
        ),
      );
    }),
    startWith<SearchViewState>({ status: 'idle' }),
  );

  onSearchInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchSubject.next(value);
  }

  onPageChange(page: number): void {
    this.pageSubject.next(page);
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
