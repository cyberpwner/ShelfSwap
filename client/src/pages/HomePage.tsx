import BookList from '@/components/book-list/BookList';
import Header from '@/components/header/Header';
import { setupAxiosInterceptors } from '@/api/api.constants';
import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function HomePage() {
  const navigate = useNavigate();

  // navigate is sent to axios interceptor so it can redirect user to login page if they try to access protected routes while not logged in
  // so in every protected route the interceptor should be setup this way
  useEffect(() => {
    setupAxiosInterceptors(navigate);
  }, [navigate]);

  return (
    <Stack>
      <Container minH="100vh" maxW="5/6">
        <Header />

        <Box maxW="full" as="main" py="24" gap="8">
          <BookList />
        </Box>
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
