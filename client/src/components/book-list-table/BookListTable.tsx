import { IBook } from '@/types/book.types';
import BasicTable from '../BasicTable';
import CustomSpinner from '../CustomSpinner';
import { useAllBooks } from './useAllBooks';
import { createColumnHelper } from '@tanstack/react-table';

const columnHelper = createColumnHelper<IBook>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
  }),
  columnHelper.accessor('isbn', {
    header: 'ISBN',
  }),
  columnHelper.accessor('title', {
    header: 'Title',
  }),
  columnHelper.accessor('description', {
    header: 'Description',
  }),
  columnHelper.accessor('price', {
    header: 'Price',
  }),
  columnHelper.accessor('coverUrl', {
    header: 'CoverUrl',
  }),
];

function BookListTable() {
  const { isPending, isError, data } = useAllBooks();

  if (isPending) {
    return <CustomSpinner />;
  }

  if (isError) {
    return null;
  }

  return <BasicTable<IBook> data={data.data} columns={columns} pathnameToEdit="books" />;
}

export default BookListTable;
