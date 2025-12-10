import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './components/Login';
import HomePage from './components/HomePage';
import Workspace from './components/Workspace';
import { useState } from 'react';

// --- Main App Component ---

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);
  return (
      <div className="bg-slate-950 min-h-screen font-sans selection:bg-purple-500/30">
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
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
      </Routes>
      <Footer />
      </div>
  );
}

export default App;
