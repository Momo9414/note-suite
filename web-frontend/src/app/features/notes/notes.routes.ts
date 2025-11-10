import { Routes } from '@angular/router';
import { NotesListComponent } from './components/note-list/notes-list.component';
import { NoteFormComponent } from './components/note-form/note-form.component';

export const NOTES_ROUTES: Routes = [
  { path: '', component: NotesListComponent },
  { path: 'new', component: NoteFormComponent },
  { path: ':id/edit', component: NoteFormComponent }
];

