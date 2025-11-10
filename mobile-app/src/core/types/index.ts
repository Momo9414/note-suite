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
export interface Note {
  id: string;
  title: string;
  contentMd: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface NoteRequest {
  title: string;
  contentMd: string;
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

