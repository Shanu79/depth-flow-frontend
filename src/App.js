import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/Login';
import HomePage from './pages/HomePage';
import Gallery from './pages/Gallery';
import Workspace from './pages/Workspace';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ScrolltoTop from './components/ScrollToTop';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import AuthSuccess from './pages/AuthSuccess';

// Import your custom hook
import { useAuth } from './hooks/useAuth';

function App() {
  // 1. Use the hook instead of local useState
  const { user, loading } = useAuth();

  // 2. Real Logout Function
  const handleLogout = async () => {
  try {
    // 1. Optional: Tell backend we are logging out (good for analytics or future cookie clearing)
    // Adjust URL if your auth router has a prefix (e.g., /auth/logout)
    await fetch("http://localhost:8000/auth/logout", { method: "GET" });
  } catch (error) {
    console.error("Logout failed", error);
  } finally {
    // 2. CRITICAL: Remove the token from LocalStorage
    localStorage.removeItem("token");
    
    // 3. Force refresh/redirect to home to clear React state
    window.location.href = "/"; 
  }
};

  // 3. Loading State (Prevents flickering)
  if (loading) {
    return (
      <div className="bg-slate-950 min-h-screen flex items-center justify-center text-white">
        <div className="animate-pulse">Loading Immensity...</div>
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen font-sans selection:bg-purple-500/30">
      
      {/* Pass the real 'user' object to Navbar */}
      <Navbar user={user} onLogout={handleLogout} />
      
      <ScrolltoTop />
      
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/auth-success" element={<AuthSuccess />} />

        <Route path="/workspace" element={
          user ? (
            /* IF LOGGED IN: SHOW WORKSPACE */
            <Workspace />
          ) : (
            /* IF LOGGED OUT: REDIRECT TO LOGIN */
            <Navigate to="/login" replace />
          )
        } />

        <Route path="/login" element={
          user ? (
            /* IF ALREADY LOGGED IN: REDIRECT TO WORKSPACE */
            <Navigate to="/workspace" replace />
          ) : (
            /* SHOW LOGIN PAGE */
            <LoginPage />
          )
        } />
         
        <Route path="/about" element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/terms' element={<Terms />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
      
      <Footer />
    </div>
  );
}

export default App;