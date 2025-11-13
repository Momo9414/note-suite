import { apiClient } from '../../../core/api/apiClient';
import { Note, NoteRequest, PageResponse } from '../../../core/types';

class NotesService {
  async getNotes(page: number = 0, size: number = 20, query?: string): Promise<PageResponse<Note>> {
    const params: any = { page, size };
    if (query) {
      params.query = query;
    }

    const response = await apiClient.get<PageResponse<Note>>('/notes', { params });
    return response.data;
  }

  async getNoteById(id: string): Promise<Note> {
    const response = await apiClient.get<Note>(`/notes/${id}`);
    return response.data;
  }

  async createNote(note: NoteRequest): Promise<Note> {
    const response = await apiClient.post<Note>('/notes', note);
    return response.data;
  }

  async updateNote(id: string, note: NoteRequest): Promise<Note> {
    const response = await apiClient.put<Note>(`/notes/${id}`, note);
    return response.data;
  }

  async deleteNote(id: string): Promise<void> {
    await apiClient.delete(`/notes/${id}`);
  }

  async getSharedNote(token: string): Promise<Note> {
    const response = await apiClient.get<Note>(`/notes/shared/${token}`);
    return response.data;
  }

  async generateShareLink(id: string): Promise<Note> {
    const response = await apiClient.post<Note>(`/notes/${id}/share`, {});
    return response.data;
  }

  getShareUrl(token: string): string {
    // URL du frontend web pour partager (ou on peut utiliser deep linking mobile)
    return `http://localhost:8081/shared/${token}`;
  }
}

export const notesService = new NotesService();

