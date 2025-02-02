import { axiosInstance } from '@/api/api.constants';
import { IBook } from '@/components/book-list/fetchBookList';

export interface ICategory {
  id: string;
  name: string;
  books: IBook[];
}

export async function fetchCategories(): Promise<ICategory[]> {
  const res = await axiosInstance.get<ICategory[]>('/categories');
  return res.data;
}
