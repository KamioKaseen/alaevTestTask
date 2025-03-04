import { ApiResponse } from "../types";
import { LoginResponse } from "../types";
import { ProfileResponse } from "../types";
import { AuthorResponse } from "../types";
import { QuoteResponse } from "../types";

const API_BASE = 'http://localhost:5173';
const error = new Error(`There is no connection to the server, try again!`);

export async function getInfo(): Promise<ApiResponse<{info: string}>> {
  const response = await fetch(`${API_BASE}/info`);
  const result = await response.json();

  if (!result.success) throw error;
  return result;
}

export async function getProfile(token: string): Promise<ApiResponse<ProfileResponse>> {
  const response = await fetch(`${API_BASE}/profile?token=${token}`);
  const result = await response.json();

  if (!result.success) throw error;
  return result;
}

export async function getAuthor(token: string, signal?: AbortSignal): Promise<ApiResponse<AuthorResponse>> {
  try {
    const response = await fetch(`${API_BASE}/author?token=${token}`, { signal });
    const result = await response.json();
    if (!result.success) throw new Error(result.data?.message || 'Failed to fetch author');
    return result;
  } catch (error) {
    if(error instanceof Error)
    if (error.name === 'AbortError') {
      throw new Error('Request author aborted');
    }
    throw error;
  }
}

export async function getQuote(token: string, authorId: number, signal?: AbortSignal): Promise<ApiResponse<QuoteResponse>> {
  try {
    const response = await fetch(`${API_BASE}/quote?token=${token}&authorId=${authorId}`, { signal });
    const result = await response.json();
    if (!result.success) throw new Error(result.data?.message || 'Failed to fetch quote');
    return result;
  } catch (error: unknown) {
    if(error instanceof Error)
    if (error.name === 'AbortError') {
      throw new Error('Request quote aborted');
    }
    throw error;
  }
}

export async function login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
  const response = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}

export async function logoutApi(token: string): Promise<ApiResponse<object>> {
  const response = await fetch(`${API_BASE}/logout?token=${token}`, {
    method: 'DELETE',
  });

  const result = await response.json();

  return result;
}