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
import DepthFlowWorkspace from "./pages/DepthFlowWorkspace"; // <-- Add this
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import PricingPage from "./pages/PricingPage";
import GalleryPage from "./pages/GalleryPage";
import AuthSuccess from "./pages/AuthSuccess";
import PaymentPage from "./pages/PaymentPage";
import BillingPage from "./pages/BillingPage";
import UserHistoryPage from "./pages/UserHistoryPage";

// --- AUTH & SECURITY ---
import useAuthStore from "./stores/authStore";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";

// --- ADMIN ---
import AdminLayout from "./components/admin/AdminLayout";
import Users from "./components/admin/User";

import ApiKeysPage from './pages/ApiKeysPage';

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const isAdminRoute = location.pathname.startsWith("/admin");

  // --- FIX: USE SELECTORS FOR REACTIVITY ---
  // This ensures App re-renders when 'user' updates
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const syncSubscription = useAuthStore((state) => state.syncSubscription);

  // 1. INITIAL AUTH CHECK
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 2. GLOBAL SUBSCRIPTION SYNC
  useEffect(() => {

    if (user?.subscription_id) {
      syncSubscription();
    }
  }, [user, syncSubscription]);

  // 3. PAGE LOADER LOGIC
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  const redirectPath = location.state?.from?.pathname || "/";

  return (
    <div className="bg-[#050511] min-h-screen font-sans selection:bg-purple-500/30">

      {/* Global Page Loader */}
      {isLoading && <PageLoader />}

      {<Navbar />}

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
        <Route path='/billing' element={<BillingPage />} />

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
          path="/pro-workspace"
          element={
            // <RequireAuth>
            <DepthFlowWorkspace />
            // </RequireAuth>
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
        <Route path="/history" element={<UserHistoryPage />} />

        <Route path="/api-keys" element={
          <RequireAuth>
            <ApiKeysPage />
          </RequireAuth>
        } />

        {/* ================= ADMIN PROTECTED ================= */}
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

      {/* --- HIDE FOOTER ON ADMIN ROUTES --- */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;