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

// --- ADMIN ---
const Users = lazy(() => import("./components/admin/User"));

const DashboardPage = lazy(() => import("./components/depthflow-api/Dashboard"));
const ApiKeysPage = lazy(() => import("./components/depthflow-api/ApiKeys"));
const ApiLogs = lazy(() => import("./components/depthflow-api/ApiLogs"));

function App() {
  const location = useLocation();
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

  // --- PREVENT INFINITE LOGIN LOOPS ---
  const redirectPath = location.state?.from?.pathname === "/login" 
    ? "/" 
    : (location.state?.from?.pathname || "/");

  return (
    <div className="bg-[#050511] min-h-screen font-sans selection:bg-purple-500/30">
      {<Navbar />}

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

          {/* ================= SETTINGS ROUTES ================= */}
          <Route
            path="/depthflow-api"
            element={
              <RequireAuth>
                <DepthflowApi />
              </RequireAuth>
            }
          >
            <Route index element={<Navigate to="/depthflow-api/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="api-keys" element={<ApiKeysPage />} />
            <Route path="logs" element={<ApiLogs />} />
            <Route path="documentation" element={<div className="p-8 flex-1 text-gray-400">Documentation Component (Coming Soon)</div>} />
            <Route path="pricing" element={<div className="p-8 flex-1 text-gray-400">Pricing Plans Component (Coming Soon)</div>} />
            <Route path="billing" element={<div className="p-8 flex-1 text-gray-400">Billing Component (Coming Soon)</div>} />
          </Route>

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
            {/* Default redirect /admin -> /admin/users */}
            <Route index element={<Navigate to="/admin/users" replace />} />

            {/* Matches /admin/users */}
            <Route path="users" element={<Users />} />
          </Route>

          {/* ================= FALLBACK ================= */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {/* --- HIDE FOOTER ON ADMIN ROUTES --- */}
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;