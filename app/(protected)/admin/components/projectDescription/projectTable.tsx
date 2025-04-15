"use client";

import { Input } from "@/components/ui/input";
import { UpcommingProject } from "@/lib/types";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

import { convertToHumanReadable } from "@/lib/helper";
import { Switch } from "@/components/ui/switch";
import { useAdminToggleNewsInsightMutation } from "@/store/api/Admin/adminNewsInsight";
import { useAdminDeletePartnerMutation } from "@/store/api/Admin/adminPartner";
import { useDeleteMultipleUpcommingProjectAdminMutation } from "@/store/api/Admin/adminUpcommingProject";

export default function ProjectTable() {
  const [data, setData] = React.useState<UpcommingProject[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [Toggle] = useAdminToggleNewsInsightMutation();

  const [deleteById] = useAdminDeletePartnerMutation();
  const [deleteMultiple] = useDeleteMultipleUpcommingProjectAdminMutation();

  useEffect(() => {
    const fetchMember = async () => {
      try {
        console.log("Fetching team members...");
        const res = await fetch("/api/admin/project-description");

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const result = await res.json();
        console.log("Fetched data:", result);

        // If result is an object instead of an array, wrap it in an array
        setData(Array.isArray(result) ? result : [result]);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMember();
  }, []);

  const confirmDelete = async (itemId: String) => {
    toast.promise(deleteById(itemId).unwrap(), {
      loading: "Deleting...",
      success: <b>Deleted</b>,
      error: <b>Error while deleting</b>,
    });
  };

  const handleMultipleDelete = async (ids: string[]) => {
    toast.promise(
      deleteMultiple({
        ids: ids,
      }),
      {
        loading: "Deleting...",
        success: <b> Deleted</b>,
        error: <b>Error while deleting</b>,
      }
    );
  };

  const handleToggle = async (itemId: string) => {
    try {
      const response = await Toggle(itemId).unwrap();
      response
        ? toast.success(response.message)
        : toast.error("Couldn't Toggle");
    } catch {
      toast.error("Error Toggling");
    }
  };

  const columns: ColumnDef<UpcommingProject>[] = [
    {
      accessorKey: "title",
      header: "title",
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
      accessorKey: "addedDate",
      header: "Added Date",
      cell: ({ row }) => (
        <div>{convertToHumanReadable(row.getValue("addedDate"))}</div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Switch
          checked={row.getValue("status")}
          onCheckedChange={() => handleToggle(row.original._id)}
        />
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter member..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
