import { axiosInstance } from '@/api/api';
import { IAuthContext } from '@/contexts/AuthContext/AuthContext';
import { useAuth } from '@/contexts/AuthContext/useAuth';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { MouseEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode | string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

function LogoutButton({ children, onClick }: Props) {
  const { setUser } = useAuth();

  async function doLogout(setUser: IAuthContext['setUser']) {
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
    <Button
      onClick={(e) => {
        doLogout(setUser);

        if (onClick) {
          onClick(e);
        }
      }}
    >
      {children}
    </Button>
  );
}

export default LogoutButton;
