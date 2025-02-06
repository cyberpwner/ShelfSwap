import BookListTable from '@/components/book-list-table/BookListTable';
import DashboardDrawer from '@/components/DashboardDrawer';
import { LinkButton } from '@/components/ui/link-button';
import UserListTable from '@/components/user-list/UserListTable';
import { Box, Button, ButtonGroup, Grid, Heading, HStack, Stack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router';
import { FiArrowLeft } from 'react-icons/fi';

export type DashboardPages = 'users' | 'books';

function Dashboard() {
  const [currentPage, setCurrentPage] = useState<DashboardPages>('users');

  return (
    <Grid templateColumns="auto 1fr" w="full" minH="100vh" position="relative">
      <VStack
        pos="relative"
        hideBelow={'md'}
        bg="blue.800"
        color="gray.100"
        p={{ base: '6', md: '8', lg: '10', xl: '12' }}
      >
        <Heading fontSize={{ base: 'lg', lg: 'xl' }}>Dashboard</Heading>

        <Box _hover={{ color: 'black' }} pos="absolute" top="4" left="4">
          <Link to="/">
            <HStack>
              <FiArrowLeft fontWeight="bold" />
            </HStack>
          </Link>
        </Box>

        <VStack h="full" justifyContent="center">
          <ButtonGroup variant="outline" orientation="vertical" color="white" fontWeight="semibold">
            <Button
              disabled={currentPage === 'users'}
              _hover={{ color: 'blue.800' }}
              _dark={{ borderColor: 'white', _hover: { color: 'white' } }}
              color="inherit"
              fontWeight="inherit"
              onClick={() => setCurrentPage('users')}
            >
              Users
            </Button>
            <Button
              disabled={currentPage === 'books'}
              _hover={{ color: 'blue.800' }}
              _dark={{ borderColor: 'white', _hover: { color: 'white' } }}
              color="inherit"
              fontWeight="inherit"
              onClick={() => setCurrentPage('books')}
            >
              Books
            </Button>
          </ButtonGroup>
        </VStack>
      </VStack>

      <Box position="absolute" top="4" left="4" display={{ base: 'block', md: 'none' }}>
        <DashboardDrawer currentPage={currentPage} setCurrentPage={setCurrentPage} />
      </Box>

      <Stack py="8">
        {currentPage === 'users' && (
          <VStack position="relative">
            <UserListTable />

            <LinkButton w="32" to={'users/create'}>
              Add new user
            </LinkButton>
          </VStack>
        )}

        {currentPage === 'books' && (
          <VStack position="relative">
            <BookListTable />

            <LinkButton w="32" to={'books/create'}>
              Add new book
            </LinkButton>
          </VStack>
        )}
      </Stack>
    </Grid>
  );
}

export default Dashboard;
