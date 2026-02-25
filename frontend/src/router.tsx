import { createBrowserRouter, Link } from "react-router";
import { buttonVariants } from "@/components/ui/button";

import EmployeesDashboardPage from "@/pages/dashboard/employees";
import AttendanceDashboardPage from "@/pages/dashboard/attendance";

import DashboardLayout from "@/layouts/dashboard-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="flex min-h-svh flex-col gap-4 items-center justify-center">
        <p>Hey, Not build and home page due to time limits but you can access dashboard</p>
        <Link to="/dashboard" className={buttonVariants()}>
          Dashboard
        </Link>
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
        path: "/dashboard/employees",
        element: <EmployeesDashboardPage />,
      },
      {
        path: "/dashboard/attendance",
        element: <AttendanceDashboardPage />,
      },
    ],
  },
]);
