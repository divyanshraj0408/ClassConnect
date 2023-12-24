import { createContext } from "react";

type createContextType = {
  isJoined: boolean;
  join: (className: string, creator: string) => void;
  create: () => void;
};
export const CreateClassContext = createContext<createContextType>({
  isJoined: false,
  join: (_className: string, _creator: string) => {},
  create: () => {},
});
