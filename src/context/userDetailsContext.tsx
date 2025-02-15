import { createContext, Dispatch, SetStateAction } from 'react';

interface UserDetail {
  _id: any;
  _creationTime: number;
  name: string;
  email: string;
  picture: string;
  uid: string;
}

interface UserDetailContextType {
  userDetail: UserDetail | null;
  setUserDetail: Dispatch<SetStateAction<UserDetail | null>>;
}

const defaultUserDetailContext: UserDetailContextType = {
  userDetail: null,
  setUserDetail: () => {}
};

export const UserDetailContext = createContext<UserDetailContextType>(defaultUserDetailContext);