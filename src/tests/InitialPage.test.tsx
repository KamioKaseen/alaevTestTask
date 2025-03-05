import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '@testing-library/jest-dom';
import { getInfo } from '../services/api';
import InitialPage from '../pages/InitialPage';

vi.mock('../services/api', () => ({
  getInfo: vi.fn(),
}));

const mockedGetInfo = getInfo as unknown as ReturnType<typeof vi.fn>;

const renderWithClient = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <InitialPage />
    </QueryClientProvider>
  );
};

describe('InitialPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('загрузка', () => {
    mockedGetInfo.mockReturnValue(new Promise(() => {}));
    renderWithClient();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('успешный запрос', async () => {
    mockedGetInfo.mockResolvedValue({
      success: true,
      data: { info: 'text' },
    });
    renderWithClient();

    await waitFor(() => {
      expect(screen.getByText('text')).toBeInTheDocument();
    });
  });

  it('ошибка при запросе', async () => {
    mockedGetInfo.mockRejectedValue(new Error('API error'));
    renderWithClient();

    await waitFor(() => {
      expect(screen.getByText('API error')).toBeInTheDocument();
    });
  });
});
