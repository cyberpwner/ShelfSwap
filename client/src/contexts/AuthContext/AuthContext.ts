/* eslint-disable @typescript-eslint/no-empty-function */
import { IUserState } from '@/types/user.types';
import { createContext, Dispatch, SetStateAction } from 'react';

export interface IAuthContext {
  user: IUserState | null;
  setUser: Dispatch<SetStateAction<IUserState | null>>;
  loading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  loading: false,
});
