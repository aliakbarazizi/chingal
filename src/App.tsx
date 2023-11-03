import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Layout from "./layouts/Layout";
import { useUser } from "./features/auth";
import Login from "./pages/Login";
import Users from "./pages/Users";

export default function App() {
  return (
    <Routes>
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
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
    </Routes>
  );
}

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
