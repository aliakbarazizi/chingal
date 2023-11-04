import { SortingState } from "@tanstack/react-table";

export function getSortStateFromParams(
  searchParams: URLSearchParams,
): SortingState {
  return [
    {
      id: searchParams.get("sort") || "name",
      desc: searchParams.get("dir") === "desc",
    },
  ];
}
