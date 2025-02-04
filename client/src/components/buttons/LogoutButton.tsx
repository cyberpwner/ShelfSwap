import { axiosInstance } from '@/api/api';
import { IAuthContext } from '@/contexts/AuthContext/AuthContext';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { FiLogOut } from 'react-icons/fi';

interface Props {
  setUser: IAuthContext['setUser'];
}

function LogoutButton({ setUser }: Props) {
  async function doLogout(setUser: Props['setUser']) {
    try {
      const response = await axiosInstance.post('/users/logout');

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
    } finally {
      setUser(null);
    }
  }

  return (
    <Button onClick={() => doLogout(setUser)}>
      <FiLogOut />
    </Button>
  );
}

export default LogoutButton;
