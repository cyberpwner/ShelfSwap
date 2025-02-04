import { axiosInstance } from '@/api/api';
import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fifteenMinutesInMs } from '@/constants/date';

interface Props {
  children: ReactNode;
}

function AuthContextProvider({ children }: Props) {
  const [isAuth, setIsAuth] = useState(false);

  async function checkAuth() {
    try {
      const response = await axiosInstance.get('/authcheck');

      setIsAuth(response.status === 200);
    } catch {
      setIsAuth(false);
    }
  }

  // when authenticated, refresh token every 15 minutes.
  useEffect(() => {
    if (isAuth) {
      const intervalId = setInterval(async () => {
        await checkAuth();
      }, fifteenMinutesInMs());

      return () => clearInterval(intervalId);
    }
  }, [isAuth]);

  useEffect(() => {
    checkAuth();
  }, []);

  return <AuthContext.Provider value={{ isAuth, setIsAuth }}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
