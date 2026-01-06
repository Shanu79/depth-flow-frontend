import { create } from 'zustand';
import { API_BASE_URL } from '../config.js';

const useAuthStore = create((set, get) => ({
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

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const profile = await res.json();
      
      // --- DEBUG: Verify Structure ---
      console.log("AuthStore Login: Setting User:", profile);
      
      // Ensure we are not nesting it like { user: { user: ... } }
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
        console.log("AuthStore: Profile Loaded from API:", profile);
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
  },

  updateCredits: (newCredits) => set((state) => ({
    user: state.user ? { ...state.user, credits: newCredits } : null
  })),

  // --- NEW: Global Sync Action ---
  syncSubscription: async () => {
    const { user } = get();
    
    // DEBUG LOGS (Check console to see these)
    console.log("Global Sync Initiated. User:", user ? user.email : "No User");
    
    if (!user || !user.subscription_id) {
      console.warn("Global Sync Aborted: No Subscription ID present.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/payments/sync-subscription`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        
        // Update state ONLY if things changed to avoid infinite loops
        const currentUser = get().user;
        if (currentUser.subscription_status !== data.synced_status || currentUser.plan !== data.synced_plan) {
            set((state) => ({
              user: {
                ...state.user,
                subscription_status: data.synced_status,
                plan: data.synced_plan
              }
            }));
            console.log("Global Sync Success: Updated to", data.synced_status);
        } else {
            console.log("Global Sync: Data already up to date.");
        }
      } else {
        console.error("Global Sync Error:", await response.text());
      }
    } catch (error) {
      console.error("Global Sync Failed:", error);
    }
  }
}));

export default useAuthStore;