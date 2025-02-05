import UserListTable from '@/components/user-list/UserListTable';
import { Grid } from '@chakra-ui/react';

function Dashboard() {
  return (
    <Grid templateColumns="1fr" w='full'>
      <UserListTable />
    </Grid>
  );
}

export default Dashboard;
