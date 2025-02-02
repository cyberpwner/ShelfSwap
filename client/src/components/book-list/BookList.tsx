import { Grid, GridItem, HStack, Stack, Text } from '@chakra-ui/react';
import { BookCard } from '../card/BookCard';
import { Link } from 'react-router';
import CategorySelect from '../CategorySelect';
import { Skeleton } from '../ui/skeleton';
import { IBook } from './fetchBookList';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  selectedCategory: string[];
  setSelectedCategory: Dispatch<SetStateAction<string[]>>;
  isPending: boolean;
  isError: boolean;
  books: IBook[] | undefined;
}

function BookList({ selectedCategory, setSelectedCategory, isPending, isError, books }: Props) {
  if (isError) {
    return <Text>An error occurred. Try again later</Text>;
  }

  return (
    <Stack gap="8" alignItems={{ base: 'center', md: 'flex-start' }}>
      <CategorySelect selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <Grid
        templateColumns={{
          base: 'max-content',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
          xl: 'repeat(4, 1fr)',
          '2xl': 'repeat(5, 1fr)',
        }}
        gap="8"
      >
        {/* if it's loading, show skeletons of books*/}
        {isPending &&
          [1, 2, 3, 4, 5, 6].map((num) => (
            <Stack gap="4" key={num}>
              <Skeleton h="80" w="64" />
              <Skeleton h="6" w="24" />
              
              <HStack justifyContent="space-between">
                <Skeleton h="5" w="36" />
                <Skeleton h="5" w="8" />
              </HStack>
            </Stack>
          ))}

        {/* if data is ready, show books */}

        {books &&
          books.length > 0 &&
          books.map((book) => (
            <GridItem key={book.id}>
              <Link to={`/${book.id}`}>
                <BookCard title={book.title} authors={book.authors} price={book.price} coverUrl={book.coverUrl} />
              </Link>
            </GridItem>
          ))}
      </Grid>
    </Stack>
  );
}

export default BookList;
