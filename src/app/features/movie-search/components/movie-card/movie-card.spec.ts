import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieCardComponent } from './movie-card';
import { MovieSummary } from '../../models/movie.model';
import { ComponentRef } from '@angular/core';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let componentRef: ComponentRef<MovieCardComponent>;
  let fixture: ComponentFixture<MovieCardComponent>;

  const mockMovie: MovieSummary = {
    imdbId: 'tt1234',
    title: 'Test Movie',
    year: '2024',
    posterUrl: 'http://poster.jpg',
    type: 'movie',
  };

  const mockMovieNoPoster: MovieSummary = {
    imdbId: 'tt5678',
    title: 'No Poster Movie',
    year: '2023',
    posterUrl: null,
    type: 'movie',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('movie', mockMovie);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render movie title and year', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.movie-title')?.textContent).toContain('Test Movie');
    expect(el.querySelector('.movie-year')?.textContent).toContain('2024');
  });

  it('should render poster image when posterUrl is provided', () => {
    const img = fixture.nativeElement.querySelector('.poster') as HTMLImageElement;
    expect(img).toBeTruthy();
    expect(img.src).toContain('poster.jpg');
  });

  it('should render placeholder when posterUrl is null', () => {
    componentRef.setInput('movie', mockMovieNoPoster);
    fixture.detectChanges();

    const placeholder = fixture.nativeElement.querySelector('.poster-placeholder');
    expect(placeholder).toBeTruthy();
    expect(placeholder?.textContent).toContain('No Image');
  });

  it('should emit movieClick with imdbId on card click', () => {
    let emittedId: string | undefined;
    component.movieClick.subscribe((id: string) => (emittedId = id));

    const card = fixture.nativeElement.querySelector('.movie-card') as HTMLElement;
    card.click();

    expect(emittedId).toBe('tt1234');
  });
});
