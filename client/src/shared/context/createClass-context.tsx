import { createContext } from "react";

type createContextType = {
  isJoined: boolean;
  join: () => void;
  create: () => void;
};
export const CreateClassContext = createContext<createContextType>({
  isJoined: false,
  join: () => {},
  create: () => {},
});
