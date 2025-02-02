import { useQuery } from '@tanstack/react-query';
import { fetchBookDetails } from './fetchBookDetails';

export function useBookDetails(id: string) {
  return useQuery({ queryKey: ['bookDetails', id], queryFn: fetchBookDetails });
}
