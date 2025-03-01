import { Stack, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const buttonStyles = {
    textTransform: 'none',
    backgroundColor: 'white',
    color: 'black',
    fontSize: { xs: '16px', sm: '20px' },
    padding: { xs: '6px 12px', sm: '8px 16px' },
    fontWeight: 300,
  }

  return (
    <Stack direction="row" spacing={2} justifyContent="center" sx={{ padding: 2 }}>
      <Button 
        variant="contained" 
        component={Link} to="/"
        sx={buttonStyles}
      >
        About us
      </Button>
      <Button 
        variant="contained" 
        component={Link} to="/profile"
        sx={buttonStyles}
      >
        Profile
      </Button>
      <Button 
        variant="contained" 
        component={Link} to="/login"
        sx={buttonStyles}
      >
        Sign In
      </Button>
    </Stack>
  );
}

export default Navigation;