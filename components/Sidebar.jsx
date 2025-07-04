"use client";

import Image from "next/image";
import Title from "@/public/icons/header/title";
import title from "@/public/images/title.png";
import logo from "@/public/icons/header/logo.png";
import Caretupdown from "@/public/icons/sidebar/caretupdown";
import Overview from "@/public/icons/sidebar/overview";
import Transactions from "@/public/icons/sidebar/transactions";
import Disbursements from "@/public/icons/sidebar/disbursements";
import Tickets from "@/public/icons/sidebar/tickets";
import Admin from "@/public/icons/sidebar/admin";
import Providers from "@/public/icons/sidebar/providers";
import Logout from "@/public/icons/sidebar/logout";
import LogoutModal from "./LogoutModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  // State to track if Transactions dropdown is open
  const [transactionsDropdownOpen, setTransactionsDropdownOpen] =
    useState(true);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    closeModal();
    logout();
    router.push("/");
  };

  // Define the sidebar menu items
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
    {
      name: "Businesses",
      href: "/Explore/businesses/",
      icon: <Providers />,
    },
    { name: "Complain Tickets", href: "/Explore/tickets/", icon: <Tickets /> },
    { name: "Admin", href: "/Explore/admin/", icon: <Admin /> },
  ];

  // Map each menu to its corresponding permission key in the merged user object.
  const permissionMapping = {
    Admin: "teamMgt",
    Overview: "transactionMgt",
    Transactions: "transactionMgt",
    Disbursements: "settlementnMgt",
    Businesses: "appMgt",
    "Complain Tickets": "customerMgt",
  };

  // If the user is a SuperAdmin, show all menus. Otherwise, filter based on permissions.
  const filteredMenus =
    user?.role === "SuperAdmin"
      ? menus
      : menus.filter((menu) => {
          const permissionKey = permissionMapping[menu.name];
          return user && user[permissionKey] === true;
        });

  return (
    <div className="h-screen w-64 bg-white text-black flex flex-col sticky top-0">
      {/* Logo and Title */}
      <div className="flex items-center justify-between h-20 border-b border-gray-300 px-2">
        <div className="flex space-x-2 pl-2">
          {/* <Logo />
          <Title /> */}
          <Image src={logo} width={130} height={130} alt="logo" />
        </div>
        <div>
          <Caretupdown />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-1 px-4">
          {filteredMenus.map((menu, index) => {
            if (menu.name === "Transactions") {
              return (
                <li key={index}>
                  {/* Toggle dropdown on click */}
                  <div
                    onClick={() => setTransactionsDropdownOpen((prev) => !prev)}
                    className="flex items-center px-4 py-2 text-sm rounded hover:bg-[#F5F7FA] hover:font-bold hover:text-gray-900 cursor-pointer"
                  >
                    <span className="text-lg mr-1.5">{menu.icon}</span>
                    {menu.name}
                  </div>
                  {/* Conditionally render the dropdown items */}
                  {transactionsDropdownOpen && (
                    <ul className="ml-8 mt-1 space-y-1">
                      <li>
                        <a
                          href="/Explore/transactions/all"
                          className="block px-4 py-2 text-sm hover:bg-[#F5F7FA]"
                        >
                          All Transactions
                        </a>
                      </li>
                      <li>
                        <a
                          href="/Explore/transactions/kadElectric"
                          className="block px-4 py-2 text-sm hover:bg-[#F5F7FA]"
                        >
                          kadElectric
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <a
                    href={menu.href}
                    className="flex items-center px-4 py-2 text-sm rounded hover:bg-[#F5F7FA] hover:font-bold hover:text-gray-900"
                  >
                    <span className="text-lg mr-1.5">{menu.icon}</span>
                    {menu.name}
                  </a>
                </li>
              );
            }
          })}
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 text-sm font-light hover:font-bold hover:text-gray-900"
          >
            <span className="text-lg mr-3">
              <Logout />
            </span>
            Log Out
          </button>

          <LogoutModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onLogout={handleLogout}
          />
        </ul>
      </nav>
    </div>
  );
}
