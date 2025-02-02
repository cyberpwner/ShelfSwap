import { useQuery } from '@tanstack/react-query';
import { fetchBookList } from './fetchBookList';

export function useBookList(category: string[], currentPage = 1) {
  return useQuery({ queryKey: ['bookList', category, currentPage], queryFn: fetchBookList });
}
