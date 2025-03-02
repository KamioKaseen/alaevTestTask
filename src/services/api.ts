const API_BASE = 'http://localhost:5173';

export async function getInfo() {
  const response = await fetch(`${API_BASE}/info`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return result;
}

export async function login(email: string, password: string) {
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

  return result.data;
}
