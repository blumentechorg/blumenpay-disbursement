"use client";

import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "../lib/axiosInstance"; // Ensure you have an axios instance setup

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores user info
  const [loading, setLoading] = useState(true); // Handles loading state

  // Load user info from cookie on initial render
  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      verifyUser(token); // Verify token and fetch user info
    } else {
      setLoading(false); // Skip if no token
    }
  }, []);

  // Verify user token and fetch user info
  const verifyUser = async (token) => {
    try {
      const response = await axios.get("/verify", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user); // Assuming API returns user info
    } catch (error) {
      console.error("Verification failed:", error.message);
      Cookies.remove("authToken");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Login user and set context
  const login = (userData) => {
    setUser(userData);
  };

  // Logout user
  const logout = () => {
    Cookies.remove("authToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
