import { useState } from 'react';
import { logoutApi } from '../services/api';
import { useMutation } from '@tanstack/react-query';
import { ApiResponse } from '../components/types';

export const useProvideAuth = () => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  const updateToken = (newToken: string | null) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem('token', newToken);
    } else {
      localStorage.removeItem('token');
    }
  };

  const { mutate: logoutMutate } = useMutation({
    mutationFn: (token: string) => logoutApi(token),
    onSuccess: (response: ApiResponse<object>) => {
      if (response.success) {
        updateToken(null);
      }
    },
    onError: (error: Error) => {
      console.error(error.message);
    },
  });

  const logout = () => {
    if (token) {
      logoutMutate(token);
    }
  };

  return {
    token,
    setToken: updateToken,
    logout,
    isAuthenticated: Boolean(token),
  };
};
