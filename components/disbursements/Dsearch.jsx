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
    <div className="flex  bg-white shadow-lg p-3 justify-between text-sm  rounded-lg w-full border border-gray-200">
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
        <div className="flex items-center border border-gray-300 rounded-lg h-8 px-2 w-60 ">
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

        <button
          className="w-[150px] h-[32px] bg-blue-700 text-white text-xs rounded-sm p-1.5 hover:bg-blue-800 focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          Manual Disbursement
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-[#F1F1F1] rounded-md p-6 w-[485px] shadow-lg ">
              <div className="flex justify-between items-center pb-4  ">
                <h1 className="text-xl font-bold">Manual Disbursement</h1>
                <button
                  className="text-gray-600 hover:text-red-500"
                  onClick={() => setIsModalOpen(false)}
                  aria-label="Close Modal"
                >
                  ✕
                </button>
              </div>
              <form className="space-y-4 ">
                {/* Service Provider */}
                <select
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  aria-label="Select Service Provider"
                >
                  <option value="" disabled selected>
                    Service Provider
                  </option>
                  <option value="KAEDC">KAEDC</option>
                  <option value="AEDC">AEDC</option>
                </select>

                {/* Percentage and Amount */}
                <div className="flex items-center space-x-2">
                  <select
                    className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    aria-label="Select Percentage or Fixed Amount"
                  >
                    <option value="Percentage">Percentage</option>
                  </select>
                  <input
                    type="number"
                    step="0.1"
                    className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="1.0"
                    aria-label="Enter Percentage"
                  />
                </div>
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                  placeholder="Amount "
                  aria-readonly="true"
                  disabled
                />

                {/* Account Details */}
                <div className="text-sm text-gray-600">
                  <div className="font-bold pb-2 text-center">
                    Account Details
                  </div>
                  <select
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    aria-label="Select Bank"
                  >
                    <option value="" disabled selected>
                      Bank
                    </option>
                    <option value="GTBank">GTBank</option>
                    <option value="Access Bank">Access Bank</option>
                  </select>
                  <input
                    type="text"
                    className="w-full mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                    placeholder="Account Number"
                    aria-label="Enter Account Number"
                  />
                  <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-md bg-gray-100"
                    placeholder="Account Name "
                    aria-readonly="true"
                    disabled
                  />
                </div>

                {/* Bank Details */}
                <div className="text-sm text-gray-600 mt-4 text-center space-y-2">
                  <div>Bank Name: GTBank</div>
                  <div>Account Number: 0104647462</div>
                  <div>Account Name: KAEDC</div>
                </div>

                {/* Buttons */}
                <div className="flex space-x-4 pt-6 ">
                  <button
                    className="bg-gray-200 text-xs text-gray-600 uppercase px-6 py-3 rounded-sm w-1/2 hover:bg-gray-300"
                    type="button"
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-blue-600 text-xs text-white px-6 py-3 uppercase rounded-sm w-1/2 hover:bg-blue-700"
                    type="submit"
                  >
                    Disburse Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Three-Dot Menu */}
        <div className="flex items-center justify-end " ref={dropdownRef}>
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <FiMoreVertical size={20} />
          </button>
        </div>

        {/* Menu Dropdown */}
        {isMenuOpen && (
          <div className=" fixed right-2 flex-none  bg-gray-50 border border-gray-200 rounded-md shadow-lg">
            <ul className="text-sm text-gray-700">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingSearchContainer;
