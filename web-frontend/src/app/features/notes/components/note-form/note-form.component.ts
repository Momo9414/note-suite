import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NotesService, NoteRequest } from '../../services/notes.service';

@Component({
  selector: 'app-note-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss']
})
export class NoteFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private notesService = inject(NotesService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = false;
  noteId: string | null = null;
  loading = false;
  errorMessage = '';

  noteForm = this.fb.group({
    title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    contentMd: [''],
    visibility: ['PRIVATE' as 'PRIVATE' | 'SHARED' | 'PUBLIC'],
    tagsInput: ['']
  });

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('id');
    if (this.noteId) {
      this.isEditMode = true;
      this.loadNote();
    }
  }

  loadNote(): void {
    if (!this.noteId) return;

    this.notesService.getNote(this.noteId).subscribe({
      next: (note) => {
        this.noteForm.patchValue({
          title: note.title,
          contentMd: note.contentMd,
          visibility: note.visibility,
          tagsInput: note.tags?.join(', ') || ''
        });
      },
      error: (error) => {
        this.errorMessage = 'Impossible de charger la note';
        console.error('Error loading note', error);
      }
    });
  }

  onSubmit(): void {
    if (this.noteForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const tagsInput = this.noteForm.value.tagsInput || '';
      const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t.length > 0);

      const request: NoteRequest = {
        title: this.noteForm.value.title!,
        contentMd: this.noteForm.value.contentMd || '',
        visibility: this.noteForm.value.visibility as any,
        tags: tags
      };

      const operation = this.isEditMode && this.noteId
        ? this.notesService.updateNote(this.noteId, request)
        : this.notesService.createNote(request);

      operation.subscribe({
        next: () => {
          this.router.navigate(['/notes']);
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = 'Erreur lors de l\'enregistrement';
          console.error('Error saving note', error);
        }
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/notes']);
  }
}
