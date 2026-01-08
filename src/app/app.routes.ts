import { Routes } from '@angular/router';
import { TrackManagerComponent } from './features/track-manager/track-manager.component';
import { LibraryComponent } from './features/library/library.component';

export const routes: Routes = [
    { path: '', redirectTo: 'add-track', pathMatch: 'full' },
    { path: 'add-track', component: TrackManagerComponent },
    { path: 'library', component: LibraryComponent },
    { path: 'edit-track/:id', component: TrackManagerComponent },
    { path: 'track/:id', component: TrackManagerComponent },
    { path: '**', redirectTo: 'library' }


];
