import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MovieService } from './movie.service';
import { OmdbSearchResponse, OmdbDetailResponse } from '../models/movie.model';

describe('MovieService', () => {
  let service: MovieService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MovieService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  describe('searchMovies', () => {
    it('should return mapped movie results on success', () => {
      const mockResponse: OmdbSearchResponse = {
        Search: [
          {
            Title: 'Test Movie',
            Year: '2024',
            imdbID: 'tt1234',
            Type: 'movie',
            Poster: 'http://img.jpg',
          },
          { Title: 'No Poster', Year: '2023', imdbID: 'tt5678', Type: 'movie', Poster: 'N/A' },
        ],
        totalResults: '2',
        Response: 'True',
      };

      let result: unknown;
      service.searchMovies('test').subscribe((r) => (result = r));

      const req = httpTesting.expectOne((r) => r.params.get('s') === 'test');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      expect(result).toEqual({
        movies: [
          {
            imdbId: 'tt1234',
            title: 'Test Movie',
            year: '2024',
            posterUrl: 'http://img.jpg',
            type: 'movie',
          },
          { imdbId: 'tt5678', title: 'No Poster', year: '2023', posterUrl: null, type: 'movie' },
        ],
        totalResults: 2,
      });
    });

    it('should throw error when OMDb returns Response False', () => {
      const mockResponse: OmdbSearchResponse = {
        Search: [],
        totalResults: '0',
        Response: 'False',
        Error: 'Movie not found!',
      };

      let error: Error | undefined;
      service.searchMovies('zzznotamovie').subscribe({
        error: (e: Error) => (error = e),
      });

      // OMDb returns 200 OK with Response: 'False' — retry does NOT trigger
      // because the HTTP request itself succeeded. The throw in map goes to catchError.
      const req = httpTesting.expectOne((r) => r.params.get('s') === 'zzznotamovie');
      req.flush(mockResponse);

      expect(error?.message).toBe('Movie not found!');
    });

    it('should handle HTTP errors with retry and a friendly message', () => {
      let error: Error | undefined;
      service.searchMovies('test').subscribe({
        error: (e: Error) => (error = e),
      });

      // retry(2) means 3 total attempts for HTTP-level errors
      for (let i = 0; i < 3; i++) {
        const req = httpTesting.expectOne((r) => r.params.get('s') === 'test');
        req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
      }

      expect(error).toBeDefined();
      expect(error?.message).toBeTruthy();
    });

    it('should pass page parameter', () => {
      const mockResponse: OmdbSearchResponse = {
        Search: [
          {
            Title: 'Test Movie',
            Year: '2024',
            imdbID: 'tt1234',
            Type: 'movie',
            Poster: 'http://img.jpg',
          },
        ],
        totalResults: '1',
        Response: 'True',
      };

      let result: unknown;
      service.searchMovies('test', 3).subscribe((r) => (result = r));

      const req = httpTesting.expectOne((r) => r.params.get('page') === '3');
      expect(req).toBeTruthy();
      req.flush(mockResponse);

      expect(result).toBeDefined();
    });
  });

  describe('getMovieDetail', () => {
    it('should return movie detail on success', () => {
      const mockDetail: OmdbDetailResponse = {
        Title: 'Test Movie',
        Year: '2024',
        Rated: 'PG-13',
        Released: '01 Jan 2024',
        Runtime: '120 min',
        Genre: 'Action',
        Director: 'John Doe',
        Writer: 'Jane Doe',
        Actors: 'Actor One, Actor Two',
        Plot: 'A test movie plot.',
        Language: 'English',
        Country: 'USA',
        Awards: 'None',
        Poster: 'http://poster.jpg',
        imdbRating: '7.5',
        imdbVotes: '1000',
        imdbID: 'tt1234',
        Type: 'movie',
        Response: 'True',
      };

      let result: unknown;
      service.getMovieDetail('tt1234').subscribe((r) => (result = r));

      const req = httpTesting.expectOne((r) => r.params.get('i') === 'tt1234');
      req.flush(mockDetail);

      expect(result).toEqual(mockDetail);
    });

    it('should throw error when detail response is False', () => {
      let error: Error | undefined;
      service.getMovieDetail('tt0000').subscribe({
        error: (e: Error) => (error = e),
      });

      // Response: 'False' with 200 OK — no retry, goes straight to catchError
      const req = httpTesting.expectOne((r) => r.params.get('i') === 'tt0000');
      req.flush({ Response: 'False', Error: 'Incorrect IMDb ID.' });

      expect(error?.message).toBe('Incorrect IMDb ID.');
    });
  });
});
