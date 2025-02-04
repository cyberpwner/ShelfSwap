import { axiosInstance } from '@/api/api';
import { ReactNode, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { fifteenMinutesInMs } from '@/constants/date';
import { IUserState } from '@/types/user.types';

interface Props {
  children: ReactNode;
}

function AuthContextProvider({ children }: Props) {
  const [user, setUser] = useState<IUserState | null>(null);
  const [loading, setLoading] = useState(true);

  async function checkAuth() {
    setLoading(true);

    try {
      const response = await axiosInstance.get<IUserState>('/authcheck');

      const user = response.data;

      setUser(user ?? null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  // when authenticated, refresh token every 15 minutes.
  useEffect(() => {
    if (user) {
      const intervalId = setInterval(async () => {
        await checkAuth();
      }, fifteenMinutesInMs());

      return () => clearInterval(intervalId);
    }
  }, [user]);

  useEffect(() => {
    const callCheckAuth = async () => {
      await checkAuth();
    };

    callCheckAuth();
  }, []);

  return <AuthContext.Provider value={{ user, setUser, loading }}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;
