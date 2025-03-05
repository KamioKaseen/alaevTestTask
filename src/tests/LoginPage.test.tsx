import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import LoginPage from '../pages/LoginPage';
import { login } from '../services/api';
import AuthProvider from '../context/authContext';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

vi.mock('../services/api', () => ({
  login: vi.fn(),
}));

const mockedLogin = login as unknown as ReturnType<typeof vi.fn>;

const renderWithProviders = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('отображает форму логина', () => {
    renderWithProviders();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeDisabled();
  });

  it('успешный логин', async () => {
    mockedLogin.mockResolvedValue({ token: 'fake-token' });
    renderWithProviders();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(mockedLogin).toHaveBeenCalledWith('test@example.com', 'password123');
    });
  });

  it('ошибка логина', async () => {
    mockedLogin.mockRejectedValue(new Error('Invalid credentials'));
    renderWithProviders();

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
    });
  });
});
