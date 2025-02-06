import CustomSpinner from '@/components/CustomSpinner';
import EditUserForm from '@/components/forms/EditUserForm';
import { useUserDetails } from '@/hooks/useUserDetails/useUserDetails';
import { Stack } from '@chakra-ui/react';
import { Navigate, useParams } from 'react-router';

function EditUser() {
  const { id } = useParams();
  const { isPending, isError, data } = useUserDetails(id ?? '');

  if (id == null) {
    return <Navigate to={'/dashboard'} />;
  }

  if (isPending) {
    return <CustomSpinner />;
  }

  if (isError) {
    return null;
  }

  return (
    <Stack>
      <EditUserForm data={data} />
    </Stack>
  );
}

export default EditUser;
