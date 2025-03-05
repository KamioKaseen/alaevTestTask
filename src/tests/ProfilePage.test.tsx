import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import ProfilePage from '../pages/ProfilePage';

vi.mock('../services/api', () => ({
  getProfile: vi.fn(),
}));

vi.mock('../context/authContext', () => ({
  useAuth: () => ({ token: 'fake-token' }),
}));

vi.mock('../hooks/useAuthorAndQuote', () => ({
  default: () => ({
    handleUpdate: vi.fn(),
    text: <div>Mocked Quote</div>,
    modal: <div>Mocked Modal</div>,
  }),
}));

import { getProfile } from '../services/api';
const mockedGetProfile = getProfile as unknown as ReturnType<typeof vi.fn>;

const renderWithClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <ProfilePage />
    </QueryClientProvider>
  );
};

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('загрузка', () => {
    mockedGetProfile.mockReturnValue(new Promise(() => {}));
    renderWithClient();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('успешный запрос', async () => {
    mockedGetProfile.mockResolvedValue({
      success: true,
      data: { fullname: 'Alexey K'},
    });
    renderWithClient();

    await waitFor(() => {
      expect(screen.getByText('Welcome, Alexey K!')).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
    expect(screen.getByText('Mocked Quote')).toBeInTheDocument();
    expect(screen.getByText('Mocked Modal')).toBeInTheDocument();
  });

  it('ошибка при запросе', async () => {
    mockedGetProfile.mockRejectedValue(new Error('API error'));
    renderWithClient();

    await waitFor(() => {
      expect(screen.getByText('API error')).toBeInTheDocument();
    });
  });
});
