export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface LoginResponse {
  token: string;
}

export interface ProfileResponse {
  fullname: string;
  email: string;
}

export interface AuthorResponse {
  authorId: number;
  name: string;
}

export interface QuoteResponse {
  quoteId: number;
  authorId: number;
  quote: string;
}
