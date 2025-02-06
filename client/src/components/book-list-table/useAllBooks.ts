import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchAllBooks } from './fetchAllBooks';

export function useAllBooks() {
  return useQuery({
    queryKey: ['allBooks'],
    queryFn: fetchAllBooks,
    placeholderData: keepPreviousData,
  });
}
