import { axiosInstance } from '@/api/api';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { FiLogOut } from 'react-icons/fi';

interface Props {
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

function LogoutButton({ setIsAuth }: Props) {
  async function doLogout(setIsAuth: Dispatch<SetStateAction<boolean>>) {
    try {
      const response = await axiosInstance.post('/users/logout');

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return error.response;
      }
    } finally {
      setIsAuth(false);
    }
  }

  return (
    <Button onClick={() => doLogout(setIsAuth)}>
      <FiLogOut />
    </Button>
  );
}

export default LogoutButton;
