import BookList from '@/components/book-list/BookList';
import Header from '@/components/header/Header';
import { Container, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { useBookList } from '@/components/book-list/useBookList';
import PaginationBar from '@/components/pagination-bar/PaginationBar';
import Footer from '@/components/Footer';

function HomePage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const { isPending, isError, data } = useBookList(selectedCategory, currentPage, search);

  // if category is changed, reset currentPage to 1
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <Stack>
      <Container minH="100vh" maxW="5/6">
        <Header searchParams={searchParams} setSearch={setSearch} />

        <Stack maxW="full" as="main" py="24" gap="8">
          <BookList
            search={search}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            isPending={isPending}
            isError={isError}
            books={data?.data || []}
          />

          <PaginationBar
            totalPages={data?.totalPages || 0}
            currentPage={data?.page || 1}
            setCurrentPage={setCurrentPage}
          />
        </Stack>
      </Container>

      <Footer />
    </Stack>
  );
}

export default HomePage;
