"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login"); // Redirect to login if user is not authenticated
    }
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Optional: Show loading spinner
  }

  return <>{children}</>; // Render protected content
}
