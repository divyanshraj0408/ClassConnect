import { createContext } from "react";

type AuthContextType = {
  isLoggedIn: boolean;
  userId: string | null;
  login: (userId: string, token: any) => void;
  logout: () => void;
  token: any;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoggedIn: false,
  userId: null,
  login: (userId, token) => {},
  logout: () => {},
});
