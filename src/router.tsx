import { useLocation, Navigate, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import { useUser } from "./features/auth";
import Login from "./pages/Login";
import EditUser from "./pages/EditUser";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";

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

function RequireGuest({ children }: { children: JSX.Element }) {
  const user = useUser();
  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
