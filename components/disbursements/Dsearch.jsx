"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";

const FloatingSearchContainer = ({ onSelectAll }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAllTransactions, setIsAllTransactions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleFilter = () => {
    console.log("Filter clicked with:", {
      isAllTransactions,
      searchText,
    });
  };

  const handleCancelAll = () => {
    setIsAllTransactions(false);
    setSearchText("");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  const handleAllTransactionsChange = () => {
    const newState = !isAllTransactions;
    setIsAllTransactions(newState);
    if (onSelectAll) {
      onSelectAll(newState); // Notify the parent component
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAnySelectionMade = isAllTransactions || searchText.trim() !== "";

  return (
    <div className=" relati flex bg-white shadow-lg p-3 justify-between text-sm rounded-lg w-full border border-gray-200">
      {/* All Transactions Checkbox */}
      <div className="flex space-x-5">
        <div className="flex items-center ">
          <input
            type="checkbox"
            checked={isAllTransactions}
            onChange={handleAllTransactionsChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="pl-2 text-xs text-gray-700">
            All Disbursements
          </label>
        </div>

        {/* Search and Filter Container */}
        <div className="flex items-center border border-gray-300 rounded-lg h-8 px-2 w-18 md:w-60 ">
          {/* Search Icon */}
          <FiSearch className="text-gray-500 mr-2" />
          {/* Search Input */}
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="flex-1 text-sm focus:outline-none"
          />
          {/* Filter Button */}
          {/* <button
            onClick={handleFilter}
            className="flex items-center border-l  font-light space-x-2  px-4  h-8 rounded- text-sm  focus:outline-none  "
          >
            <div>Filter</div>
            <div>
              {" "}
              <IoFilterOutline className="mr-2" />
            </div>
          </button> */}
        </div>
      </div>

      {/* Cancel All Selection Button (Conditionally Rendered) */}
      <div className="flex">
        {isAnySelectionMade && (
          <div className="">
            <button
              onClick={handleCancelAll}
              className="flex text-xs hover:underline focus:outline-none bg-[#DADDE1] h-8 rounded-lg px-4 py-2 space-x-2"
            >
              <div> Cancel All Selection</div>
              <div>
                <IoFilterOutline className="mt-0.5" />
              </div>
            </button>
          </div>
        )}
        {/* <button
          className="w-[150px] h-[32px] bg-blue-700 text-white text-xs rounded-sm p-1.5 hover:bg-blue-800 focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          Manual Disbursement
        </button> */}
        {/* Three-Dot Menu */}
        <div className="flex items-center justify-end " ref={dropdownRef}>
          <button
            onClick={toggleMenu}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            aria-label="Toggle menu"
          >
            <FiMoreVertical size={20} />
          </button>
        </div>
        {/* Menu Dropdown */}
        {/* <div
          className={`absolute
            right-2 mt-10 w-44
            bg-white border border-gray-200 rounded-lg shadow-lg
            origin-top-right transform transition-all duration-200 ease-out 
            ${
              isMenuOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 pointer-events-none"
            }
            z-40
          `}
        >
          <ul className="text-sm text-gray-700 ">
            <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b">
              Disburse All Selected
            </li>
            <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b">
              Reschedule Disbursements
            </li>
            <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer ">
              Export Selected
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default FloatingSearchContainer;
