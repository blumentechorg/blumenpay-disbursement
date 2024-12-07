"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg font-medium">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="flex-none border-r min-h-screen sticky top-0 lg:block hidden">
        <Sidebar user={user} logout={logout} />
      </div>
      <div className="flex-1 flex flex-col min-h-screen">
        <div className="sticky top-0 z-10">
          <Navbar user={user} logout={logout} />
        </div>
        <div className="flex-1 overflow-y-auto px-4 pt-10 bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
