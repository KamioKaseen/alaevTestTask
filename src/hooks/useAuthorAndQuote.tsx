import { JSX, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getAuthor, getQuote } from '../services/api';
import { Typography } from '@mui/material';
import ProfileModal from '../components/ProfileModal';

interface AuthorAndQuote {
  handleUpdate: () => void;
  text: JSX.Element;
  modal: JSX.Element;
} 

function useAuthorAndQuote(token: string): AuthorAndQuote  {
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState<string | null>(null);
  const [quote, setQuote] = useState<string | null>(null);

  const previousAuthorRef = useRef<string | null>(null);
   const abortControllerRef = useRef<{
     author?: AbortController;
     quote?: AbortController;
   }>({});

  const authorMutation = useMutation({
    mutationFn: async () => {
      abortControllerRef.current.author = new AbortController();
      return await getAuthor(token!, abortControllerRef.current.author.signal);
    },
    onMutate: () => {
      previousAuthorRef.current = author;
    },
  
    onError: (error: Error) => {
      setAuthor(previousAuthorRef.current);
      console.error(error.message);
    },
  });

  const quoteMutation = useMutation({
    mutationFn: async (authorId: number) => {
      abortControllerRef.current.quote = new AbortController();
      return await getQuote(
        token!,
        authorId,
        abortControllerRef.current.quote.signal
      );
    },
    onSuccess: (data) => {
      setAuthor(authorMutation.data?.data.name || null);
      setQuote(data.data.quote);
      setOpen(false);
    },
    onError: (error: Error) => {
      setAuthor(previousAuthorRef.current);
      console.error(error.message);
    },
  });

  console.log(authorMutation.isSuccess);
  

  const handleUpdate = async () => {
    setOpen(true);

    authorMutation.reset();
    quoteMutation.reset();

    const authorResult = await authorMutation.mutateAsync();
    await quoteMutation.mutateAsync(authorResult.data.authorId);
  };

  const handleCancel = () => {
    if (abortControllerRef.current.author) {
      abortControllerRef.current.author.abort();
    }
    if (abortControllerRef.current.quote) {
      abortControllerRef.current.quote.abort();
    }
    setOpen(false);
  };

  const text = (
    <>
      {quote && <Typography sx={{ fontSize: 25 }}>{quote}</Typography>}
      {author && <Typography sx={{ alignSelf: 'flex-end', color: 'gray' }}>{author}</Typography>}
    </>
  )
  
  const modal = (
    <ProfileModal 
    open={open} 
    authorIsSuccess={authorMutation.isSuccess}
    quoteIsSuccess={quoteMutation.isSuccess}
    authorLoading={authorMutation.isPending}
    quoteLoading={quoteMutation.isPending}
    cancel={handleCancel}
  />
  )

  return { 
    handleUpdate,
    text,
    modal
  }
}

export default useAuthorAndQuote;
