import {
  Route,
  useLocation,
  Navigate,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./layouts/Layout";
import { useUser } from "./features/auth";
import Login from "./pages/Login";
import EditUser from "./pages/EditUser";
import Users from "./pages/Users";
import Dashboard from "./pages/Dashboard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/login"
        element={
          <RequireGuest>
            <Login />
          </RequireGuest>
        }
      />
      <Route
        path="/"
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route
          path="/users"
          handle={{
            breadcrumb: () => <span>لیست کاربران</span>,
          }}
        >
          <Route index element={<Users />} />
          <Route path="create" element={<Users />} />
          <Route
            path=":userId"
            element={<EditUser />}
            handle={{
              breadcrumb: () => <span>ویرایش کاربر</span>,
            }}
          />
        </Route>
      </Route>
    </Route>,
  ),
);

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
