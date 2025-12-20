import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import { API_BASE_URL } from "../config";
import PageLoader from "../components/PageLoader";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleAuth = async () => {
      // 1. Get Token from URL
      const token = searchParams.get("token");
      
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // 2. Fetch User Profile immediately to check Admin status
        const userResponse = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { 
            "Authorization": `Bearer ${token}` 
          }
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();

          // 3. Store Token & User in Zustand
          // We manually construct the object expected by your store
          login({ 
            access_token: token, 
            token_type: "bearer", 
            user: userData 
          });

          // 4. Retrieve the intended destination (saved before Google redirect)
          const redirectPath = localStorage.getItem('redirectAfterLogin') || "/";
          localStorage.removeItem('redirectAfterLogin'); // Clean up

          // 5. SMART REDIRECT LOGIC
          if (userData.is_admin) {
            navigate("/admin", { replace: true });
          } else {
            navigate(redirectPath, { replace: true });
          }
          
        } else {
          setError("Failed to verify user profile.");
          setTimeout(() => navigate("/login"), 3000);
        }

      } catch (err) {
        console.error(err);
        setError("Authentication error occurred.");
        setTimeout(() => navigate("/login"), 3000);
      }
    };

    handleAuth();
  }, [searchParams, navigate, login]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400">
        {error} Redirecting...
      </div>
    );
  }

  return <PageLoader />;
};

export default AuthSuccess;