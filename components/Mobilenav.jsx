import React, { useState } from "react";
import Transactions from "@/public/icons/sidebar/transactions";
import Disbursements from "@/public/icons/sidebar/disbursements";
import Overview from "@/public/icons/sidebar/overview";
import Providers from "@/public/icons/sidebar/providers";

import Link from "next/link";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the modal
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    {
      name: "Overview",
      icon: <Overview />,
      link: "/Explore/overview",
    },
    {
      name: "Transactions",
      icon: <Transactions />,
      link: "/Explore/transactions",
    },
    {
      name: "Disbursements",
      icon: <Disbursements />,
      link: "/Explore/disbursements",
    },
    {
      name: "Service Providers",
      icon: <Providers />,
      link: "/Explore/providers",
    },
  ];

  return (
    <div className="">
      {/* Hamburger Icon */}
      <button
        className="text-gray-800   rounded-md focus:outline-none"
        onClick={toggleMenu}
      >
        <svg
          className="w-7 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
          />
        </svg>
      </button>

      {/* Modal for Navigation Menu */}
      {isOpen && (
        <div className="absolute bg-gray-800 mt-4 bg-opacity-75 flex flex-col min-h-screen left-0 w-full items-center justify-center space-y-4 text-white lg:hidden">
          {navItems.map((item, index) => (
            <Link href={item.link} key={index}>
              <div
                className="text-xl font-medium flex items-center space-x-2"
                onClick={toggleMenu}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
          <Link href="/">
            <li className="mb-2 md:p-2 rounded-xl flex text-sm lg:space-x-4 items-center transition-transform transform hover:translate-x-2 lg:hover:bg-gray-100">
              Logout
            </li>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
