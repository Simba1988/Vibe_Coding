import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { MovieSearchComponent } from './movie-search';
import { MovieService } from '../../services/movie.service';
import { MovieSearchResult } from '../../models/movie.model';

describe('MovieSearchComponent', () => {
  let component: MovieSearchComponent;
  let fixture: ComponentFixture<MovieSearchComponent>;
  let mockMovieService: {
    searchMovies: ReturnType<typeof vi.fn>;
    getMovieDetail: ReturnType<typeof vi.fn>;
  };

  const mockSearchResult: MovieSearchResult = {
    movies: [
      {
        imdbId: 'tt1234',
        title: 'Test Movie',
        year: '2024',
        posterUrl: 'http://img.jpg',
        type: 'movie',
      },
    ],
    totalResults: 1,
  };

  beforeEach(async () => {
    vi.useFakeTimers();

    mockMovieService = {
      searchMovies: vi.fn(),
      getMovieDetail: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [MovieSearchComponent],
      providers: [{ provide: MovieService, useValue: mockMovieService }],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show idle state initially', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.status-message')?.textContent).toContain('Start typing');
  });

  it('should show search results after typing', async () => {
    mockMovieService.searchMovies.mockReturnValue(of(mockSearchResult));

    const input = fixture.nativeElement.querySelector('.search-input') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));

    vi.advanceTimersByTime(350);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('app-movie-card');
    expect(cards.length).toBe(1);
  });

  it('should show error state on service error', async () => {
    mockMovieService.searchMovies.mockReturnValue(throwError(() => new Error('API failed')));

    const input = fixture.nativeElement.querySelector('.search-input') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));

    vi.advanceTimersByTime(350);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.error-message')?.textContent).toContain('API failed');
  });

  it('should show empty state when no results', async () => {
    mockMovieService.searchMovies.mockReturnValue(of({ movies: [], totalResults: 0 }));

    const input = fixture.nativeElement.querySelector('.search-input') as HTMLInputElement;
    input.value = 'zzznotamovie';
    input.dispatchEvent(new Event('input'));

    vi.advanceTimersByTime(350);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.empty-message')?.textContent).toContain('No results');
  });

  it('should return to idle when input is cleared', async () => {
    mockMovieService.searchMovies.mockReturnValue(of(mockSearchResult));

    const input = fixture.nativeElement.querySelector('.search-input') as HTMLInputElement;
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    vi.advanceTimersByTime(350);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    input.value = '';
    input.dispatchEvent(new Event('input'));
    vi.advanceTimersByTime(350);
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.status-message')?.textContent).toContain('Start typing');
  });
});
