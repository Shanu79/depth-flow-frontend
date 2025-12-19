import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "../stores/authStore";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      // 1. Get the token from the URL (sent by backend)
      const token = searchParams.get("token");

      if (token) {
        // 2. Login using the store (fetches profile, sets user)
        // We pass it as an object because your store expects { access_token: ... } or { token: ... }
        await login({ access_token: token });

        // 3. RETRIEVE the saved path (defaults to "/" -> Home)
        const redirectPath = localStorage.getItem('redirectAfterLogin') || "/";
        
        // 4. Clean up storage
        localStorage.removeItem('redirectAfterLogin');

        // 5. Navigate to Home (or the smart redirect path)
        navigate(redirectPath, { replace: true });
      } else {
        // If failed, go back to login
        navigate("/login");
      }
    };

    handleGoogleCallback();
  }, [searchParams, login, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
      <div className="animate-pulse">Finalizing Login...</div>
    </div>
  );
};

export default AuthSuccess;