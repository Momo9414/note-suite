// Auth Types
export interface AuthRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  email: string;
}

// Note Types
export type Visibility = 'PRIVATE' | 'SHARED' | 'PUBLIC';

export interface Note {
  id: string;
  title: string;
  contentMd: string;
  visibility: Visibility;
  shareToken?: string;
  tags: string[];
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteRequest {
  title: string;
  contentMd: string;
  visibility: Visibility;
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
}

