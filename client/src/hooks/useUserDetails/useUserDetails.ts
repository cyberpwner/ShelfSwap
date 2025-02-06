import { useQuery } from '@tanstack/react-query';
import { fetchUserDetails } from './fetchUserDetails';

export function useUserDetails(id: string) {
  return useQuery({ queryKey: ['userDetails', id], queryFn: fetchUserDetails });
}
