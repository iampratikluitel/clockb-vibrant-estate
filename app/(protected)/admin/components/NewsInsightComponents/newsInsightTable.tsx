"use client";

import * as React from "react";
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
import {
  useAdminDeleteNewsInsightMutation,
  useAdminToggleNewsInsightMutation,
  useDeleteMultipleNewsInsightsAdminMutation,
  useGetAllAdminNewsInsightsQuery,
} from "@/store/api/Admin/adminNewsInsight";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { paths } from "@/lib/paths";
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import AlertDialogBox from "../AlertDialogBox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { NEWSINSIGHT } from "@/lib/types";

const NewsTable = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data: Data, isLoading: Loading } =
    useGetAllAdminNewsInsightsQuery("");
  const [showConfirmation, setShowConfirmation] = React.useState(false);

  const [deleteById] = useAdminDeleteNewsInsightMutation();
  const [Toggle] = useAdminToggleNewsInsightMutation();
  const [deleteMultiple] = useDeleteMultipleNewsInsightsAdminMutation();

  const router = useRouter();

  const confirmDelete = async (itemId: string) => {
    toast.promise(deleteById(itemId).unwrap(), {
      loading: "Deleting...",
      success: <b>Deleted</b>,
      error: <b>Error while deleting</b>,
    });
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

  const handleMultipleDelete = async (ids: string[]) => {
    toast.promise(deleteMultiple({ ids }).unwrap(), {
      loading: "Deleting...",
      success: <b>Deleted</b>,
      error: <b>Error while deleting</b>,
    });
  };

  const data: NEWSINSIGHT[] = Data ?? [];

  const columns: ColumnDef<NEWSINSIGHT>[] = [
    {
      accessorKey: "title",
      header: "News Title",
      cell: ({ row }) => (
        <div className="flex items-center gap-4">
          <img
            src={`/api/resources/download?filename=${encodeURIComponent(row.original.image)}`}
            alt="News"
            className="rounded-full h-12 w-12 object-cover"
          />
          <div className="capitalize">{row.getValue("title")}</div>
        </div>
      ),
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => (
        <div>{row.getValue("author")}</div>
      ),
    },
    {
      accessorKey: "category",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Category
            <CaretSortIcon className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const category = row.getValue("category");
        return (
          <div className="capitalize">
            {category && typeof category === "object" && "name" in category
              ? (category as { name: string }).name
              : typeof category === "string"
              ? category
              : "Uncategorized"}
          </div>
        );
      },
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
                  router.push(`${paths.admin.editNews}?id=${faqrow._id}`)
                }
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <AlertDialogBox
                onCancel={() => setShowConfirmation(false)}
                onConfirm={() => faqrow._id && confirmDelete(faqrow._id)}
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
    <div className="w-full h- ">
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <>
          {" "}
          <div className="flex items-center py-4">
            <Input
              placeholder="Filter Name..."
              value={
                (table.getColumn("title")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("title")?.setFilterValue(event.target.value)
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
        </>
      )}
    </div>
  );
};
export default NewsTable;
