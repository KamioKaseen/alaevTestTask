import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getInfo } from '../services/api';
import parse from 'html-react-parser';

interface InfoResponse {
  data: { info: string };
}

const InitialPage = () => {
  const { data, isLoading, error } = useQuery<InfoResponse, Error>({
    queryKey: ['info'],
    queryFn: () => {
      console.log('Fetching info from API');
      return getInfo();
    },
  });

  return (
    <Box sx={{ textAlign: 'center', fontSize: 30 }}>
      {isLoading ? (
        <CircularProgress sx={{mt: 4}}/>
      ) : error ? (
        <p>{error.message}</p>
      ) : (
        <p>{parse(data!.data.info)}</p>
      )}
    </Box>
  );
};

export default InitialPage;