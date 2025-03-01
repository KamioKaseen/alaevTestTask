const API_BASE = 'http://localhost:3000';

export async function getInfo() {
  const response = await fetch(`${API_BASE}/info`);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return result;
}
