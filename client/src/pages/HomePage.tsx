import Header from '@/components/header/Header';
import { Box, Grid, Heading, Stack } from '@chakra-ui/react';

function HomePage() {
  return (
    <Stack>
      <Header />

      <Box as="main">
        <Heading>Books</Heading>
        <Grid>Books</Grid>
      </Box>
    </Stack>
  );
}

export default HomePage;
