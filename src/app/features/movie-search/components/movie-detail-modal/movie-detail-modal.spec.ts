import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentRef } from '@angular/core';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MovieDetailModalComponent } from './movie-detail-modal';
import { OmdbDetailResponse } from '../../models/movie.model';

describe('MovieDetailModalComponent', () => {
  let component: MovieDetailModalComponent;
  let componentRef: ComponentRef<MovieDetailModalComponent>;
  let fixture: ComponentFixture<MovieDetailModalComponent>;

  const mockDetail: OmdbDetailResponse = {
    Title: 'Test Movie',
    Year: '2024',
    Rated: 'PG-13',
    Released: '01 Jan 2024',
    Runtime: '120 min',
    Genre: 'Action, Drama',
    Director: 'John Doe',
    Writer: 'Jane Doe',
    Actors: 'Actor One, Actor Two',
    Plot: 'A gripping test movie.',
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetailModalComponent],
      providers: [provideNoopAnimations()],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieDetailModalComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    componentRef.setInput('movieDetail$', of(mockDetail));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render movie detail when data is available', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h2')?.textContent).toContain('Test Movie');
    expect(el.querySelector('.rating')?.textContent).toContain('7.5');
    expect(el.querySelector('.plot')?.textContent).toContain('A gripping test movie.');
  });

  it('should show loading when observable has not emitted', () => {
    // Create a new component with a never-emitting observable
    const newFixture = TestBed.createComponent(MovieDetailModalComponent);
    const newRef = newFixture.componentRef;
    newRef.setInput('movieDetail$', of(null));
    newFixture.detectChanges();

    const el = newFixture.nativeElement as HTMLElement;
    expect(el.querySelector('.modal-loading')).toBeTruthy();
  });

  it('should emit closeModal when close button is clicked', () => {
    let closed = false;
    component.closeModal.subscribe(() => (closed = true));

    const closeBtn = fixture.nativeElement.querySelector('.modal-close-btn') as HTMLButtonElement;
    closeBtn.click();

    expect(closed).toBe(true);
  });

  it('should emit closeModal when overlay is clicked', () => {
    let closed = false;
    component.closeModal.subscribe(() => (closed = true));

    const overlay = fixture.nativeElement.querySelector('.modal-overlay') as HTMLElement;
    overlay.click();

    expect(closed).toBe(true);
  });

  it('should not close when modal content is clicked', () => {
    let closed = false;
    component.closeModal.subscribe(() => (closed = true));

    const content = fixture.nativeElement.querySelector('.modal-content') as HTMLElement;
    content.click();

    expect(closed).toBe(false);
  });
});
