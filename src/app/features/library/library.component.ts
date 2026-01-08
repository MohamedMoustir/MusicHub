import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrackService } from '../../core/services/track.service';
import { AudioPlayerService } from '../../core/services/audio-player.service';
import { FormatTimePipe } from '../../shared/pipes/format-time.pipe';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Track } from '../../core/models/track';
import { DragDropModule, CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, RouterLink, FormatTimePipe, FormsModule, DragDropModule],
  templateUrl: './library.component.html',
  styleUrl: './library.component.scss'
})
export class LibraryComponent {

  trackService = inject(TrackService);
  tracks$ = this.trackService.getAllTracks();
  playerService = inject(AudioPlayerService)
  private coverCache = new Map<number, SafeUrl | string>();
  private sanitizer = inject(DomSanitizer);

  searchQuery = signal<string>('');
  selectedFilter = signal<string>('Tout');
  private allTrack = signal<Track[]>([]);

  filteredTracks = computed(() => {
    const query = this.searchQuery().toLowerCase();
    const filter = this.selectedFilter();
    const tracks = this.allTrack();
    return tracks.filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(query) ||
        track.artist.toLowerCase().includes(query);

      const matchesCategory = filter === 'Tout' || track.category === filter;

      return matchesSearch && matchesCategory;
    })
  })

  ngOnInit() {
    this.trackService.getAllTracks().subscribe({
      next: (data) => {
        this.allTrack.set(data);
      },
      error: (err) => console.error('Erreur chargement tracks:', err)
    })
  }
  onPlay(track: any) {
    this.playerService.playTrack(track, this.filteredTracks());
  }

  getCoverUrl(track: any): SafeUrl | string {
    if (!track.cover) return 'assets/images/placeholder.png';

    if (typeof track.cover === 'string') return track.cover;

    if (this.coverCache.has(track.id)) {
      return this.coverCache.get(track.id)!;
    }

    if (track.cover instanceof Blob || track.cover instanceof File) {
      const url = URL.createObjectURL(track.cover);
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(url);

      this.coverCache.set(track.id, safeUrl);

      return safeUrl;
    }

    return '';
  }
  async deleteTrack(id: number, event: Event) {
    event.stopPropagation();
    if (confirm('Voulez-vous vraiment supprimer ce morceau ?')) {
      await this.trackService.deleteTrack(id);
    }
  }

  onSeek(event: any) {
    const value = event.target.value;
    this.playerService.seekTo(value);
  }

  onVolume(event: any) {
    const value = event.target.value;
    this.playerService.setVolume(value);
  }

  previous() {
    this.playerService.togglePlay();
  }

  next() {
    this.playerService.next();
  }

  togglePlay() {
    this.playerService.togglePlay();
  }

  drop(event: CdkDragDrop<Track[]>) {
    if (this.searchQuery() !== '' || this.selectedFilter() !== 'Tout') {
      return;
    }

    const currentList = [...this.allTrack()];
    moveItemInArray(currentList,event.previousIndex,event.currentIndex);
    this.allTrack.set(currentList);
  }
}
