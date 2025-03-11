"use client";
// pages/index.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/auth/login"); // Redirect to the login page
  }, [router]);

  return null; // Don't render anything on this page since it redirects
};

export default HomePage;
