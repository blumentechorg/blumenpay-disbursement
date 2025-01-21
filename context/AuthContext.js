"use client";

import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "@/lib/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user info, including role and permissions
  const [loading, setLoading] = useState(true); // Handles loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = Cookies.get("authToken");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
      setLoading(false);
    } else if (token) {
      verifyUser(token);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyUser = async (token) => {
    try {
      const response = await axios.get("/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = response.data.user; // Include `role` and `permissions` from the backend
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Verification failed:", error.message);
      Cookies.remove("authToken");
      localStorage.removeItem("user");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    Cookies.set("authToken", token, { expires: 7 });
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("user");
    setUser(null);
  };

  const hasPermission = (page) => {
    if (user?.role === "super-admin") return true; // Full access for Super Admin
    return user?.permissions?.[page] || false; // Check permissions for Admin
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, hasPermission }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
