import { useState, useEffect } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            // 1. Retrieve the token we saved in AuthSuccess.jsx
            const token = localStorage.getItem("token");
            
            // If no token exists, stop loading and return (user remains null)
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                // 2. Send the token to the backend
                const res = await fetch("http://localhost:8000/auth/me", {
                    method: "GET",
                    headers: { 
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}` // <--- THIS IS THE CRITICAL FIX
                    }
                });
                
                if (res.ok) {
                    const data = await res.json();
                    setUser(data);
                } else {
                    // If token is invalid (expired), clear it
                    console.warn("Token expired or invalid");
                    localStorage.removeItem("token");
                    setUser(null);
                }
            } catch (err) {
                console.error("Auth check failed", err);
                localStorage.removeItem("token");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkLogin();
    }, []);

    return { user, loading };
};