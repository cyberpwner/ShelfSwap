import { useQuery } from '@tanstack/react-query';
import { fetchBookList } from './fetchBookList';

export function useBookList(category: string[], currentPage = 1, search: string) {
  return useQuery({ queryKey: ['bookList', { category, currentPage, search }], queryFn: fetchBookList });
}
