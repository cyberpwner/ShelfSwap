import { axiosInstance } from '@/api/api';
import { PaginatedDto } from '@/types/dto.types';
import { IUser } from '@/types/user.types';

export async function fetchUserList(): Promise<PaginatedDto<IUser>> {
  const response = await axiosInstance.get<PaginatedDto<IUser>>('/users');

  return response.data;
}
