"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";

const DashboardLayout = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  // // Redirect if not authenticated
  // useEffect(() => {
  //   if (!loading && !user) {
  //     router.push("/");
  //   }
  // }, [user, loading, router]);

  // // Show loading state while determining auth
  // // if (loading) return <div>Loading...</div>;

  // // Prevent rendering if user is not authenticated (to avoid flicker)
  // if (!user) return null;

  return (
    <>
      <div>
        <div className="flex">
          {/* Sticky Sidebar */}
          <div className="flex-none border-r min-h-screen sticky top-0 lg:block hidden">
            <Sidebar />
          </div>
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Sticky Navbar */}
            <div className="sticky top-0 z-10 ">
              <Navbar />
            </div>
            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto px-4 pt-10 bg-gray-100 ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
