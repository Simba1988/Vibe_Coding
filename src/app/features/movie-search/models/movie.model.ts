export interface OmdbSearchItem {
  readonly Title: string;
  readonly Year: string;
  readonly imdbID: string;
  readonly Type: string;
  readonly Poster: string;
}

export interface OmdbSearchResponse {
  readonly Search: OmdbSearchItem[];
  readonly totalResults: string;
  readonly Response: 'True' | 'False';
  readonly Error?: string;
}

export interface OmdbDetailResponse {
  readonly Title: string;
  readonly Year: string;
  readonly Rated: string;
  readonly Released: string;
  readonly Runtime: string;
  readonly Genre: string;
  readonly Director: string;
  readonly Writer: string;
  readonly Actors: string;
  readonly Plot: string;
  readonly Language: string;
  readonly Country: string;
  readonly Awards: string;
  readonly Poster: string;
  readonly imdbRating: string;
  readonly imdbVotes: string;
  readonly imdbID: string;
  readonly Type: string;
  readonly Response: 'True' | 'False';
  readonly Error?: string;
}

export interface MovieSummary {
  readonly imdbId: string;
  readonly title: string;
  readonly year: string;
  readonly posterUrl: string | null;
  readonly type: string;
}

export interface MovieSearchResult {
  readonly movies: readonly MovieSummary[];
  readonly totalResults: number;
}
