import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormatTimePipe } from '../../shared/pipes/format-time.pipe';
import { TrackService } from '../../core/services/track.service';
import { AudioPlayerService } from '../../core/services/audio-player.service';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, RouterLink, FormatTimePipe],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {

  private trackService = inject(TrackService);
  tracks$ = this.trackService.getAllTracks();
  playerService = inject(AudioPlayerService)

   onPlay(track: any) {
    console.log('✅ Clicked Track:', track);
  console.log('📁 File Type:', track.file instanceof Blob);
    this.playerService.playTrack(track);
  }
  async deleteTrack(id: number, event: Event) {
    event.stopPropagation();
    if (confirm('Voulez-vous vraiment supprimer ce morceau ?')) {
      await this.trackService.deleteTrack(id);
    }
  }
}
