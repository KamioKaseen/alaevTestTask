import { useState } from 'react';
import { useAuth } from '../../context/authContext';
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { login } from '../../services/api';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setToken } = useAuth();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () => login(email, password),
    onSuccess: (data) => {
      setToken(data.data.token);
      navigate('/profile');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 4,
        gap: 3,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: 'white',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4" component="h1" textAlign="center">
        Login
      </Typography>

      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!error}
        required
      />

      <TextField
        fullWidth
        label="Password"
        variant="outlined"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!error}
        required
      />

      {error && (
        <Typography color="error" variant="body2">
          {error.message}
        </Typography>
      )}
      {isPending && <CircularProgress />}

      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={isPending || !email.trim() || !password.trim()}
      >
        Sign In
      </Button>
    </Box>
  );
};

export default LoginForm;