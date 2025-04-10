"use client";

import { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "@/lib/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // User info with merged permission flags
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const token = Cookies.get("accessToken");

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
      const response = await axios.get("Identity/RefreshToken", {
        headers: { Authorization: `Bearer ${token}` },
      });
      let userData = response.data.user; // Extract the user object
      // Merge permissions from the first workplace into the user object (if available)
      if (userData.workplaces && userData.workplaces.length > 0) {
        const workplace = userData.workplaces[0];
        userData = { ...userData, ...workplace };
      }
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.error("Verification failed:", error.message);
      Cookies.remove("accessToken");
      localStorage.removeItem("user");
      setUser(null);
      // Optional: Redirect to login if verification fails immediately
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }
    } finally {
      setLoading(false);
    }
  };

  const login = (userData, token) => {
    Cookies.set("accessToken", token, { expires: 7 });
    // Merge permissions from the first workplace if available
    if (userData.workplaces && userData.workplaces.length > 0) {
      const workplace = userData.workplaces[0];
      userData = { ...userData, ...workplace };
    }
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("user");
    setUser(null);
    // Redirect to login after logout
    if (typeof window !== "undefined") {
      window.location.href = "/auth/login";
    }
  };

  // Helper function: returns true if the user has the given permission
  const hasPermission = (permissionKey) => {
    if (user?.role === "SuperAdmin") return true;
    return !!user?.[permissionKey];
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
