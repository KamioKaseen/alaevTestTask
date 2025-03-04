import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services/api';
import { useAuth } from '../context/authContext';
import useAuthorAndQuote from '../hooks/useAuthorAndQuote';

const ProfilePage = () => {
  const { token } = useAuth();
  const { handleUpdate, text, modal } = useAuthorAndQuote(token!);

  const { data: profileData, isLoading: isProfileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfile(token!),
  });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, p: 4}}>
      {isProfileLoading ? (
        <CircularProgress sx={{ mt: 4 }} />
      ) : (
        <>
          <Typography sx={{ fontSize: 40 }}>
            Welcome, {profileData?.data.fullname}!
          </Typography>
          <Button variant="contained" size="large" onClick={handleUpdate}>
            Update
          </Button>
        </>
      )}

      {text}
      {modal}
    </Box>
  );
};

export default ProfilePage;