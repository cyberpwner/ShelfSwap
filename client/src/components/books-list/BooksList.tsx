import { Grid, GridItem } from '@chakra-ui/react';
import { BookCard } from '../card/BookCard';
import { Link } from 'react-router';

function BooksList() {
  return (
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
      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
        <GridItem key={num}>
          <Link to={`/${num}`}>
            <BookCard />
          </Link>
        </GridItem>
      ))}
    </Grid>
  );
}

export default BooksList;
