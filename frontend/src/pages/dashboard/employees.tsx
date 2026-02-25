import { httpClient } from "@/lib/http-client";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
}

const EmployeesPage = () => {
  const query = useQuery({
    queryKey: ["auth/employees"],
    queryFn: async () => {
      const response = await httpClient.get("/api/employees/?format=json");
      return response.data;
    },
  });

  if (!query.isLoading && !query.data) {
    return <Navigate to="/" replace />;
  }

  console.log(query.data);

  if (query.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Employees</h1>
      <Table>
        <TableCaption>A list of your employees</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data.map((employee: Employee) => (
            <TableRow key={employee.id}>
              <TableCell className="font-medium">{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell className="text-right">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline ml-2">
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EmployeesPage;
