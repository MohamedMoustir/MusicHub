import { Injectable, signal } from '@angular/core';
import { Track } from '../models/track';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

  private audio = new Audio();
  currentTrack = signal<Track | null>(null);
  isPlaying = signal<boolean>(false);

  playTrack(track: Track) {
    if (this.currentTrack()?.id === track.id) {
      this.togglePlay();
      return;
    }
    this.currentTrack.set(track);
    const fileUrl = URL.createObjectURL(track.file);
    this.audio.src = fileUrl;
    this.audio.load();
    this.play();
  }

  togglePlay() {
    if (this.audio.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  private play(){
    this.audio.play()
    .then(()=>this.isPlaying.set(true))
    .catch(err=>console.log('Error playing audio:', err));
    
  }

  private pause(){
    this.audio.pause();
    this.isPlaying.set(false);
  }
}
