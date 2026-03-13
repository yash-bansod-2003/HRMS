import { httpClient } from "@/lib/http-client";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/loading";
import { Navigate, Link } from "react-router";

import { DashboardHeader } from "@/components/dashboard-header";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { columns } from "@/components/dashboard/employees/columns";
import { DataTable } from "@/components/dashboard/employees/data-table";


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
    return <Loading />;
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 space-y-4">
      <DashboardHeader
        heading="Employees"
        text="Manage your employees and their information"
      >
        <Link to="/dashboard/employees/create" className={buttonVariants()}>
          <PlusCircle className="mr-2" /> Add Employee
        </Link>
      </DashboardHeader>
      <DataTable columns={columns} data={query.data?.results || []} />
    </div>
  );
};

export default EmployeesPage;
