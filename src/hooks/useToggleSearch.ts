import { useContext, useEffect } from "react";
import { SearchContext } from "../context/search";

export function useToggleSearch() {
  const toggleSearch = useContext(SearchContext)!;

  useEffect(() => {
    toggleSearch(true);
    return () => toggleSearch(false);
  }, [toggleSearch]);
}
