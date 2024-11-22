"use client";

import React, { useState } from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";

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

  const isAnySelectionMade = isAllTransactions || searchText.trim() !== "";

  return (
    <div className="flex  bg-white shadow-lg p-3 justify-between text-sm  rounded-lg w-full border border-gray-200">
      {/* All Transactions Checkbox */}
      <div className="flex space-x-5">
        <div className="flex items-center ">
          <input
            type="checkbox"
            checked={isAllTransactions}
            onChange={() => setIsAllTransactions(!isAllTransactions)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="pl-2 text-xs text-gray-700">
            All Disbursements
          </label>
        </div>

        {/* Search and Filter Container */}
        <div className="flex items-center border border-gray-300 rounded-lg h-8 px-2  ">
          {/* Search Icon */}
          <FiSearch className="text-gray-500 mr-2" />
          {/* Search Input */}
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="flex-1 text-sm focus:outline-none w-32"
          />
          {/* Filter Button */}
          <button
            onClick={handleFilter}
            className="flex items-center border-l  font-light space-x-2  px-4  h-8 rounded- text-sm  focus:outline-none  "
          >
            <div>Filter</div>
            <div>
              {" "}
              <IoFilterOutline className="mr-2" />
            </div>
          </button>
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

        <button className="w-[150px] h-[32px] bg-blue-700 text-white text-xs rounded-sm p-1.5 hover:bg-blue-800 focus:outline-none">
          Manual Disbursement
        </button>

        {/* Three-Dot Menu */}
        <div className="flex items-center justify-end ">
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FiMoreVertical size={20} />
          </button>
        </div>

        {/* Menu Dropdown */}
        {isMenuOpen && (
          <div className=" flex-none mt-4 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
            <ul className="text-sm text-gray-700">
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Option 1</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Option 2</li>
              <li className="p-2 hover:bg-gray-100 cursor-pointer">Option 3</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingSearchContainer;
