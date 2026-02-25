import type { ColumnDef } from "@tanstack/react-table";
import { ChartNoAxesCombined, Building2, Users } from "lucide-react";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";

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

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  created_at: string;
}

export const columns: ColumnDef<Employee>[] = [
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
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "department",
    header: "Department",
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
    header: "Date Added",
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
