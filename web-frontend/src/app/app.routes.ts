import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { SharedNoteComponent } from './features/notes/components/shared-note/shared-note.component';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'shared/:token',
    component: SharedNoteComponent
  },
  {
    path: 'notes',
    loadChildren: () => import('./features/notes/notes.routes').then(m => m.NOTES_ROUTES),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
];

