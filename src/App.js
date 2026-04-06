import React, { useEffect, Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// --- AUTH & SECURITY ---
import useAuthStore from "./stores/authStore";
import RequireAuth from "./components/RequireAuth";
import RequireAdmin from "./components/RequireAdmin";

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrolltoTop from "./components/ScrollToTop";
import PageLoader from "./components/PageLoader";
import AdminLayout from "./components/admin/AdminLayout";
import DepthflowApi from "./pages/DepthflowApi";

// --- PAGES ---
const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const Workspace = lazy(() => import("./pages/Workspace"));
const DepthFlowWorkspace = lazy(() => import("./pages/DepthFlowWorkspace"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/Terms"));
const PricingPage = lazy(() => import("./pages/PricingPage"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const AuthSuccess = lazy(() => import("./pages/AuthSuccess"));
const PaymentPage = lazy(() => import("./pages/PaymentPage"));
const BillingPage = lazy(() => import("./pages/BillingPage"));
const UserHistoryPage = lazy(() => import("./pages/UserHistoryPage"));

// NEW: Maintenance Page
const MaintenancePage = lazy(() => import("./pages/MaintenancePage"));

// --- DEPTHFLOW API COMPONENTS ---
const ApiDashboard = lazy(() => import("./components/depthflow-api/Dashboard"));
const ApiKeys = lazy(() => import("./components/depthflow-api/ApiKeys"));
const ApiBilling = lazy(() => import("./components/depthflow-api/ApiBilling"));
const ApiLogs = lazy(() => import("./components/depthflow-api/ApiLogs"));
const ApiPricing = lazy(() => import("./components/depthflow-api/ApiPricing"));
const ApiDocumentation = lazy(
  () => import("./components/depthflow-api/Documentation"),
);

// --- ADMIN ---
const Users = lazy(() => import("./components/admin/User"));

// ==========================================
// MAINTENANCE MODE TOGGLE
// Set to true to enable maintenance mode. 
// (Tip: You can change this to use import.meta.env.VITE_MAINTENANCE_MODE === "true" for easier deployment toggling)
const MAINTENANCE_MODE = true; 
// ==========================================

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

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

  // --- PREVENT INFINITE LOGIN LOOPS ---
  const redirectPath =
    location.state?.from?.pathname === "/login"
      ? "/"
      : location.state?.from?.pathname || "/";

// --- MAINTENANCE LOGIC ---
  // If the user isn't logged in, user is null, so isAdmin becomes false automatically.
  const isAdmin = user?.role === "admin"; 

  // Show maintenance page if maintenance mode is ON and the user is NOT an admin.
  const showMaintenancePage = MAINTENANCE_MODE && !isAdmin;

  if (showMaintenancePage) {
    return (
      <div className="bg-[#050511] min-h-screen font-sans selection:bg-purple-500/30">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Must leave these routes open so admins can actually log in! */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth-success" element={<AuthSuccess />} />
            
            {/* Everyone else (guests and regular users) sees the Maintenance page */}
            <Route path="*" element={<MaintenancePage />} />
          </Routes>
        </Suspense>
      </div>
    );
  }

  // --- STANDARD APP RENDER (Maintenance is OFF or user IS an admin) ---
  return (
    <div className="bg-[#050511] min-h-screen font-sans selection:bg-purple-500/30">
      <Navbar />

      <ScrolltoTop />

      <Suspense fallback={<PageLoader />}>
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
          <Route path="/billing" element={<BillingPage />} />

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
              <RequireAuth>
                <DepthFlowWorkspace />
              </RequireAuth>
            }
          />

          {/* ================= SETTINGS ROUTES ================= */}
          <Route
            path="/depthflow-api"
            element={
              <RequireAuth>
                <DepthflowApi />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ApiDashboard />} />
            <Route path="api-keys" element={<ApiKeys />} />
            <Route path="logs" element={<ApiLogs />} />
            <Route path="documentation" element={<ApiDocumentation />} />
            <Route path="pricing" element={<ApiPricing />} />
            <Route path="billing" element={<ApiBilling />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          <Route
            path="/payment"
            element={
              <RequireAuth>
                <PaymentPage />
              </RequireAuth>
            }
          />
          <Route path="/history" element={<UserHistoryPage />} />

          {/* ================= ADMIN PROTECTED ================= */}
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route index element={<Navigate to="/admin/users" replace />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route
            path="*"
            element={
              <div className="pt-32 text-white text-center text-2xl">
                404 ERROR: React Router cannot find: {window.location.pathname}
              </div>
            }
          />
        </Routes>
      </Suspense>

      {/* --- HIDE FOOTER ON ADMIN ROUTES --- */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;