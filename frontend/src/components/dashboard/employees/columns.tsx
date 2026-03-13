import type { ColumnDef } from "@tanstack/react-table";
import { ChartNoAxesCombined, Building2, Users } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";

export const departments = [
  {
    label: "Human Resources",
    value: "HR",
    icon: Users,
  },
  {
    label: "Information Technology",
    value: "IT",
    icon: Building2,
  },
  {
    label: "Sales",
    value: "Sales",
    icon: ChartNoAxesCombined,
  },
];

export const employeeSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  department: z.string(),
  created_at: z.string(),
});

export type Employee = z.infer<typeof employeeSchema>;

export const columns: ColumnDef<Employee>[] = [
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
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => {
      const department = departments.find((department) => department.value === row.getValue("department"));

      if (!department) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center gap-2">
          {department.icon && <department.icon className="text-muted-foreground size-4" />}
          <span>{department.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
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
