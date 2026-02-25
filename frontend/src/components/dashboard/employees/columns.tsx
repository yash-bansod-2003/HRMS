import type { ColumnDef } from "@tanstack/react-table"

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  created_at: string;
}

export const columns: ColumnDef<Employee>[] = [
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
  },
  {
    accessorKey: "created_at",
    header: "Date Added",
  }
]