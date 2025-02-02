/* eslint-disable @typescript-eslint/no-empty-function */
import { axiosInstance } from '@/api/api.constants';
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

interface IAuthContext {
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<IAuthContext>({
  isAuth: false,
  setIsAuth: () => {},
});

export const useAuth = () => useContext(AuthContext);

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
