// If in production (Vercel), use the proxy we set in vercel.json
// If in development (local), use your local python/express server
export const API_BASE_URL = process.env.NODE_ENV === "production" 
  ? "/api" 
  : "http://localhost:8000";