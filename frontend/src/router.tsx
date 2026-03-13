import { createBrowserRouter } from "react-router";

import MarketingPage from "@/pages/marketing";
import DashboardHomePage from "@/pages/dashboard/home";
import EmployeesDashboardPage from "@/pages/dashboard/employees/employees";
import EmployeeCreatePage from "@/pages/dashboard/employees/employee-create";
import EmployeeEditPage from "@/pages/dashboard/employees/employee-edit";
import AttendanceDashboardPage from "@/pages/dashboard/attendance/attendance";
import AttendanceCreatePage from "@/pages/dashboard/attendance/attendance-create";
import AttendanceEditPage from "@/pages/dashboard/attendance/attendance-edit";

import DashboardLayout from "@/layouts/dashboard-layout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MarketingPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardHomePage />,
      },
      {
        path: "/dashboard/employees",
        element: <EmployeesDashboardPage />,
      },
      {
        path: "/dashboard/employees/create",
        element: <EmployeeCreatePage />,
      },
      {
        path: "/dashboard/employees/edit/:id",
        element: <EmployeeEditPage />,
      },
      {
        path: "/dashboard/attendance",
        element: <AttendanceDashboardPage />,
      },
      {
        path: "/dashboard/attendance/create",
        element: <AttendanceCreatePage />,
      },
      {
        path: "/dashboard/attendance/edit/:id",
        element: <AttendanceEditPage />,
      },
    ],
  },
]);
