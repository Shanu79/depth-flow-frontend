// src/components/RequireAdmin.jsx
import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/authStore";

export default function RequireAdmin({ children }) {
  const user = useAuthStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!user.is_admin) {
    return <Navigate to="/" replace />;
  }

  return children;
}