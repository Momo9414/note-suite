import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotesService, Note, PageResponse } from '../../services/notes.service';
import { AuthService } from '../../../../core/services/auth.service';
import { NoteDetailModalComponent } from '../note-detail-modal/note-detail-modal.component';

@Component({
  selector: 'app-notes-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NoteDetailModalComponent],
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss']
})
export class NotesListComponent implements OnInit {
  private notesService = inject(NotesService);
  private authService = inject(AuthService);
  private router = inject(Router);

  notes: Note[] = [];
  loading = false;
  searchQuery = '';
  
  // Pagination
  currentPage = 0;
  totalPages = 0;
  totalElements = 0;
  isFirstPage = true;
  isLastPage = false;

  // Modal
  isModalOpen = false;
  selectedNote: Note | null = null;

  ngOnInit(): void {
    this.loadNotes();
  }

  loadNotes(): void {
    this.loading = true;
    const query = this.searchQuery.trim() || undefined;
    
    this.notesService.getNotes(this.currentPage, query).subscribe({
      next: (response: PageResponse<Note>) => {
        this.notes = response.content;
        this.totalPages = response.totalPages;
        this.totalElements = response.totalElements;
        this.currentPage = response.number;
        this.isFirstPage = response.first;
        this.isLastPage = response.last;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading notes', error);
        this.loading = false;
      }
    });
  }

  onSearch(): void {
    this.currentPage = 0;
    this.loadNotes();
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.currentPage = 0;
    this.loadNotes();
  }

  viewNote(id: string): void {
    this.notesService.getNote(id).subscribe({
      next: (note) => {
        this.selectedNote = note;
        this.isModalOpen = true;
      },
      error: (error) => {
        console.error('Error loading note', error);
      }
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedNote = null;
  }

  editNote(id: string): void {
    this.router.navigate(['/notes', id, 'edit']);
  }

  deleteNote(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette note ?')) {
      this.notesService.deleteNote(id).subscribe({
        next: () => {
          this.loadNotes();
        },
        error: (error) => {
          console.error('Error deleting note', error);
          alert('Erreur lors de la suppression de la note');
        }
      });
    }
  }

  deleteNoteFromModal(id: string): void {
    this.closeModal();
    this.deleteNote(id);
  }

  // Pagination methods
  nextPage(): void {
    if (!this.isLastPage) {
      this.currentPage++;
      this.loadNotes();
    }
  }

  previousPage(): void {
    if (!this.isFirstPage) {
      this.currentPage--;
      this.loadNotes();
    }
  }

  goToPage(page: number): void {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.loadNotes();
    }
  }

  logout(): void {
    this.authService.logout();
  }
}

