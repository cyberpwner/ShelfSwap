import { axiosInstance } from '@/api/api';
import { IUser } from '@/types/user.types';
import { QueryFunctionContext } from '@tanstack/react-query';

export async function fetchUserDetails({ queryKey }: QueryFunctionContext<[string, string]>): Promise<IUser> {
  const [, id] = queryKey;
  const response = await axiosInstance.get<IUser>(`/users/${id}`);

  return response.data;
}
