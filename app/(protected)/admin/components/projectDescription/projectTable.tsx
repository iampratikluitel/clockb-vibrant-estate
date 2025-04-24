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
import React, { useState } from "react";
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
import {
  useAdminDeleteProjectMutation,
  useAdminToggleUpcommingProjectMutation,
  useDeleteMultipleUpcommingProjectAdminMutation,
  useGetAllAdminUpcommingProjectQuery,
} from "@/store/api/Admin/adminUpcommingProject";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { paths } from "@/lib/paths";
import AlertDialogBox from "../AlertDialogBox";
import { useRouter } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";

export default function ProjectTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const router = useRouter();
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const [rowSelection, setRowSelection] = React.useState({});
  const [Toggle] = useAdminToggleUpcommingProjectMutation()
  const { data: ProjectData, isLoading: ProjectDataLoading } =
    useGetAllAdminUpcommingProjectQuery();

  const [deleteById] = useAdminDeleteProjectMutation();
  const [deleteMultiple] = useDeleteMultipleUpcommingProjectAdminMutation();

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

  const handleToggle = async (itemId: String) => {
    try {
      const response = await Toggle(itemId).unwrap();
      if (response) {
        toast.success(`${response.message}`);
      } else {
        toast.error(`Couldn't Toggle`);
      }
    } catch (error) {
      toast.error(`Error Toggling`);
    }
  };

  const data: UpcommingProject[] = ProjectData || [];
  const columns: ColumnDef<UpcommingProject>[] = [
    {
      id: "_id",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ row }) => <div>{row.getValue("title")}</div>,
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
      cell: ({ row }) => {
        const faqrow = row.original;
        return (
          <Switch
            checked={row.getValue("status")}
            onCheckedChange={() => handleToggle(faqrow._id)}
          />
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const faqrow = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  router.push(
                    `${paths.admin.projectdescription}?id=${faqrow._id}`
                  )
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <AlertDialogBox
                onCancel={() => setShowConfirmation(false)}
                onConfirm={() => confirmDelete(faqrow._id)}
                text={"Delete"}
              ></AlertDialogBox>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
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

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);

  const openDeleteModal = (ids: string[]) => {
    setSelectedRowIds(ids);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedRowIds([]);
    setRowSelection({});
  };

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter member..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          className="max-w-sm"
        />

        {table.getFilteredSelectedRowModel().rows.length > 0 && (
          <Button
            onClick={() =>
              openDeleteModal(
                table
                  .getFilteredSelectedRowModel()
                  .rows.map((row) => row.original._id ?? "")
              )
            }
            variant={"destructive"}
            className="ml-2"
          >
            Delete
          </Button>
        )}

        <Dialog open={isDeleteModalOpen} onOpenChange={closeDeleteModal}>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
              <DialogDescription>
                This will delete your data permanently.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <Button onClick={closeDeleteModal}>Cancel</Button>
              <Button
                onClick={async () => {
                  await handleMultipleDelete(selectedRowIds);
                  closeDeleteModal();
                }}
                variant={"destructive"}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
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
