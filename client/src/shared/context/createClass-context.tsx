import { createContext } from "react";

type createContextType = {
  isJoined: boolean;
  join: (className: string, creator: string) => void;
  create: (className: string) => void;
};
export const CreateClassContext = createContext<createContextType>({
  isJoined: false,
  join: (className: string, creator: string) => {},
  create: (className: string) => {},
});
