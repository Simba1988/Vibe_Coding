import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MovieSummary } from '../../models/movie.model';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.html',
  styleUrl: './movie-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCardComponent {
  readonly movie = input.required<MovieSummary>();
  readonly movieClick = output<string>();

  onCardClick(): void {
    this.movieClick.emit(this.movie().imdbId);
  }
}
