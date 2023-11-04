import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
  Updater,
  createColumnHelper,
} from "@tanstack/react-table";
import { User, useUsers } from "..";
import { useCallback, useMemo } from "react";
import ArrowUp1 from "../../../assets/icons/outline/ArrowUp1";
import classNames from "classnames";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getSortStateFromParams } from "../../../helpers/table";

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor("name", {
    header: "نام کاربر",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "سن",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phoneNumber", {
    header: "شماره تلفن",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "ایمیل",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor(
    (row) => [row.city, row.street, row.zipcode].join(" ،"),
    {
      id: "address",
      header: "آدرس",
      cell: (info) => info.getValue(),
    },
  ),
  columnHelper.accessor("company", {
    header: "شرکت",
    cell: (info) => info.renderValue(),
  }),
];

export default function UsersTable() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const { data } = useUsers();

  const table = useReactTable({
    data: data || [],
    columns,
    state: {
      sorting: useMemo(
        () => getSortStateFromParams(searchParams),
        [searchParams],
      ),
      globalFilter: searchParams.get("search"),
    },
    enableSortingRemoval: false,
    onGlobalFilterChange: useCallback(
      (search: Updater<unknown>) => {
        setSearchParams((params) => {
          const data =
            typeof search === "function"
              ? search(params.get("search"))
              : search;
          params.set("search", data);
          return params;
        });
      },
      [setSearchParams],
    ),
    onSortingChange: useCallback(
      (sort: Updater<SortingState>) => {
        setSearchParams((params) => {
          const data =
            typeof sort === "function"
              ? sort(getSortStateFromParams(params))
              : sort;
          params.set("sort", data[0].id);
          params.set("dir", data[0].desc ? "desc" : "asc");
          return params;
        });
      },
      [setSearchParams],
    ),
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <table className="w-full table-fixed border-collapse rounded-2xl text-center text-sm text-surface-900">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              return (
                <th
                  key={header.id}
                  className={classNames(
                    "border-x border-b-[0.5px] border-surface-200 py-2 text-xs font-normal first:w-[104px] first:border-s-0 last:border-l-0",
                    header.column.getIsSorted()
                      ? "bg-primary-400 text-white"
                      : "text-surface-500",
                  )}
                >
                  <div
                    className={
                      header.column.getCanSort()
                        ? "flex cursor-pointer select-none items-center justify-center gap-2.5"
                        : ""
                    }
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: <ArrowUp1 />,
                      desc: <ArrowUp1 className="rotate-180" />,
                    }[header.column.getIsSorted() as string] ?? null}
                  </div>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody>
        {table
          .getRowModel()
          .rows.slice(0, 10)
          .map((row) => {
            return (
              <tr
                key={row.id}
                className="group cursor-pointer odd:bg-surface-200"
                onClick={() => navigate(`/users/${row.original.id}`)}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      className="border-x border-y-[0.5px] border-surface-200 py-7 first:border-s-0 first:text-surface-600 last:border-e-0 group-last:border-b-0"
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
      </tbody>
    </table>
  );
}
