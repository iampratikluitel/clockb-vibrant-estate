"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convertToHumanReadable } from "@/lib/helper";
import { MINIOURL } from "@/lib/constants";
import { useGetAllAdminNewsInsightsQuery } from "@/store/api/Admin/adminNewsInsight";
import { NewsInsight } from "@/lib/types";

const NewsTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  
  const { data: Data, isLoading: Loading } = useGetAllAdminNewsInsightsQuery("");
  // const [deleteById] = useAdminDeleteNewsInsightMutation();
  // const [Toggle] = useAdminToggleNewsInsightMutation();
  // const [deleteMultiple] = useDeleteMultipleNewsInsightsAdminMutation();
  
  // const confirmDelete = async (itemId: string) => {
  //   toast.promise(deleteById(itemId).unwrap(), {
  //     loading: "Deleting...",
  //     success: <b>Deleted</b>,
  //     error: <b>Error while deleting</b>,
  //   });
  // };
  
  // const handleToggle = async (itemId: string) => {
  //   try {
  //     const response = await Toggle(itemId).unwrap();
  //     response ? toast.success(response.message) : toast.error("Couldn't Toggle");
  //   } catch {
  //     toast.error("Error Toggling");
  //   }
  // };

  // const handleMultipleDelete = async (ids: string[]) => {
  //   toast.promise(deleteMultiple({ ids }).unwrap(), {
  //     loading: "Deleting...",
  //     success: <b>Deleted</b>,
  //     error: <b>Error while deleting</b>,
  //   });
  // };

  const data: NewsInsight[] = Data ?? [];
  
  const columns: ColumnDef<NewsInsight>[] = [
    {
      accessorKey: "title",
      header: "News Title",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <img
            src={`${MINIOURL}${row.original.image}`}
            alt="News"
            className="rounded-full h-12 w-12 object-cover"
          />
          <div className="capitalize">{row.getValue("title")}</div>
        </div>
      ),
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      accessorKey: "addedDate",
      header: "Added Date",
      cell: ({ row }) => <div>{convertToHumanReadable(row.getValue("addedDate"))}</div>,
    },
    // {
    //   accessorKey: "status",
    //   header: "Status",
    //   cell: ({ row }) => (
    //     <Switch checked={row.getValue("status")} onCheckedChange={() => handleToggle(row.original._id)} />
    //   ),
    // },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: { sorting, columnVisibility, rowSelection },
  });

  return (
    <div className="w-full">
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};
export default NewsTable;
