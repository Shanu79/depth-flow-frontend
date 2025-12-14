import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './components/Login';
import HomePage from './components/HomePage';
import Workspace from './components/Workspace';
import { useState } from 'react';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import ScrolltoTop from './components/ScrollToTop';
import PrivacyPolicy from './components/PrivacyPolicy';
import Terms from './components/Terms';

// --- Main App Component ---

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  return (
      <div className="bg-slate-950 min-h-screen font-sans selection:bg-purple-500/30">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <ScrolltoTop />
        <Routes>
        <Route path="/" element={
          isLoggedIn ? (
            /* IF LOGGED IN: SHOW WORKSPACE */
            <Workspace />
          ) : (
            /* IF LOGGED OUT: SHOW LANDING PAGE */
            <HomePage />
          )
        } />
        
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/privacy' element={<PrivacyPolicy/>}/>
        <Route path='/terms' element={<Terms/>}/>
      </Routes>
      <Footer />
      </div>
  );
}

export default App;
