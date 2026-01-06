import { create } from 'zustand';
import { API_BASE_URL } from '../config.js';

const useAuthStore = create((set, get) => ({
  user: null,
  loading: true,

  // --- 1. CHECK AUTH ON LOAD ---
  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch(`${API_BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const profile = await res.json();
          set({ user: { token, ...profile }, loading: false });
          return;
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    }
    // Fallback: Clear invalid token
    localStorage.removeItem("token");
    set({ user: null, loading: false });
  },

  // --- 2. LOGIN ---
  login: async (loginResponse) => {
    const token = loginResponse.access_token || loginResponse.token;
    localStorage.setItem("token", token);

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const profile = await res.json();
      set({ user: { token, ...profile } });
    } catch (err) {
      console.error("Failed to fetch profile after login:", err);
    }
  },

  // --- 3. REFRESH PROFILE ---
  refreshUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const profile = await res.json();
        // Preserves the token while updating profile data
        set({ user: { token, ...profile } });
      }
    } catch (err) {
      console.error("Failed to refresh user:", err);
    }
  },

  // --- 4. LOGOUT ---
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
    window.location.href = "/";
  },

  // --- 5. CREDIT UPDATE HELPER ---
  updateCredits: (newCredits) => set((state) => ({
    user: state.user ? { ...state.user, credits: newCredits } : null
  })),

  // --- 6. SYNC SUBSCRIPTION (Global) ---
  syncSubscription: async () => {
    const { user } = get();
    if (!user || !user.subscription_id) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/payments/sync-subscription`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        const currentUser = get().user;

        // Only update if state actually changed (prevents loops)
        if (
          currentUser.subscription_status !== data.synced_status || 
          currentUser.plan !== data.synced_plan
        ) {
          set((state) => ({
            user: {
              ...state.user,
              subscription_status: data.synced_status,
              plan: data.synced_plan
            }
          }));
        }
      }
    } catch (error) {
      console.error("Subscription sync failed:", error);
    }
  }
}));

export default useAuthStore;