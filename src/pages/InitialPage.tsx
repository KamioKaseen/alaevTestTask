import { Box, CircularProgress } from '@mui/material';
import useInfo from '../hooks/use-info';

const InitialPage = () => {
  const { info, error, loading } = useInfo()
 
  return (
    <Box sx={{ textAlign: 'center', fontSize: 30 }}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p dangerouslySetInnerHTML={{ __html: info }} />
      )}
    </Box>
  );
};

export default InitialPage;