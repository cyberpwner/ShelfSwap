import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { fetchUserList } from './fetchUserList';

export function useUserList() {
  return useQuery({
    queryKey: ['userList'],
    queryFn: fetchUserList,
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });
}
