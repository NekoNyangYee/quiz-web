import React, { createContext, useContext, useState, type ReactNode } from 'react';

interface UserInfo {
  name: string;
  age: number;
  email: string;
}

interface UserContextType {
  userInfo: UserInfo | null;
  setUserInfo: (info: UserInfo) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 