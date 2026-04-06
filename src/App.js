import { useEffect, useState, Suspense, lazy } from "react";
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
import WhatsNewModal from "./components/WhatsNewModal";

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

// --- DEPTHFLOW API COMPONENTS ---
const ApiDashboard = lazy(() => import("./components/depthflow-api/Dashboard"));
const ApiKeys = lazy(() => import("./components/depthflow-api/ApiKeys"));
const ApiBilling = lazy(() => import("./components/depthflow-api/ApiBilling"));
const ApiLogs = lazy(() => import("./components/depthflow-api/ApiLogs"));
const ApiPricing = lazy(() => import("./components/depthflow-api/ApiPricing"));
const ApiDocumentation = lazy(
  () => import("./components/depthflow-api/Documentation"),
);
const ApiSupport = lazy(() => import("./components/depthflow-api/ApiSupportContact"));

// --- ADMIN ---
const Users = lazy(() => import("./components/admin/User"));

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // --- FIX: USE SELECTORS FOR REACTIVITY ---
  // This ensures App re-renders when 'user' updates
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  const syncSubscription = useAuthStore((state) => state.syncSubscription);

  // 2. MODAL STATE
  const [isWhatsNewOpen, setIsWhatsNewOpen] = useState(false);

  // 3. FIRST-TIME VISITOR CHECK
  useEffect(() => {
    // Check if the user has seen the 2.0 update before
    const hasSeenUpdate = localStorage.getItem("hasSeenWhatsNew_v2");

    if (!hasSeenUpdate) {
      // If not, open the modal and save a flag in their browser
      setIsWhatsNewOpen(true);
      localStorage.setItem("hasSeenWhatsNew_v2", "true");
    }
  }, []);

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

  return (
    // 1. ADDED: 'relative' and 'overflow-x-hidden' to the main wrapper
    <div className="relative bg-[#050511] min-h-screen font-sans selection:bg-purple-500/30 overflow-x-hidden">
      {/* 4. RENDER MODAL AT THE TOP LEVEL */}
      <WhatsNewModal
        isOpen={isWhatsNewOpen}
        onClose={() => setIsWhatsNewOpen(false)}
      />

      {/* 5. PASS OPEN FUNCTION TO NAVBAR */}
      <Navbar onOpenWhatsNew={() => setIsWhatsNewOpen(true)} />

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
            path="/workspace-2_0"
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
            {/* 1. Default redirect when hitting exactly /depthflow-api */}
            <Route index element={<Navigate to="dashboard" replace />} />

            {/* 2. These nested routes are injected into the <Outlet /> */}
            <Route path="dashboard" element={<ApiDashboard />} />
            <Route path="api-keys" element={<ApiKeys />} />
            <Route path="logs" element={<ApiLogs />} />
            <Route path="documentation" element={<ApiDocumentation />} />
            <Route path="pricing" element={<ApiPricing />} />
            <Route path="billing" element={<ApiBilling />} />
            <Route path="support-contact" element={<ApiSupport />} />

            {/* 3. Catch-all for invalid sub-routes (e.g., /depthflow-api/typo) */}
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
            {/* Default redirect /admin -> /admin/users */}
            <Route index element={<Navigate to="/admin/users" replace />} />

            {/* Matches /admin/users */}
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
