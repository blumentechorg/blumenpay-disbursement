"use client";

import React, { useState, useRef, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { IoFilterOutline } from "react-icons/io5";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "@/lib/axiosInstance";

const FloatingSearchContainer = ({ workplaces }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAllTransactions, setIsAllTransactions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedManagementRoles, setSelectedManagementRoles] = useState([]);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);

  const registrationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    userTitle: Yup.string().required("User Title is required"),
  });

  const managementRoles = [
    "team management",
    "transaction management",
    "settlement management",
    "app management",
    "customer management",
  ];

  const handleRoleChange = (role) => {
    if (selectedManagementRoles.includes(role)) {
      setSelectedManagementRoles(
        selectedManagementRoles.filter((r) => r !== role)
      );
    } else {
      setSelectedManagementRoles([...selectedManagementRoles, role]);
    }
  };

  const closeModal = () => {
    reset();
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post("/Team/BlumenMember", data);
      const { tokens, user } = response.data; // Extract tokens and user object

      // Store tokens & user in localStorage
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      // Store accessToken in cookies for security
      Cookies.set("accessToken", tokens.accessToken, {
        secure: true,
        sameSite: "Strict",
      });

      console.log("User Created:", user);

      // Retrieve tokens from localStorage after sign-in
      const storedAccessToken = localStorage.getItem("accessToken");
      const storedRefreshToken = localStorage.getItem("refreshToken");

      console.log("Retrieved Access Token:", storedAccessToken);
      console.log("Retrieved Refresh Token:", storedRefreshToken);

      // Save user and retrieved token in AuthContext
      login(user, storedAccessToken);

      // Redirect to dashboard or show success message
      toast.success("User Created Successfully!");
    } catch (error) {
      toast.error("Create Account failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const isAnySelectionMade = isAllTransactions || searchText.trim() !== "";

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  return (
    <div className="flex bg-white shadow-lg p-3 justify-between text-sm rounded-lg w-full border border-gray-200">
      {/* All Transactions Checkbox */}
      <div className="flex space-x-5">
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isAllTransactions}
            onChange={() => setIsAllTransactions(!isAllTransactions)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label className="pl-2 text-xs text-gray-700">All Admins</label>
        </div>

        {/* Search and Filter Container */}
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

      {/* Cancel All Selection Button (Conditionally Rendered) */}
      <div className="flex space-x-5">
        {isAnySelectionMade && (
          <button
            onClick={() => {
              setIsAllTransactions(false);
              setSearchText("");
            }}
            className="flex text-xs hover:underline focus:outline-none bg-[#DADDE1] h-8 w-[180px] px-4 rounded-lg py-2 space-x-2"
          >
            <span>Cancel All Selection</span>
            <IoFilterOutline className="mt-0.5" />
          </button>
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
              <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
                {/* Full Name Input */}
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                  className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm">
                    {errors.fullName.message}
                  </p>
                )}

                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}

                {/* User Title Input */}
                <input
                  type="text"
                  placeholder="User Title"
                  {...register("userTitle")}
                  className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
                />
                {errors.userTitle && (
                  <p className="text-red-500 text-sm">
                    {errors.userTitle.message}
                  </p>
                )}

                {/* Workplaces  */}
                <div className="mb-4 bg-gray-200 rounded-md p-3">
                  <div className="font-bold mb-2">Assign Management Roles</div>
                  {managementRoles.map((role) => (
                    <div key={role} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={role}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={selectedManagementRoles.includes(role)}
                        onChange={() => handleRoleChange(role)}
                      />
                      <label htmlFor={role} className="ml-2 text-gray-700">
                        {role}
                      </label>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex space-x-2 text-sm">
                  <button
                    className="bg-gray-200 text-gray-600 px-6 py-2 rounded-sm w-full text-[10px]"
                    type="button"
                    onClick={closeModal}
                  >
                    CANCEL
                  </button>
                  <button
                    className="bg-[#0052CC] text-white px-6 py-2 rounded-sm w-full text-[10px]"
                    type="submit"
                  >
                    {loading ? "Submitting..." : "SUBMIT"}
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
