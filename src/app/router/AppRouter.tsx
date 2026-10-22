import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppointmentsPage } from "../../features/appointments/pages/AppointmentsPage";
import { LoginPage } from "../../features/auth/pages/LoginPage";
import { RegisterPage } from "../../features/auth/pages/RegisterPage";
import { ConversationsPage } from "../../features/conversations/pages/ConversationsPage";
import { CustomersPage } from "../../features/customers/pages/CustomersPage";
import { DashboardPage } from "../../features/dashboard/pages/DashboardPage";
import { EmployeesPage } from "../../features/employees/pages/EmployeesPage";
import { SchedulesPage } from "../../features/schedules/pages/SchedulesPage";
import { ServicesPage } from "../../features/services/pages/ServicesPage";
import { SettingsPage } from "../../features/settings/pages/SettingsPage";
import { UsersPage } from "../../features/users/pages/UsersPage";
import { AppLayout } from "../../layouts/AppLayout";
import { NotFoundPage } from "../../routes/NotFoundPage";
import { ROUTES } from "../../routes/paths";
import { USER_MANAGEMENT_ROLE } from "./navigation";
import { ProtectedRoute } from "./ProtectedRoute";
import { RoleRoute } from "./RoleRoute";
import { PublicRoute } from "./PublicRoute";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "services", element: <ServicesPage /> },
      { path: "employees", element: <EmployeesPage /> },
      { path: "customers", element: <CustomersPage /> },
      { path: "conversations", element: <ConversationsPage /> },
      { path: "schedules", element: <SchedulesPage /> },
      { path: "appointments", element: <AppointmentsPage /> },
      {
        path: "users",
        element: (
          <RoleRoute allowedRoles={[USER_MANAGEMENT_ROLE]}>
            <UsersPage />
          </RoleRoute>
        ),
      },
      { path: "settings", element: <SettingsPage /> },
    ],
  },
  {
    path: ROUTES.LOGIN,
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: ROUTES.REGISTER,
    element: (
      <PublicRoute>
        <RegisterPage />
      </PublicRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
