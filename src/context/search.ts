import { createContext } from "react";

export const SearchContext = createContext<null | ((show: boolean) => void)>(
  null,
);
