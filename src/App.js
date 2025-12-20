import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrolltoTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";

// --- PAGES ---
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Workspace from "./pages/Workspace";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import PricingPage from "./pages/PricingPage";
import GalleryPage from "./pages/GalleryPage";
import AuthSuccess from "./pages/AuthSuccess";
import PaymentPage from "./pages/PaymentPage";

// --- AUTH & SECURITY ---
import useAuthStore from "./stores/authStore";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin"; // <--- Import the new component

// --- ADMIN ---
import AdminLayout from "./components/admin/AdminLayout";
// Assuming your Users file is located at admin/pages/Users.jsx based on previous chat
import Users from "./components/admin/User";

function App() {
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  // Helper to hide Public Navbar/Footer on Admin pages
  const isAdminRoute = location.pathname.startsWith("/admin");

  // --- Page Loader Logic ---
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  // --- Initial Auth Check ---
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const redirectPath = location.state?.from?.pathname || "/";

  return (
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-purple-500/30">
      
      {/* Global Page Loader */}
      {isLoading && <PageLoader />}

      {/* Only show Public Navbar if NOT on Admin pages */}
      {!isAdminRoute && <Navbar />}
      
      <ScrolltoTop />

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/pricing" element={<PricingPage />} />

        {/* ================= AUTH ROUTES ================= */}
        <Route
          path="/login"
          element={
            user ? <Navigate to={redirectPath} replace /> : <LoginPage />
          }
        />

        {/* ================= USER PROTECTED ================= */}
        <Route
          path="/workspace"
          element={
            <RequireAuth>
              <Workspace />
            </RequireAuth>
          }
        />

        <Route
          path="/payment"
          element={
            <RequireAuth>
              <PaymentPage />
            </RequireAuth>
          }
        />

        {/* ================= ADMIN PROTECTED ================= */}
        {/* This wraps the AdminLayout in the security check. 
            The Layout then renders the <Outlet/> where "users" will appear.
        */}
        <Route
          path="/admin"
          element={
            <RequireAdmin>
              <AdminLayout />
            </RequireAdmin>
          }
        >
          {/* Default redirect /admin -> /admin/users */}
          <Route index element={<Navigate to="users" replace />} />
          
          {/* Matches /admin/users */}
          <Route path="users" element={<Users />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Only show Footer if NOT on Admin pages */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;