import { axiosInstance } from '@/api/api';
import { IBook } from '@/types/book.types';
import { QueryFunctionContext } from '@tanstack/react-query';

export async function fetchBookDetails({ queryKey }: QueryFunctionContext<[string, string]>): Promise<IBook> {
  const [, id] = queryKey;

  const response = await axiosInstance.get<IBook>(`/books/${id}`);

  return response.data;
}
