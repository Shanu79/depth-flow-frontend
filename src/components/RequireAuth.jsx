import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const RequireAuth = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  const loading = useAuthStore((state) => state.loading);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#050511]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login, but save the current location they were trying to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;