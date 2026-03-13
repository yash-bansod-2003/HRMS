import type { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/dashboard/employees/data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

export const attendanceStatuses = [
  {
    label: "Present",
    value: "PRESENT",
  },
  {
    label: "Absent",
    value: "ABSENT",
  },
] as const;

export const attendanceSchema = z.object({
  id: z.number(),
  employee: z.number().optional(),
  employee_name: z.string(),
  date: z.string(),
  status: z.enum(["PRESENT", "ABSENT"]),
  created_at: z.string(),
});

export type Attendance = z.infer<typeof attendanceSchema>;

export const columns: ColumnDef<Attendance>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-0.5"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-0.5"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => <div className="w-20">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employee_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = attendanceStatuses.find(
        (option) => option.value === row.getValue("status"),
      );

      if (!status) {
        return null;
      }

      return (
        <Badge
          variant={status.value === "PRESENT" ? "default" : "destructive"}
        >
          {status.label}
        </Badge>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date Added" />
    ),
    cell: ({ row }) => {
      const rawValue = row.getValue("created_at");

      if (typeof rawValue !== "string") {
        return null;
      }

      return <span>{formatDate(rawValue)}</span>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
