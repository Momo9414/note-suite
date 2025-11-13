import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { NotesService, Note } from '../../services/notes.service';
import { marked } from 'marked';

@Component({
  selector: 'app-shared-note',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-note.component.html',
  styleUrls: ['./shared-note.component.scss']
})
export class SharedNoteComponent implements OnInit {
  private notesService = inject(NotesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  note: Note | null = null;
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.loadSharedNote(token);
    } else {
      this.error = 'Token de partage manquant';
      this.loading = false;
    }
  }

  loadSharedNote(token: string): void {
    this.loading = true;
    this.error = null;
    
    this.notesService.getSharedNote(token).subscribe({
      next: (note: Note) => {
        this.note = note;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading shared note', err);
        this.error = 'Note introuvable ou lien invalide';
        this.loading = false;
      }
    });
  }

  renderMarkdown(content: string): string {
    if (!content) return '';
    
    // Utiliser marked pour un rendu Markdown professionnel
    return marked.parse(content, { breaks: true }) as string;
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}

