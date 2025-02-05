import { axiosInstance } from '@/api/api';
import { IBook } from '@/components/book-list/fetchBookList';
import { PaginatedDto } from '@/types/dto.types';

export interface ICategory {
  id: string;
  name: string;
  books: IBook[];
}

export async function fetchCategories(): Promise<PaginatedDto<ICategory>> {
  const res = await axiosInstance.get<PaginatedDto<ICategory>>('/categories');
  return res.data;
}
