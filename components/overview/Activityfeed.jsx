"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoFilterOutline } from "react-icons/io5";

export default function Activityfeed() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="flex text-sm items-center border bg-white border-gray-300 rounded-lg h-8 px-2 w-[350px]">
        <div className="font-bold">Realtime Activity Feed</div>
        <div className="flex-1" />
        {/* Filter Button */}
        <button
          onClick={toggleMenu}
          className="flex items-center border-l font-light space-x-2 px-4 h-8 rounded text-sm focus:outline-none"
          ref={dropdownRef}
        >
          <div>Filter</div>
          <IoFilterOutline className="mr-2" />
          {/* Menu Dropdown */}
          {isMenuOpen && (
            <div className="absolute mt-16 bg-white border border-gray-200 rounded-md shadow-lg w-48 ">
              <ul className="text-xs text-gray-700">
                <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer font-bold border-b">
                  Status
                </li>
                {/* <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b">
                  Reschedule Disbursements
                </li> */}
                {/* <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                  Export Selected
                </li> */}
              </ul>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
