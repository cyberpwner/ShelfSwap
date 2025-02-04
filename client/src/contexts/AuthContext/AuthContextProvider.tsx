import { axiosInstance } from '@/api/api.constants';
import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

interface Props {
  children: ReactNode;
}

function AuthContextProvider({ children }: Props) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axiosInstance.get('/authcheck');

        setIsAuth(response.status === 200);
      } catch {
        setIsAuth(false);
      }
    }

    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
