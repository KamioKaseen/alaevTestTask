import { ApiResponse } from "../components/types";
import { LoginResponse } from "../components/types";

const API_BASE = 'http://localhost:5173';

export async function getInfo(): Promise<ApiResponse<{info: string}>> {
  const response = await fetch(`${API_BASE}/info`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`There is no connection to the server, try again!`);
  }

  return result;
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