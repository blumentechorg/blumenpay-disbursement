"use client";

import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("token");
    const role = Cookies.get("role");

    if (token && role) {
      setUser({ token });
      setRole(role);
    }
    setLoading(false);
  }, []);

  const login = (token, role) => {
    Cookies.set("token", token, { expires: 7 });
    Cookies.set("role", role, { expires: 7 });
    setUser({ token });
    setRole(role);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    setUser(null);
    setRole(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white flex-col">
        <div className="w-10 h-10 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-700 text-lg font-medium">
          Loading, please wait...
        </p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
