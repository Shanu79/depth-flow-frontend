import React, { useEffect, useState } from 'react'; // 1. Import useEffect
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Workspace from './pages/Workspace';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrolltoTop from './components/ScrollToTop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import AuthSuccess from './pages/AuthSuccess';
import PaymentPage from './pages/PaymentPage';

import useAuthStore from './stores/authStore';
import RequireAuth from './components/RequireAuth';
import PricingPage from './pages/PricingPage';
import GalleryPage from './pages/GalleryPage';
import PageLoader from './components/PageLoader';
import AdminLayout from "./AdminLayout";
function App() {
  // 2. Get checkAuth from the store
  const user = useAuthStore((state) => state.user);
  const checkAuth = useAuthStore((state) => state.checkAuth);
  
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // 1. Start Loading on route change
    setIsLoading(true);

    // 2. Stop Loading after a small delay (simulates smooth transition)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800); // Adjust time: 500ms = fast, 1000ms = slow

    // 3. Cleanup timer
    return () => clearTimeout(timer);
  }, [location.pathname]); // Trigger whenever path changes

  // 3. On component mount, check authentication status
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const redirectPath = location.state?.from?.pathname || "/";

  return (
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-purple-500/30">

      {isLoading && <PageLoader />}
      
      <Navbar />
      
      <ScrolltoTop />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-success" element={<AuthSuccess />} />

        {/* --- PROTECTED ROUTES --- */}
        <Route path="/workspace" element={
          <RequireAuth>
            <Workspace />
          </RequireAuth>
        } />

        <Route
          path="/admin"
          element={
            
              <AdminLayout />
           
          }
        ></Route>

        <Route path="/payment" element={
          <RequireAuth>
             <PaymentPage />
          </RequireAuth>
        } />

        {/* --- LOGIN ROUTE --- */}
        <Route path="/login" element={
          user ? <Navigate to={redirectPath} replace /> : <LoginPage />
        } />
         
        <Route path="/about" element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/terms' element={<Terms />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path='/pricing' element={<PricingPage />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;