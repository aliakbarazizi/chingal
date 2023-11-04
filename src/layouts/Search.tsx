import TextInput from "../elements/TextInput";
import SearchIcon from "../assets/icons/outline/Search";
import { useState, useEffect } from "react";
import { useDebounce } from "usehooks-ts";
import { useSearchParams } from "react-router-dom";
import { useEvent } from "../hooks/useEvent";

export default function Search() {
  // useSearchParams ref is not same when page changed
  // useEvent will make sure we have last ref and in the meantime we don't trigger useEffect
  const setSearchParams = useEvent(useSearchParams()[1]);

  const [search, setSearch] = useState<string | null>(null);

  const debounce = useDebounce(search, 500);

  useEffect(() => {
    setSearchParams((searchParams) => {
      if (searchParams.get("search") !== debounce) {
        if (debounce) {
          searchParams.set("search", debounce);
        } else {
          searchParams.delete("search");
        }
      }
      return searchParams;
    });
  }, [debounce, setSearchParams]);

  return (
    <TextInput
      className="!w-[512px] !border-surface-300 bg-gradient-to-r from-surface-100 to-surface-200 to-85% ps-12 placeholder-surface-500"
      placeholder="جستجو"
      value={search || ""}
      onChange={(e) => setSearch(e.currentTarget.value)}
    >
      <SearchIcon className="absolute start-4 top-1/2 -translate-y-1/2" />
    </TextInput>
  );
}
