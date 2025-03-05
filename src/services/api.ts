import axios, { AxiosRequestConfig } from 'axios';
import { ApiResponse, LoginResponse, ProfileResponse, AuthorResponse, QuoteResponse } from '../types';

const api = axios.create({
  headers: { 'Content-Type': 'application/json' },
});

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function apiRequest<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
  try {
    const { data, status } = await api.request<ApiResponse<T>>({ url: endpoint, ...config });
    
    if (!data.success) {
      throw new ApiError(status, data.message || 'Request failed');
    }

    return data;
  } 
  catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(error.response?.status || 500, error.response?.data?.message || error.message);
    }
    throw new ApiError(500, 'Unknown error');
  }
}

export const getInfo = () => apiRequest<{ info: string }>('/info');

export const getProfile = (token: string) =>
  apiRequest<ProfileResponse>('/profile', { params: { token } });

export const getAuthor = (token: string, signal?: AbortSignal) =>
  apiRequest<AuthorResponse>('/author', { params: { token }, signal });

export const getQuote = (token: string, authorId: number, signal?: AbortSignal) =>
  apiRequest<QuoteResponse>('/quote', { params: { token, authorId }, signal });

export const login = (email: string, password: string) =>
  apiRequest<LoginResponse>('/login', { method: 'POST', data: { email, password } });

export const logoutApi = (token: string) =>
  apiRequest<object>('/logout', { method: 'DELETE', params: { token } });
