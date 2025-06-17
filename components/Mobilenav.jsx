"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

import Overview from "@/public/icons/sidebar/overview";
import Transactions from "@/public/icons/sidebar/transactions";
import Disbursements from "@/public/icons/sidebar/disbursements";
import Providers from "@/public/icons/sidebar/providers";
import Tickets from "@/public/icons/sidebar/tickets";
import logo from "@/public/icons/header/logo.png";
import { FaTimes } from "react-icons/fa";
import Admin from "@/public/icons/sidebar/admin";
import Logout from "@/public/icons/sidebar/logout";
import LogoutModal from "./LogoutModal";
import Image from "next/image";

export default function MobileNav() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [transactionsDropdownOpen, setTransactionsDropdownOpen] =
    useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const panelRef = useRef(null);

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

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        isMenuOpen &&
        panelRef.current &&
        !panelRef.current.contains(e.target)
      ) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

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

  const permissionMapping = {
    Admin: "teamMgt",
    Overview: "transactionMgt",
    Transactions: "transactionMgt",
    Disbursements: "settlementnMgt",
    Businesses: "appMgt",
    "Complain Tickets": "customerMgt",
  };

  const filteredMenus =
    user?.role === "SuperAdmin"
      ? menus
      : menus.filter((menu) => {
          const key = permissionMapping[menu.name];
          return user && user[key];
        });

  return (
    <div className="relative lg:hidden">
      <button
        onClick={toggleMenu}
        className="text-gray-800 rounded-md focus:outline-none"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />

        {/* Slide-in Panel */}
        <nav
          ref={panelRef}
          className={`fixed top-0 left-0 z-50 h-full w-72 bg-blue-950 text-white shadow-lg
    transform transition-transform duration-300 ease-in-out
    ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
    flex flex-col
  `}
        >
          {/* Top Branding */}
          <div className="px-6 py-5 border-b border-gray-700 flex items-center justify-between bg-white">
            <Image src={logo} width={130} height={130} alt="logo" />
            <button onClick={toggleMenu} className="text-black">
              <FaTimes />
            </button>
          </div>

          {/* Scrollable Menu */}
          <div className="flex-1 overflow-y-auto px-6 py-10 ">
            <ul className="flex flex-col gap-5 space-y-7">
              {filteredMenus.map((menu, idx) => {
                if (menu.name === "Transactions") {
                  return (
                    <li key={idx}>
                      <button
                        onClick={toggleTransactionsDropdown}
                        className="flex items-center space-x-3 text-base font-medium w-full text-left"
                      >
                        {menu.icon}
                        <span>{menu.name}</span>
                      </button>
                      {transactionsDropdownOpen && (
                        <ul className="ml-10 mt-2 flex flex-col gap-2 text-sm text-gray-300">
                          <li>
                            <Link
                              href="/Explore/transactions/all"
                              onClick={toggleMenu}
                              className="hover:underline"
                            >
                              All Transactions
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/Explore/transactions/kadElectric"
                              onClick={toggleMenu}
                              className="hover:underline"
                            >
                              kadElectric
                            </Link>
                          </li>
                        </ul>
                      )}
                    </li>
                  );
                }

                return (
                  <li key={idx}>
                    <Link
                      href={menu.href}
                      onClick={toggleMenu}
                      className="flex items-center space-x-3 text-base font-medium hover:underline"
                    >
                      <span className="text-white">{menu.icon}</span>
                      <span>{menu.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sticky Footer */}
          <div className="px-6 py-4 border-t border-gray-700">
            <button
              onClick={openModal}
              className="flex items-center space-x-3 text-base font-medium text-red-400 hover:underline"
            >
              <Logout />
              <span>Log Out</span>
            </button>
          </div>

          <LogoutModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onLogout={handleLogout}
          />
        </nav>
      </div>
    </div>
  );
}
