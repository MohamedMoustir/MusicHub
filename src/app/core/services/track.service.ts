import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Track ,CreateTrackDTO ,ServiceStatus } from '../models/track';
import { validateAudioFile, getAudioDuration  } from '../../shared/utils/audio-file.utils';
import { AUDIO_CONSTANTS } from '../constants/audio.constants';
import { toSignal } from '@angular/core/rxjs-interop'; 
 
@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private storage = inject(StorageService);

  private _status = signal<ServiceStatus>('idle');
  private _error = signal<string | null>(null);

  public status = this._status.asReadonly();
  public error = this._error.asReadonly();
  public isLoading = computed(() => this._status() === 'loading');

  getAllTracks(){
    return this.storage.getAllTracks();
  }
  public tracks = toSignal(this.storage.getAllTracks(),{initialValue:[]});

  async addTrack(file: File, metadata: CreateTrackDTO):Promise<void>{
   this._status.set('loading');
   this._error.set(null);

   try {
    validateAudioFile(file);
    const duration = await getAudioDuration(file);
    const newTrack = this.createTrackEntity(file,metadata,duration);
    await this.storage.AddTrack(newTrack);

    this._status.set('success');
    setTimeout(()=>this._status.set('idle'),2000);
   } catch (err:any) {
    console.error('TrackService Error:', err);
      this._error.set(err.message || AUDIO_CONSTANTS.ERRORS.UNKNOWN_ERROR);
      this._status.set('error');
      throw err;
   }
  }

  async deleteTrack(id:number): Promise<void>{
    try {
      await this.storage.deleteTrack(id);
    } catch (err) {
      console.error('Delete Error:', err);
    }
  }

  private createTrackEntity(file:File ,dto:CreateTrackDTO,duration:number):Track{
    return {
      title:dto.title,
      artist:dto.artist,
      description:dto.description,
      category:dto.category,
      cover:dto.cover,
      file:file,
      duration:duration,
      addedDate:new Date()

    }as Track;
  }


}
