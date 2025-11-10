import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

export interface Note {
  id: string;
  title: string;
  contentMd: string;
  visibility: 'PRIVATE' | 'SHARED' | 'PUBLIC';
  tags: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteRequest {
  title: string;
  contentMd: string;
  visibility: 'PRIVATE' | 'SHARED' | 'PUBLIC';
  tags: string[];
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
}

@Injectable({ providedIn: 'root' })
export class NotesService {
  private http = inject(HttpClient);
  private readonly API_URL = environment.apiUrl + '/notes';

  getNotes(page: number = 0, query?: string): Observable<PageResponse<Note>> {
    const params: any = { page, size: 20 };
    if (query) params.query = query;
    return this.http.get<PageResponse<Note>>(this.API_URL, { params });
  }

  getNote(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.API_URL}/${id}`);
  }

  createNote(request: NoteRequest): Observable<Note> {
    return this.http.post<Note>(this.API_URL, request);
  }

  updateNote(id: string, request: NoteRequest): Observable<Note> {
    return this.http.put<Note>(`${this.API_URL}/${id}`, request);
  }

  deleteNote(id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}

