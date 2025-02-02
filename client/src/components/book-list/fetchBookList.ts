import { axiosInstance } from '@/api/api.constants';
import { ICategory } from '@/loaders/fetchCategories';
import { QueryFunctionContext } from '@tanstack/react-query';

export interface IBook {
  id: string;
  isbn: string;
  title: string;
  description: string;
  price: number;
  coverUrl: string;
  authors: IAuthor[];
}

interface IAuthor {
  id: string;
  name: string;
}

export async function fetchBookList({ queryKey }: QueryFunctionContext<[string, string[]]>): Promise<IBook[]> {
  const [, category] = queryKey;

  let url = '/categories';

  if (category.length > 0) {
    url += `?name=${category[0]}`;
  }

  const data = (await axiosInstance.get<ICategory[] | ICategory>(url)).data;

  let bookIds: string[] = [];

  // we extract the book ids
  if (data instanceof Array) {
    bookIds = data
      .map((category) => category.books)
      .reduce((prevBooks, currentBooks) => {
        const arrBuffer = [...prevBooks, ...currentBooks];
        return arrBuffer;
      })
      .map((book) => book.id);
  } else {
    bookIds = data.books.map((book) => book.id);
  }

  const books = (await axiosInstance.get<IBook[]>('/books')).data;

  // return books with said bookIds
  return books.filter((book) => bookIds.includes(book.id));
}
