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

// P.S Скорее всего здесь перемудрил (-_-)

// Хук возвращает:
// - функцию обновления автора и цитаты
// - JSX-текс(автор/цитата)
// - JSX-модальное окно
function useAuthorAndQuote(token: string): AuthorAndQuote  {
  const [open, setOpen] = useState(false);
  const [author, setAuthor] = useState<string | null>(null);
  const [quote, setQuote] = useState<string | null>(null);

  // Общий аборконтроллер для отмены запроса
  const previousAuthorRef = useRef<string | null>(null);
   const abortControllerRef = useRef<{
     author?: AbortController;
     quote?: AbortController;
   }>({});

  // Запрос к автору
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

  // Запрос к цитате
  const quoteMutation = useMutation({
    mutationFn: async (authorId: number) => {
      abortControllerRef.current.quote = new AbortController();
      return await getQuote(
        token!,
        authorId,
        abortControllerRef.current.quote.signal
      );
    },
    // Если запрос успешен, то обновляется стейт автора и цитаты для отображения в UI
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


  const handleUpdate = async () => {
    // Открывается модалка при апдейте
    setOpen(true);

    // Сбрасывается состояние isPending
    authorMutation.reset();
    quoteMutation.reset();

    // Поочередный вызов запроса автора и цитаты
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

    // Модалка закрывается при отмене
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
