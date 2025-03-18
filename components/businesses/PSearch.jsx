"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiMoreVertical, FiSearch } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";
import axiosInstance from "@/lib/axiosInstance"; // Adjust the path as needed

const FloatingSearchContainer = ({ onSelectAll, onSearchChange }) => {
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

  // Notify parent about search changes
  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(searchText);
    }
  }, [searchText, onSearchChange]);

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
      onSelectAll(newState);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isAnySelectionMade = isAllTransactions || searchText.trim() !== "";

  // ----- New Business Form State -----
  const [businessData, setBusinessData] = useState({
    name: "",
    description: "",
    logo: "",
    callbackUrl: "",
    appUrl: "",
    appEmail: "",
    defaultProvider: "",
    defaultVasProvider: "",
    tTypeForFundsweep: 1,
    allowCrossPayment: false,
    settlementSetup: {
      provider: "",
      fundSweepPercentage: 0,
      bankCode: "",
      bankName: "",
      accountName: "",
      accountNumber: "",
      canSelfManage: false,
      tPlus: 0,
      canAutoProcess: false,
    },
  });

  // ----- New state & ref for logo upload -----
  const [logoPreview, setLogoPreview] = useState("");
  const logoInputRef = useRef(null);

  const handleLogoClick = () => {
    if (logoInputRef.current) {
      logoInputRef.current.click();
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewURL = URL.createObjectURL(file);
      setLogoPreview(previewURL);
      // Optionally update your businessData.logo with previewURL or the file itself
      setBusinessData({ ...businessData, logo: previewURL });
    }
  };

  const handleRemoveLogo = () => {
    setLogoPreview("");
    setBusinessData({ ...businessData, logo: "" });
    if (logoInputRef.current) {
      logoInputRef.current.value = null;
    }
  };

  // ----- Submit Handler Using Axios -----
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axiosInstance.post("/Apps", businessData);
      console.log("Business created successfully:", data);
      setIsModalOpen(false);
      // Optionally clear form or trigger refresh logic here
    } catch (error) {
      console.error("Error submitting business:", error);
    }
  };

  return (
    <div className="flex bg-white shadow-lg p-3 justify-between text-sm rounded-lg w-full border border-gray-200">
      {/* Left side – checkbox and search input */}
      <div className="flex space-x-5">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isAllTransactions}
            onChange={handleAllTransactionsChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="pl-2 text-xs text-gray-700">All Businesses</label>
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg h-8 px-2 w-60">
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

      {/* Right side – Cancel All, Add new business button and menu */}
      <div className="flex space-x-5">
        {isAnySelectionMade && (
          <button
            onClick={handleCancelAll}
            className="flex text-xs hover:underline focus:outline-none bg-[#DADDE1] h-8 w-[180px] rounded-lg px-4 py-2 space-x-2"
          >
            <span>Cancel All Selection</span>
            <span>
              <IoFilterOutline className="mt-0.5" />
            </span>
          </button>
        )}

        <button
          className="w-full h-[32px] bg-blue-700 uppercase text-white text-xs rounded-sm p-1.5 hover:bg-blue-800 focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          Add new business
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg overflow-y-auto max-h-[90vh]">
              <header className="flex justify-between items-center border-b pb-2 mb-4">
                <h3 className="text-lg font-bold">Add New Business</h3>
                <button
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </header>
              <form className="mt-2" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={businessData.name}
                    onChange={(e) =>
                      setBusinessData({ ...businessData, name: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Description
                  </label>
                  <textarea
                    value={businessData.description}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                    required
                  />
                </div>
                {/* Advanced Logo Upload Field */}
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Logo
                  </label>
                  <div className="flex flex-col items-center border border-dashed border-gray-300 rounded-md p-4">
                    <button
                      type="button"
                      onClick={handleLogoClick}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none mb-2"
                    >
                      Upload Logo
                    </button>
                    <input
                      type="file"
                      accept="image/*"
                      ref={logoInputRef}
                      className="hidden"
                      onChange={handleLogoChange}
                    />
                    {logoPreview && (
                      <div className="w-full">
                        <img
                          src={logoPreview}
                          alt="Logo Preview"
                          className="w-full h-auto object-contain border rounded-md"
                        />
                        <button
                          type="button"
                          onClick={handleRemoveLogo}
                          className="mt-2 text-xs text-red-600 hover:underline focus:outline-none"
                        >
                          Remove Image
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Callback URL
                  </label>
                  <input
                    type="text"
                    value={businessData.callbackUrl}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        callbackUrl: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    App URL
                  </label>
                  <input
                    type="text"
                    value={businessData.appUrl}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        appUrl: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    App Email
                  </label>
                  <input
                    type="email"
                    value={businessData.appEmail}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        appEmail: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Default Provider
                  </label>
                  <input
                    type="text"
                    value={businessData.defaultProvider}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        defaultProvider: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Default VAS Provider
                  </label>
                  <input
                    type="text"
                    value={businessData.defaultVasProvider}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        defaultVasProvider: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Type For Fundsweep
                  </label>
                  <input
                    type="number"
                    value={businessData.tTypeForFundsweep}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        tTypeForFundsweep: Number(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={businessData.allowCrossPayment}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        allowCrossPayment: e.target.checked,
                      })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-xs text-gray-700">
                    Allow Cross Payment
                  </label>
                </div>
                <hr className="mb-4" />
                <h4 className="text-sm font-bold mb-2">Settlement Setup</h4>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Provider
                  </label>
                  <input
                    type="text"
                    value={businessData.settlementSetup.provider}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        settlementSetup: {
                          ...businessData.settlementSetup,
                          provider: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Fund Sweep Percentage
                  </label>
                  <input
                    type="number"
                    value={businessData.settlementSetup.fundSweepPercentage}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        settlementSetup: {
                          ...businessData.settlementSetup,
                          fundSweepPercentage: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Bank Code
                  </label>
                  <input
                    type="text"
                    value={businessData.settlementSetup.bankCode}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        settlementSetup: {
                          ...businessData.settlementSetup,
                          bankCode: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={businessData.settlementSetup.bankName}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        settlementSetup: {
                          ...businessData.settlementSetup,
                          bankName: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Account Name
                  </label>
                  <input
                    type="text"
                    value={businessData.settlementSetup.accountName}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        settlementSetup: {
                          ...businessData.settlementSetup,
                          accountName: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={businessData.settlementSetup.accountNumber}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        settlementSetup: {
                          ...businessData.settlementSetup,
                          accountNumber: e.target.value,
                        },
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={businessData.settlementSetup.canSelfManage}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        settlementSetup: {
                          ...businessData.settlementSetup,
                          canSelfManage: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-xs text-gray-700">
                    Can Self Manage
                  </label>
                </div>
                <div className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700">
                    T Plus
                  </label>
                  <input
                    type="number"
                    value={businessData.settlementSetup.tPlus}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        settlementSetup: {
                          ...businessData.settlementSetup,
                          tPlus: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full px-4 py-2 border rounded-md text-xs focus:ring focus:ring-blue-200"
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <input
                    type="checkbox"
                    checked={businessData.settlementSetup.canAutoProcess}
                    onChange={(e) =>
                      setBusinessData({
                        ...businessData,
                        settlementSetup: {
                          ...businessData.settlementSetup,
                          canAutoProcess: e.target.checked,
                        },
                      })
                    }
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label className="ml-2 text-xs text-gray-700">
                    Can Auto Process
                  </label>
                </div>
                <div className="flex space-x-2 text-[10px]">
                  <button
                    className="bg-[#0052CC] text-white px-6 py-2 rounded-sm w-full hover:bg-[#003b99]"
                    type="submit"
                  >
                    Create Business
                  </button>
                </div>
              </form>
            </div>
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
          <div className="fixed right-2 mt-12 bg-gray-50 border border-gray-200 rounded-md shadow-lg">
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
