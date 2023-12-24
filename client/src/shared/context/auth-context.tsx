import { createContext } from "react";

type AuthContextType = {
  token: null;
  isLoggedIn: boolean;
  userId: string;
  login: (_userId: string, _token: any) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  isLoggedIn: false,
  userId: "",
  login: (_userId, _token) => {},
  logout: () => {},
});
