"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";

const FloatingSearchContainer = ({ onSelectAll, onSearchChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAllTransactions, setIsAllTransactions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef(null);

  // Notify parent about search changes
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(searchText);
    }
  }, [searchText, onSearchChange]);

  const handleCancelAll = () => {
    setIsAllTransactions(false);
    setSearchText("");
    onSelectAll(false); // Deselect all rows
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
    onSelectAll(newState); // Notify the parent component
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAnySelectionMade = isAllTransactions || searchText.trim() !== "";

  return (
    <div className="flex bg-white shadow-lg p-3 justify-between text-sm rounded-lg w-full border border-gray-200">
      <div className="flex space-x-5">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isAllTransactions}
            onChange={handleAllTransactionsChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="pl-2 text-xs text-gray-700">All Transactions</label>
        </div>

        <div className="flex items-center border border-gray-300 rounded-lg h-8 w-60 px-2">
          <FiSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="flex-1 text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="flex">
        {isAnySelectionMade && (
          <div>
            <button
              onClick={handleCancelAll}
              className="flex text-xs hover:underline focus:outline-none bg-[#DADDE1] h-8 rounded-lg px-4 py-2 space-x-2"
            >
              <div>Cancel All Selection</div>
              <div>
                <IoFilterOutline className="mt-0.5" />
              </div>
            </button>
          </div>
        )}

        <div className="flex items-center justify-end" ref={dropdownRef}>
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FiMoreVertical size={20} />
          </button>
        </div>

        {isMenuOpen && (
          <div className="fixed right-2 flex-none mt-12 bg-gray-50 border border-gray-200 rounded-md shadow-lg">
            <ul className="text-sm text-gray-700">
              <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b">
                Disburse All Selected
              </li>
              <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b">
                Reschedule Disbursements
              </li>
              <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer">
                Export Selected
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingSearchContainer;
