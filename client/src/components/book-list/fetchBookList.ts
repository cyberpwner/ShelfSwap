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

export async function fetchBookList({
  queryKey,
}: QueryFunctionContext<[string, { category: string[]; currentPage: number; search: string }]>): Promise<{
  data: IBook[];
  page: number;
  total: number;
  totalPages: number;
}> {
  const [, { category, currentPage, search }] = queryKey;

  const decodedQuery = decodeURIComponent(search);

  let url = '/categories';

  if (category.length > 0) {
    const decodedCategory = decodeURIComponent(category[0]);
    url += `?name=${decodedCategory}`;
  }

  const categoryData = (await axiosInstance.get<ICategory[] | ICategory>(url)).data;

  let bookIds: string[] = [];

  // we extract the book ids
  if (categoryData instanceof Array) {
    bookIds = categoryData
      .map((category) => category.books)
      .reduce((prevBooks, currentBooks) => {
        const arrBuffer = [...prevBooks, ...currentBooks];
        return arrBuffer;
      })
      .map((book) => book.id);
  } else {
    bookIds = categoryData.books.map((book) => book.id);
  }

  const {
    data: books,
    page,
    total,
    totalPages,
  } = (
    await axiosInstance.get<{ data: IBook[]; page: number; total: number; totalPages: number }>(
      `/books/search?q=${decodedQuery || ''}&page=${currentPage}`,
    )
  ).data;

  // filter books with said bookIds
  const filteredBooks = books.filter((book) => bookIds.includes(book.id));

  return {
    page,
    total,
    totalPages,
    data: filteredBooks,
  };
}
