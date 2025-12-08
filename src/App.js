import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './components/Login';
import HomePage from './components/HomePage';

// --- Main App Component ---

function App() {
  return (
      <div className="bg-slate-950 min-h-screen font-sans selection:bg-purple-500/30">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
  );
}

export default App;
