import BookList from '@/components/book-list/BookList';
import Header from '@/components/header/Header';
import { setupAxiosInterceptors } from '@/api/api.constants';
import { Container, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useBookList } from '@/components/book-list/useBookList';
import PaginationBar from '@/components/pagination-bar/PaginationBar';
import Footer from '@/components/Footer';

function HomePage() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string[]>([]);
  const { isPending, isError, data } = useBookList(selectedCategory, currentPage, search);
  const navigate = useNavigate();

  // navigate is sent to axios interceptor so it can redirect user to login page if they try to access protected routes while not logged in
  // so in every protected route the interceptor should be setup this way
  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

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
