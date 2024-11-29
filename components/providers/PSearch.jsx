"use client";

import React, { useState } from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";

const FloatingSearchContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAllTransactions, setIsAllTransactions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
          <label className="pl-2 text-xs text-gray-700">All Providers</label>
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

        <button
          className="w-[150px] h-[32px] bg-blue-700 text-white text-xs rounded-sm p-1.5 hover:bg-blue-800 focus:outline-none "
          onClick={() => setIsModalOpen(true)}
        >
          Manual Disbursement
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <header className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Manual Disbursement</h3>
                <button
                  className="text-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </header>
              <form className="mt-4">
                <select
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  placeholder="Service Provider"
                >
                  <option>Service Provider</option>
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                />
                <input
                  type="date"
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                />
                <select
                  className="w-full mb-4 px-4 py-2 border rounded-md"
                  placeholder="Payment Method"
                >
                  <option>Bank Transfer</option>
                </select>
                <div className="text-sm text-gray-600 mb-4">
                  <p>Bank Name: GTBank</p>
                  <p>Account Number: 0104647462</p>
                  <p>Account Name: KAEDC</p>
                </div>
                <div className="flex space-x-2 text-[10px]">
                  <button
                    className="bg-[#0052CC] text-white px-6 py-2 rounded-sm w-full"
                    type="button"
                  >
                    DISBURSE NOW
                  </button>
                  <button
                    className="bg-gray-200 text-gray-600 px-4 py-2 rounded-sm w-full"
                    type="button"
                  >
                    SAVE
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
          <div className=" fixed right-0 flex-none mt-10 bg-gray-50 border border-gray-200 rounded-lg shadow-lg">
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
