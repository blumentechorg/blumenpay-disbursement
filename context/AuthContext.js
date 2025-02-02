// "use client";

// import { createContext, useState, useContext, useEffect } from "react";
// import Cookies from "js-cookie";
// import axios from "@/lib/axiosInstance";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // Stores user info, including role and permissions
//   const [loading, setLoading] = useState(true); // Handles loading state

//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const token = Cookies.get("accessToken");

//     if (token && storedUser) {
//       setUser(JSON.parse(storedUser));
//       setLoading(false);
//     } else if (token) {
//       verifyUser(token);
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const verifyUser = async (token) => {
//     try {
//       const response = await axios.get("/verify", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const userData = response.data.user; // Include `role` and `permissions` from the backend
//       setUser({ ...userData, managementRoles: userData.managementRoles || [] });
//       localStorage.setItem("user", JSON.stringify(userData));
//     } catch (error) {
//       console.error("Verification failed:", error.message);
//       Cookies.remove("accessToken");
//       localStorage.removeItem("user");
//       setUser(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = (userData, token) => {
//     Cookies.set("accessToken", token, { expires: 7 });
//     localStorage.setItem("user", JSON.stringify(userData));
//     setUser(userData);
//   };

//   const logout = () => {
//     Cookies.remove("accessToken");
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   const hasPermission = (page) => {
//     if (user?.role === "SuperAdmin") return true; // Full access for Super Admin
//     return user?.permissions?.[page] || false; // Check permissions for Admin
//   };

//   return (
//     <AuthContext.Provider
//       value={{ user, login, logout, loading, hasPermission }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.js

// "use client";

// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Example: Simulate fetching user data from storage
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) setUser(storedUser);
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

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
      const response = await axios.get("/verify", {
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
