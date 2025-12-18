import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2 } from "lucide-react";

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Get the token from the URL (?token=xyz...)
    const token = searchParams.get("token");

    if (token) {
      // 2. Save it to LocalStorage (The "Bank Vault")
      localStorage.setItem("token", token);
      
      // 3. Force a quick reload to ensure all states update
      // (Optional, but safer for auth state)
      window.location.href = "/workspace"; 
    } else {
      // If something went wrong, go back to login
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
      <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
      <h2 className="text-xl font-semibold">Finalizing Login...</h2>
    </div>
  );
};

export default AuthSuccess;