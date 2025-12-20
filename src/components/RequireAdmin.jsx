import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import PageLoader from "./PageLoader";

const RequireAdmin = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  
  // 1. You likely have a loading state in your store. If not, add one!
  // It handles the gap between "App Load" and "Auth Check Finished"
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth); 

  const location = useLocation();

  // 2. SHOW LOADER WHILE CHECKING
  // If we are still verifying the token, don't redirect yet!
  if (isCheckingAuth) {
    return <PageLoader />;
  }

  // 3. If check is done and no user -> Login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 4. If logged in but NOT admin -> Home
  if (!user.is_admin) {
    return <Navigate to="/" replace />;
  }

  // 5. Authorized
  return children;
};

export default RequireAdmin;