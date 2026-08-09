const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export async function fetchWithAuth<T = any>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token habis atau invalid, logout user
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    window.location.href = '/login';
    throw new Error('The session has expired. Please log in again.');
  }

  // Parse response menjadi JSON
  const responseData = await response.json();

  // Jika status bukan 2xx (misal 400, 403, 500), lempar error
  if (!response.ok) {
    throw new Error(responseData.message || 'An error occurred on the server.');
  }

  return responseData as T;
}