"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// Adjust schema based on requirements
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FloatingSearchContainer = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAllTransactions, setIsAllTransactions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [selectedPages, setSelectedPages] = useState([]);

  const dropdownRef = useRef(null);

  const registrationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    role: Yup.string().required("Role is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    pages: Yup.array().min(1, "Select at least one page"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const handleCancelAll = () => {
    setIsAllTransactions(false);
    setSearchText("");
  };

  const handleAllTransactionsChange = () => {
    const newState = !isAllTransactions;
    setIsAllTransactions(newState);
    if (onSelectAll) {
      onSelectAll(newState);
    }
  };

  const closeModal = () => {
    reset();
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      console.log("Form Submitted:", data);
      // Integrate your API call here
      toast.success("Admin account created successfully!");
      closeModal();
    } catch (error) {
      console.error("Error creating account:", error);
      toast.error("Failed to create account. Please try again.");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    });

    return () => {
      document.removeEventListener("mousedown", () => {});
    };
  }, []);

  const isAnySelectionMade = isAllTransactions || searchText.trim() !== "";

  const pages = [
    "Overview",
    "Transactions",
    "Disbursements",
    "Service Providers",
    "Support Tickets",
    "Admin Management",
  ];

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role === "super_admin") {
      setSelectedPages([...pages]); // Select all pages for Super Admin
    } else {
      setSelectedPages([]); // Clear selection for Admin
    }
  };

  const handlePageChange = (page) => {
    if (selectedPages.includes(page)) {
      setSelectedPages(selectedPages.filter((p) => p !== page));
    } else {
      setSelectedPages([...selectedPages, page]);
    }
  };

  const isPageSelected = (page) => selectedPages.includes(page);

  return (
    <div className="flex bg-white shadow-lg p-3 justify-between text-sm rounded-lg w-full border border-gray-200">
      {/* All Transactions Checkbox */}
      <div className="flex space-x-5">
        <div className="flex items-center ">
          <input
            type="checkbox"
            checked={isAllTransactions}
            onChange={handleAllTransactionsChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="pl-2 text-xs text-gray-700">All Admins</label>
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
      <div className="flex space-x-5">
        <div></div>
        {isAnySelectionMade && (
          <div className="">
            <button
              onClick={handleCancelAll}
              className="flex text-xs hover:underline focus:outline-none bg-[#DADDE1] h-8 w-[180px] px-4 rounded-lg  py-2 space-x-2"
            >
              <span className=""> Cancel All Selection</span>
              <span>
                <IoFilterOutline className="mt-0.5" />
              </span>
            </button>
          </div>
        )}
        <button
          className="w-full h-[32px] bg-blue-700 uppercase text-white text-xs rounded-sm p-1.5 hover:bg-blue-800 focus:outline-none"
          onClick={() => setIsModalOpen(true)}
        >
          Add new admin
        </button>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <header className="flex justify-between items-center">
                <h3 className="text-lg font-bold">Add New Admin</h3>
                <button
                  className="text-gray-600"
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </header>
              <form className="mt-4">
                {/* Full Name Input */}
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
                />

                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
                />

                {/* Password Input */}
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
                />

                {/* Confirm Password Input */}
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
                />

                {/* Role Selection Dropdown */}
                <select
                  value={selectedRole}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="w-full mb-4 px-5 py-2 border rounded-md bg-gray-200"
                >
                  <option value="" disabled>
                    Role
                  </option>
                  <option value="super_admin">Super Admin</option>
                  <option value="admin">Admin</option>
                </select>

                {/* Pages to Access Checkboxes */}
                <div className="mb-4 bg-gray-200 rounded-md p-3">
                  <div className="font-bold mb-2">Pages to Access</div>
                  {pages.map((page) => (
                    <div key={page} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={page}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={isPageSelected(page)}
                        onChange={() => handlePageChange(page)}
                        disabled={selectedRole === "super_admin"} // Disable manual selection for Super Admin
                      />
                      <label htmlFor={page} className="ml-2 text-gray-700">
                        {page}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex space-x-2 text-sm">
                  <button
                    className="bg-gray-200 text-gray-600 px-6 py-2 rounded-sm w-full text-[10px]"
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                  >
                    CANCEL
                  </button>
                  <button
                    className="bg-[#0052CC] text-white px-6 py-2 rounded-sm w-full text-[10px]"
                    type="submit"
                  >
                    SUBMIT
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingSearchContainer;
