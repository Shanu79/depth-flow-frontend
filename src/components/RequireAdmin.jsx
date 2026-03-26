import { Navigate, useLocation } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import PageLoader from "./PageLoader";

const RequireAdmin = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  
  // Use the correct 'loading' state from authStore
  const isCheckingAuth = useAuthStore((state) => state.loading); 

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