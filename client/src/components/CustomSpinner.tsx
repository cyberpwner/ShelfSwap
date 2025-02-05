import { Grid, Spinner } from '@chakra-ui/react';

function CustomSpinner() {
  return (
    <Grid h="100vh" w="full" placeItems="center">
      <Spinner size="xl" marginInline="auto" />
    </Grid>
  );
}

export default CustomSpinner;
