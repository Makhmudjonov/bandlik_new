import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      const access = localStorage.getItem("accessToken");
      const refresh = localStorage.getItem("refreshToken");

      if (!access && !refresh) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        // Access token bilan tekshir
        await axios.get("/api/auth/test/", {
          headers: { Authorization: `Bearer ${access}` },
        });
        setIsAuthenticated(true);
      } catch (err) {
        if (refresh) {
          // Access token expired bo‘lsa, refresh token bilan yangilash
          try {
            const response = await axios.post("/api/token/refresh/", { refresh });
            localStorage.setItem("accessToken", response.data.access);
            setIsAuthenticated(true);
          } catch (refreshErr) {
            console.error("Refresh token xato:", refreshErr);
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return children;
}
