import { createBrowserRouter } from "react-router";
import { Button } from "@/components/ui/button";

import EmployeesDashboardPage from "@/pages/dashboard/employees";
import AttendanceDashboardPage from "@/pages/dashboard/attendance";

import DashboardLayout from "@/layouts/dashboard-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex min-h-svh flex-col items-center justify-center">
        <Button>Click me</Button>
      </div>
    ),
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <div>Welcome to the Dashboard</div>,
      },
      {
        path: "/dashboard/users",
        element: <EmployeesDashboardPage />,
      },
      {
        path: "/dashboard/restaurants",
        element: <AttendanceDashboardPage />,
      },
    ],
  },
]);
