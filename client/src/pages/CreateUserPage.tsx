import CreateUserForm from '@/components/forms/CreateUserForm';
import { Grid, Heading, Stack } from '@chakra-ui/react';
import { Link } from 'react-router';

function CreateUserPage() {
  return (
    <Stack minH="100vh" gap="24">
      <Grid placeItems="center" color="white" as="header" h="48" bg="blue.800">
        <Heading>
          <Link to="/dashboard">Dashboard</Link>
        </Heading>
      </Grid>

      <Grid placeItems="center" templateColumns="1fr">
        <CreateUserForm maxW="300px" minW="300px" />
      </Grid>
    </Stack>
  );
}

export default CreateUserPage;
