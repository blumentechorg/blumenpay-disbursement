"use client";
import Image from "next/image";
import { FaHome, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import logo from "@/public/images/logo.png";
import title from "@/public/images/title.png";
import Caretupdown from "@/public/icons/sidebar/caretupdown";
import Overview from "@/public/icons/sidebar/overview";
import Transactions from "@/public/icons/sidebar/transactions";
import Disbursements from "@/public/icons/sidebar/disbursements";
import Providers from "@/public/icons/sidebar/providers";
import Logout from "@/public/icons/sidebar/logout";
import LogoutModal from "./Logout";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const router = useRouter();

  const handleLogout = () => {
    // Close the modal
    closeModal();

    // Add your logout logic here (e.g., clearing session, cookies, etc.)
    console.log("Logged out");

    // Redirect to the home page
    router.push("/"); // Replace with your logout logic
  };

  const menus = [
    { name: "Overview", href: "/Explore/overview/", icon: <Overview /> },
    {
      name: "Transactions",
      href: "/Explore/transactions/",
      icon: <Transactions />,
    },
    {
      name: "Disbursement",
      href: "/Explore/disbursement/",
      icon: <Disbursements />,
    },
    {
      name: "Service Providers",
      href: "/Explore/serviceprovider",
      icon: <Providers />,
    },
    // { name: "Logout", href: "/", icon: <Logout /> },
  ];

  return (
    <div className="h-screen w-64 bg-white text-black flex flex-col sticky top-0">
      {/* Logo and Title */}
      <div className="flex items-center justify-between h-20 border-b border-gray-300 px-2  ">
        <div className="flex space-x-1">
          <Image src={logo} alt="" width={30} height={30} />
          <Image src={title} alt="" width={100} height={100} />
        </div>
        <div>
          <Caretupdown />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">
          {menus.map((menu, index) => (
            <li key={index}>
              <a
                href={menu.href}
                className="flex items-center px-4 py-2 text-sm font-light rounded hover:bg-[#F5F7FA]"
              >
                <span className="text-lg mr-3">{menu.icon}</span>
                {menu.name}
              </a>
            </li>
          ))}

          <div className="hover:bg-[#F5F7FA] rounded">
            <button
              onClick={openModal}
              className="flex items-center px-4 py-2 text-sm font-light  "
            >
              <span className="text-lg mr-3">
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
        </ul>
      </nav>
    </div>
  );
}
