import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Note } from '../../services/notes.service';

@Component({
  selector: 'app-note-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './note-detail-modal.component.html',
  styleUrls: ['./note-detail-modal.component.scss']
})
export class NoteDetailModalComponent {
  @Input() note: Note | null = null;
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onEdit = new EventEmitter<string>();
  @Output() onDelete = new EventEmitter<string>();

  close(): void {
    this.onClose.emit();
  }

  renderMarkdown(content: string): string {
    if (!content) return '';

    let html = content
      // Titres
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      // Gras et italique
      .replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code inline
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Listes
      .replace(/^\- (.*$)/gm, '<li>$1</li>')
      .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
      // Liens
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank">$1</a>')
      // Paragraphes
      .replace(/\n\n/g, '</p><p>')
      // Sauts de ligne
      .replace(/\n/g, '<br>');

    // Entourer de paragraphes
    html = '<p>' + html + '</p>';

    // Nettoyer les paragraphes vides
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p><br>/g, '<p>');
    html = html.replace(/<br><\/p>/g, '</p>');

    // Grouper les listes
    html = html.replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>');
    html = html.replace(/<\/ul><ul>/g, '');

    return html;
  }
}
