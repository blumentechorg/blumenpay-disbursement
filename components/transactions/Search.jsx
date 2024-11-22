"use client";

import React, { useState } from "react";
import { FiFilter, FiMoreVertical } from "react-icons/fi";

const FloatingSearchContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAllTransactions, setIsAllTransactions] = useState(false);
  const [searchText, setSearchText] = useState("");

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

  return (
    <div className="flex bg-white shadow-lg p-6 rounded-lg w-full border border-gray-200">
      {/* All Transactions Checkbox */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={isAllTransactions}
          onChange={() => setIsAllTransactions(!isAllTransactions)}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label className="ml-2 text-sm text-gray-700">All Transactions</label>
      </div>

      {/* Search Input and Filter Button */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search..."
          className="flex-1 border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFilter}
          className="ml-2 flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <FiFilter className="mr-2" />
          Filter
        </button>
      </div>

      {/* Cancel All Selection Button */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleCancelAll}
          className="text-red-500 text-sm hover:underline focus:outline-none"
        >
          Cancel All Selection
        </button>

        {/* Three-Dot Menu */}
        <button
          onClick={toggleMenu}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FiMoreVertical size={20} />
        </button>
      </div>

      {/* Menu Dropdown */}
      {isMenuOpen && (
        <div className="mt-4 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
          <ul className="text-sm text-gray-700">
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default FloatingSearchContainer;
