import { create } from 'zustand';
import { API_BASE_URL } from '../config.js';

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  // Action: Check if logged in on load
  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const profile = await res.json();
          // Set user with token AND profile data
          set({ user: { token, ...profile }, loading: false });
          return;
        }
      } catch (err) {
        console.error(err);
      }
    }
    // If failed
    localStorage.removeItem("token");
    set({ user: null, loading: false });
  },

  // Action: Login
  login: async (loginResponse) => {
    const token = loginResponse.access_token || loginResponse.token;
    localStorage.setItem("token", token);

    // Fetch full profile immediately
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const profile = await res.json();
      
      // Update State
      set({ user: { token, ...profile } });
    } catch (err) {
      console.error("Login profile fetch failed");
    }
  },

  refreshUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const profile = await res.json();
        // Merge new profile data (like updated credits) into existing user state
        set({ user: { token, ...profile } });
      }
    } catch (err) {
      console.error("Failed to refresh user profile", err);
    }
  },

  // Action: Logout
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
    window.location.href = "/";
  }
}));

export default useAuthStore;