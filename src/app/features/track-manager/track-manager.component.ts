import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'
import { TrackService } from '../../core/services/track.service';
import { CreateTrackDTO, MusicCategory } from '../../core/models/track';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-track-manager',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './track-manager.component.html',
  styleUrl: './track-manager.component.scss'
})
export class TrackManagerComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  protected trackService = inject(TrackService);
 

  categories: MusicCategory[] = ['Pop', 'Rock', 'Rap', 'Jazz', 'Classical', 'Electro', 'Other'];

  selectedAudioFile: File | null = null;
  selectedCoverFile: File | null = null;

  trackForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    artist: ['', [Validators.required]],
    category: ['pop' as MusicCategory, [Validators.required]],
    description: ['', [Validators.maxLength(200)]]
  });

  onAudioFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedAudioFile = input.files[0];
    }
  }
  onCoverSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedCoverFile = input.files[0];
    }
  }

  async onSubmit(): Promise<void> {
    if (this.trackForm.invalid || !this.selectedAudioFile) {
      this.trackForm.markAllAsTouched();
      return;
    }

    const formValue = this.trackForm.value;
    const metadata: CreateTrackDTO = {
      title: formValue.title!,
      artist: formValue.artist!,
      category: formValue.category as MusicCategory,
      description: formValue.description || '',
      cover: this.selectedCoverFile || undefined

    }

    try {
      await this.trackService.addTrack(this.selectedAudioFile, metadata);
      if (this.trackService.status() === 'success') {
        this.router.navigate(['/library']);
      }
    } catch (error) {

    }


  }
 
}
