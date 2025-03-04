import { Stack, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const buttonStyles = {
  textTransform: 'none',
  backgroundColor: 'white',
  color: 'black',
  fontSize: { xs: '16px', sm: '20px' },
  padding: { xs: '6px 12px', sm: '8px 16px' },
  fontWeight: 300,
}

const Navigation = () => {
  const { logout, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const handleSignOut = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ padding: 2 }}>
      <Button 
        variant="contained" 
        component={Link} to="/"
        sx={buttonStyles}
      >
        About us
      </Button>

      {isAuthenticated &&
        <Button 
          variant="contained" 
          component={Link} to="/profile"
          sx={buttonStyles}
        >
          Profile
        </Button>
      }
      
      {!isAuthenticated ?
        <Button 
          variant="contained" 
          component={Link} to="/login"
          sx={buttonStyles}
        >
          Sign in
        </Button> 
        :
        <Button 
          onClick={handleSignOut}
          variant="contained" 
          sx={buttonStyles}
        >
          Sign out
        </Button>
      }
    </Stack>
  );
}

export default Navigation;