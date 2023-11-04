import { createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import EditUser from "./pages/EditUser";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";
import { RequireAuth, RequireGuest } from "./helpers/route";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <RequireGuest>
        <Login />
      </RequireGuest>
    ),
  },
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout />
      </RequireAuth>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "/users",
        handle: {
          breadcrumb: () => <span>لیست کاربران</span>,
        },
        children: [
          { index: true, element: <Users /> },
          { path: "create", element: <Users /> },
          {
            path: ":userId",
            element: <EditUser />,
            handle: {
              breadcrumb: () => <span>ویرایش کاربر</span>,
            },
          },
        ],
      },
    ],
  },
]);
