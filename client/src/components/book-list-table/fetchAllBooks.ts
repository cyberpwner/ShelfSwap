import { axiosInstance } from '@/api/api';
import { IBook } from '@/types/book.types';
import { PaginatedDto } from '@/types/dto.types';

export async function fetchAllBooks(): Promise<PaginatedDto<IBook>> {
  const response = await axiosInstance.get<PaginatedDto<IBook>>(`/books`);

  return response.data;
}
