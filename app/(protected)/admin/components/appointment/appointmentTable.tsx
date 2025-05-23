"use client";

import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { APPOINTMENT, Contact } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { convertToHumanReadable } from "@/lib/helper";
import { toast } from "sonner";
import {
  useDeleteMultipleAppointmentAdminMutation,
  useDeleteMultipleContactAdminMutation,
  useGetAllAdminAppointmentQuery,
  useGetAllAdminContactQuery,
} from "@/store/api/Admin/adminContact";

const AppointmentTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [deleteMultiple] = useDeleteMultipleAppointmentAdminMutation();
  const { data: Data, isLoading: Loading } = useGetAllAdminAppointmentQuery("");

  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);
  const [selectedRowIds, setSelectedRowIds] = React.useState<string[]>([]);
  const [viewedMessage, setViewedMessage] = React.useState<APPOINTMENT | null>(
    null
  );

  const handleMultipleDelete = async (ids: string[]) => {
    toast.promise(
      deleteMultiple({
        ids: ids,
      }),
      {
        loading: "Deleting...",
        success: <b>Deleted</b>,
        error: <b>Error while deleting</b>,
      }
    );
  };

  const data: APPOINTMENT[] = Data ?? [];
  const columns: ColumnDef<APPOINTMENT>[] = [
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
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => (
        <div className="capitalize">
          {convertToHumanReadable(row.getValue("date"))}
        </div>
      ),
    },
    {
      accessorKey: "time",
      header: "Time",
      cell: ({ row }) => {
        const timeValue = row.getValue("time");

        // If it's a string or Date object, convert and format it
        const formattedTime = new Date(
          `1970-01-01T${timeValue}`
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });

        return <div>{formattedTime}</div>;
      },
    },
    {
      accessorKey: "note",
      header: "note",
      cell: ({ row }) => (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setViewedMessage(row.original)}
        >
          View
        </Button>
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
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <>
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter Name..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
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
                className="m-2"
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
                  .map((column) => (
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
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
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

          {/* View Message Dialog */}
          <Dialog
            open={!!viewedMessage}
            onOpenChange={() => setViewedMessage(null)}
          >
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle className="text-xl font-semibold text-primary">
                  📝 Appointment Note
                </DialogTitle>
              </DialogHeader>

              {viewedMessage && (
                <div className="space-y-4 text-sm max-h-[400px] overflow-y-auto">
                  <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                    <span className="font-medium text-muted-foreground">
                      Name:
                    </span>
                    <span className="text-base font-semibold">
                      {viewedMessage.name}
                    </span>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                    <span className="font-medium text-muted-foreground">
                      Email:
                    </span>
                    <a
                      href={`mailto:${viewedMessage.email}`}
                      className="text-blue-600 hover:underline"
                    >
                      {viewedMessage.email}
                    </a>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                    <span className="font-medium text-muted-foreground">
                      Phone:
                    </span>
                    <span>{viewedMessage.phone}</span>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                    <span className="font-medium text-muted-foreground">
                      Date:
                    </span>
                    <span>{convertToHumanReadable(viewedMessage.date)}</span>
                  </div>

                  <div className="grid grid-cols-[100px_1fr] gap-2 items-center">
                    <span className="font-medium text-muted-foreground">
                      Time:
                    </span>
                    <span>
                      {new Date(
                        `1970-01-01T${viewedMessage.time}`
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>

                  <div>
                    <span className="font-medium text-muted-foreground block mb-1">
                      Note:
                    </span>
                    <div className="whitespace-pre-line border p-4 rounded-md bg-gray-50 dark:bg-zinc-900 text-sm leading-relaxed shadow-inner">
                      {viewedMessage.note}
                    </div>
                  </div>
                </div>
              )}

              <DialogFooter className="pt-6">
                <Button variant="ghost" onClick={() => setViewedMessage(null)}>
                  Close
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default AppointmentTable;
