import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../features/auth";

export function RequireGuest({ children }: { children: JSX.Element }) {
  const user = useUser();
  const location = useLocation();

  if (user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const user = useUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
