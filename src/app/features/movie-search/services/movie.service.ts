import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map, retry, catchError, throwError } from 'rxjs';
import { environment } from '../../../../environments/environment';
import {
  OmdbSearchItem,
  OmdbSearchResponse,
  OmdbDetailResponse,
  MovieSearchResult,
  MovieSummary,
} from '../models/movie.model';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.omdbApiUrl;
  private readonly apiKey = environment.omdbApiKey;

  searchMovies(query: string, page = 1): Observable<MovieSearchResult> {
    const params = new HttpParams()
      .set('s', query)
      .set('apikey', this.apiKey)
      .set('page', page.toString());

    return this.http.get<OmdbSearchResponse>(this.apiUrl, { params }).pipe(
      retry(2),
      map((response) => {
        if (response.Response === 'False') {
          throw new Error(response.Error ?? 'Search failed');
        }
        return {
          movies: response.Search.map(mapToMovieSummary),
          totalResults: parseInt(response.totalResults, 10),
        };
      }),
      catchError((error: unknown) =>
        throwError(() =>
          error instanceof Error
            ? error
            : new Error('Unable to reach the movie database. Please try again later.'),
        ),
      ),
    );
  }

  getMovieDetail(imdbId: string): Observable<OmdbDetailResponse> {
    const params = new HttpParams().set('i', imdbId).set('apikey', this.apiKey);

    return this.http.get<OmdbDetailResponse>(this.apiUrl, { params }).pipe(
      retry(2),
      map((response) => {
        if (response.Response === 'False') {
          throw new Error(response.Error ?? 'Movie not found');
        }
        return response;
      }),
      catchError((error: unknown) =>
        throwError(() =>
          error instanceof Error
            ? error
            : new Error('Unable to load movie details. Please try again later.'),
        ),
      ),
    );
  }
}

function mapToMovieSummary(item: OmdbSearchItem): MovieSummary {
  return {
    imdbId: item.imdbID,
    title: item.Title,
    year: item.Year,
    posterUrl: item.Poster !== 'N/A' ? item.Poster : null,
    type: item.Type,
  };
}
