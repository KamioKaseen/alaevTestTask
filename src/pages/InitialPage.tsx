import { Box, CircularProgress, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getInfo } from '../services/api';
import parse from 'html-react-parser';
import { InfoResponse } from '../types';

const InitialPage = () => {
  const { data, isLoading, error } = useQuery<InfoResponse, Error>({
    queryKey: ['info'],
    queryFn: () => getInfo()
  });

  return (
    <Box sx={{ textAlign: 'center'}}>
      {isLoading ? (
        <CircularProgress sx={{mt: 4}}/>
      ) : error ? (
        <Typography>{error.message}</Typography>
      ) : (
        <Typography fontSize={33}>{parse(data!.data.info)}</Typography>
      )}
    </Box>
  );
};

export default InitialPage;