import { httpClient } from "@/lib/http-client";
import { useQuery } from "@tanstack/react-query";
import { Loading } from "@/components/loading";
import { Link, Navigate } from "react-router";

import { DashboardHeader } from "@/components/dashboard-header";
import { buttonVariants } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { columns } from "@/components/dashboard/attendance/columns";
import { DataTable } from "@/components/dashboard/employees/data-table";

const AttendancePage = () => {
  const attendanceQuery = useQuery({
    queryKey: ["auth/attendance"],
    queryFn: async () => {
      const response = await httpClient.get("/api/attendance/?format=json");
      return response.data;
    },
  });

  if (!attendanceQuery.isLoading && !attendanceQuery.data) {
    return <Navigate to="/" replace />;
  }

  if (attendanceQuery.isLoading) {
    return <Loading />;
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs lg:px-6 space-y-4">
      <DashboardHeader
        heading="Attendance"
        text="Manage your employees' attendance records"
      >
        <Link to="/dashboard/attendance/create" className={buttonVariants()}>
          <PlusCircle className="mr-2" /> Add Attendance
        </Link>
      </DashboardHeader>
      <DataTable columns={columns} data={attendanceQuery.data?.results || []} />
    </div>
  );
};

export default AttendancePage;