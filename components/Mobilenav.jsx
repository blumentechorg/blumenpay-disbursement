"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

import Overview from "@/public/icons/sidebar/overview";
import Transactions from "@/public/icons/sidebar/transactions";
import Disbursements from "@/public/icons/sidebar/disbursements";
import Providers from "@/public/icons/sidebar/providers";
import Tickets from "@/public/icons/sidebar/tickets";
import Admin from "@/public/icons/sidebar/admin";
import Logout from "@/public/icons/sidebar/logout";
import LogoutModal from "./LogoutModal";

export default function MobileNav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [transactionsDropdownOpen, setTransactionsDropdownOpen] =
    useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleTransactionsDropdown = () =>
    setTransactionsDropdownOpen((prev) => !prev);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    closeModal();
    logout();
    router.push("/");
  };

  // Define menu items (as in the sidebar)
  const menus = [
    { name: "Overview", href: "/Explore/overview/", icon: <Overview /> },
    {
      name: "Transactions",
      href: "/Explore/transactions/",
      icon: <Transactions />,
    },
    {
      name: "Disbursements",
      href: "/Explore/disbursements/",
      icon: <Disbursements />,
    },
    { name: "Businesses", href: "/Explore/businesses/", icon: <Providers /> },
    { name: "Complain Tickets", href: "/Explore/tickets/", icon: <Tickets /> },
    { name: "Admin", href: "/Explore/admin/", icon: <Admin /> },
  ];

  // Map each menu name to its permission key
  const permissionMapping = {
    Admin: "teamMgt",
    Overview: "transactionMgt",
    Transactions: "transactionMgt",
    Disbursements: "settlementnMgt",
    Businesses: "appMgt",
    "Complain Tickets": "customerMgt",
  };

  // Filter menus based on user permissions (or show all for SuperAdmin)
  const filteredMenus =
    user?.role === "SuperAdmin"
      ? menus
      : menus.filter((menu) => {
          const permissionKey = permissionMapping[menu.name];
          return user && user[permissionKey] === true;
        });

  return (
    <div className="relative lg:hidden">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="text-gray-800 rounded-md focus:outline-none"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>

      {/* Full-screen Popup Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-95 flex flex-col items-center justify-center space-y-8 text-white">
          {filteredMenus.map((menu, index) => {
            // Handle dropdown for Transactions
            if (menu.name === "Transactions") {
              return (
                <div key={index} className="w-full text-center">
                  <div
                    onClick={toggleTransactionsDropdown}
                    className="flex items-center justify-center text-2xl font-medium space-x-3 cursor-pointer"
                  >
                    <span>{menu.icon}</span>
                    <span>{menu.name}</span>
                  </div>
                  {transactionsDropdownOpen && (
                    <div className="mt-4 space-y-4">
                      <Link
                        href="/Explore/transactions/all"
                        onClick={toggleMenu}
                        className="block text-xl hover:underline"
                      >
                        All Transactions
                      </Link>
                      <Link
                        href="/Explore/transactions/kadElectric"
                        onClick={toggleMenu}
                        className="block text-xl hover:underline"
                      >
                        kadElectric
                      </Link>
                    </div>
                  )}
                </div>
              );
            } else {
              return (
                <Link
                  href={menu.href}
                  key={index}
                  onClick={toggleMenu}
                  className="flex items-center justify-center text-2xl font-medium space-x-3 cursor-pointer hover:underline"
                >
                  <span>{menu.icon}</span>
                  <span>{menu.name}</span>
                </Link>
              );
            }
          })}

          {/* Logout Button */}
          <button
            onClick={openModal}
            className="flex items-center text-2xl font-medium space-x-3 cursor-pointer hover:underline"
          >
            <span>
              <Logout />
            </span>
            <span>Log Out</span>
          </button>
          <LogoutModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onLogout={handleLogout}
          />
        </div>
      )}
    </div>
  );
}
