import BooksList from '@/components/books-list/BooksList';
import CategorySelect from '@/components/CategorySelect';
import Header from '@/components/header/Header';
import { setupAxiosInterceptors } from '@/constants/api.constants';
import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function HomePage() {
  const navigate = useNavigate();

  // navigate is sent to axios interceptor so it can redirect user to loign page if they try to access protected routes while not logged in
  // so in every protected route the interceptor should be setup this way
  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  return (
    <Stack>
      <Container maxW="5/6" h="full">
        <Header />

        <Stack maxW="full" alignItems={{ base: 'center', md: 'flex-start' }} as="main" py="24" gap="8">
          <CategorySelect />
          <BooksList />
        </Stack>
      </Container>

      <Box as="footer" py="16" bg="var(--dark-color)" color="gray.100" letterSpacing="wide">
        <Container maxW="5/6" h="full">
          <Text>Footer</Text>
        </Container>
      </Box>
    </Stack>
  );
}

export default HomePage;
