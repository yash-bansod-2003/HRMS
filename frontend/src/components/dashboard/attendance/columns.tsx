import type { ColumnDef } from "@tanstack/react-table";

export interface Attendance {
  id: number;
  employee_name: string;
  date: string;
  status: "PRESENT" | "ABSENT" | "LEAVE";
  created_at: string;
}

export const columns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "employee_name",
    header: "Employee Name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "created_at",
    header: "Date Added",
  },
];
