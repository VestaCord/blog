import { createContext, useState, ReactNode } from "react";

export interface UserInfo {
  username: string;
}

//user info state variable interface
export interface UserContextType {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
}

//empty context which accepts state variable
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
