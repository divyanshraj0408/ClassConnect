import { createContext } from "react";

type createContextType = {
  create: () => void;
};

export const CreateAssignmentContext = createContext<createContextType>({
  create: () => {},
});
