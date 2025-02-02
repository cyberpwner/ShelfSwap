import { useQuery } from '@tanstack/react-query';
import { fetchBookList } from './fetchBookList';

export function useBookList(category: string[]) {
  return useQuery({ queryKey: ['booklist', category], queryFn: fetchBookList });
}
