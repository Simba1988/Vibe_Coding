import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { OmdbDetailResponse } from '../../models/movie.model';

@Component({
  selector: 'app-movie-detail-modal',
  imports: [AsyncPipe],
  templateUrl: './movie-detail-modal.html',
  styleUrl: './movie-detail-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetailModalComponent {
  readonly movieDetail$ = input.required<Observable<OmdbDetailResponse | null>>();
  readonly closeModal = output<void>();

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-overlay')) {
      this.closeModal.emit();
    }
  }

  onClose(): void {
    this.closeModal.emit();
  }
}
