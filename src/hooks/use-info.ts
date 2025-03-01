import { useState, useEffect } from 'react';
import { getInfo } from '../services/api';

interface InfoResponse {
  data: {info: string}
}

interface UseInfoHook {
  info: string;
  error: string | null;
  loading: boolean;
}

function useInfo(): UseInfoHook {
  const [info, setInfo] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const response: InfoResponse = await getInfo();
        setInfo(response.data.info);
      } 
      catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('Unknown error');
        }
      } 
      finally {
        setLoading(false);
      }
    };

    fetchInfo();
  }, []);

  return { info, error, loading };
}

export default useInfo;
