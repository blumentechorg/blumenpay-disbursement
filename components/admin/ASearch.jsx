// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { FiSearch } from "react-icons/fi";
// import { IoFilterOutline } from "react-icons/io5";
// import * as Yup from "yup";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "@/lib/axiosInstance";

// const FloatingSearchContainer = ({ onSelectAll, onSearchChange }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isAllTransactions, setIsAllTransactions] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [permissions, setPermissions] = useState({
//     teamMgt: false,
//     appMgt: false,
//     customerMgt: false,
//     transactionMgt: false,
//     settlementnMgt: false,
//   });

//   const dropdownRef = useRef(null);

//   // Notify parent about search changes
//   useEffect(() => {
//     if (onSearchChange) {
//       onSearchChange(searchText);
//     }
//   }, [searchText, onSearchChange]);

//   const handleCancelAll = () => {
//     setIsAllTransactions(false);
//     setSearchText("");
//     onSelectAll(false); // Deselect all rows
//   };
//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   const handleClickOutside = (event) => {
//     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//       setIsMenuOpen(false);
//     }
//   };

//   const handleAllTransactionsChange = () => {
//     const newState = !isAllTransactions;
//     setIsAllTransactions(newState);
//     onSelectAll(newState); // Notify the parent component
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const isAnySelectionMade = isAllTransactions || searchText.trim() !== "";

//   const registrationSchema = Yup.object().shape({
//     fullName: Yup.string().required("Full Name is required"),
//     email: Yup.string().email("Invalid email").required("Email is required"),
//     title: Yup.string().required("User Title is required"),
//   });

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(registrationSchema),
//   });

//   const togglePermission = (key) => {
//     setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
//   };

//   const closeModal = () => {
//     reset();
//     setPermissions({
//       teamMgt: false,
//       appMgt: false,
//       customerMgt: false,
//       transactionMgt: false,
//       settlementnMgt: false,
//     });
//     setIsModalOpen(false);
//   };

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       const payload = { ...data, ...permissions };
//       await axios.post("/Team/BlumenMember", payload);
//       toast.success("User Created Successfully!");
//       closeModal();
//     } catch (error) {
//       toast.error("Create Account failed. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex bg-white shadow-lg p-3 justify-between text-sm rounded-lg w-full border border-gray-200">
//       {/* All Transactions Checkbox */}
//       <div className="flex space-x-5">
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             checked={isAllTransactions}
//             onChange={handleAllTransactionsChange}
//             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label className="pl-2 text-xs text-gray-700">All Admins</label>
//         </div>

//         {/* Search and Filter Container */}
//         <div className="flex items-center border border-gray-300 rounded-lg h-8 px-2 w-18">
//           <FiSearch className="text-gray-500 mr-2" />
//           <input
//             type="text"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             placeholder="Search..."
//             className="flex-1 text-sm focus:outline-none"
//           />
//         </div>
//       </div>
//       <div className="flex space-x-2">
//         {isAnySelectionMade && (
//           <div>
//             <button
//               onClick={handleCancelAll}
//               className="flex text-xs hover:underline justify-end focus:outline-none bg-[#DADDE1] h-8 rounded-lg px-4 py-2 space-x-2"
//             >
//               <div>Cancel All Selection</div>
//               <div>
//                 <IoFilterOutline className="mt-0.5" />
//               </div>
//             </button>
//           </div>
//         )}

//         {/* Add New Admin Button */}
//         <button
//           className="w- h-[32px] bg-blue-700 uppercase text-white text-xs rounded-sm p-1.5 hover:bg-blue-800"
//           onClick={() => setIsModalOpen(true)}
//         >
//           Add new admin
//         </button>
//       </div>
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//             <header className="flex justify-between items-center">
//               <h3 className="text-lg font-bold">Add New Admin</h3>
//               <button className="text-gray-600" onClick={closeModal}>
//                 ✕
//               </button>
//             </header>
//             <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
//               {/* Full Name Input */}
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 {...register("fullName")}
//                 className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
//               />
//               {errors.fullName && (
//                 <p className="text-red-500 text-sm">
//                   {errors.fullName.message}
//                 </p>
//               )}

//               {/* Email Input */}
//               <input
//                 type="email"
//                 placeholder="Email"
//                 {...register("email")}
//                 className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm">{errors.email.message}</p>
//               )}

//               {/* User Title Input */}
//               <input
//                 type="text"
//                 placeholder="User Title"
//                 {...register("title")}
//                 className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
//               />
//               {errors.title && (
//                 <p className="text-red-500 text-sm">{errors.title.message}</p>
//               )}

//               {/* Role Management Checkboxes */}
//               <div className="mb-4 bg-gray-200 rounded-md p-3">
//                 <div className="font-bold mb-2">Assign Management Roles</div>
//                 {Object.keys(permissions).map((key) => (
//                   <div key={key} className="flex items-center mb-2">
//                     <input
//                       type="checkbox"
//                       id={key}
//                       className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                       checked={permissions[key]}
//                       onChange={() => togglePermission(key)}
//                     />
//                     <label
//                       htmlFor={key}
//                       className="ml-2 text-gray-700 capitalize"
//                     >
//                       {key.replace("Mgt", " Management")}
//                     </label>
//                   </div>
//                 ))}
//               </div>

//               {/* Buttons */}
//               <div className="flex space-x-2 text-sm">
//                 <button
//                   className="bg-gray-200 text-gray-600 px-6 py-2 rounded-sm w-full text-[10px]"
//                   type="button"
//                   onClick={closeModal}
//                 >
//                   CANCEL
//                 </button>
//                 <button
//                   className="bg-[#0052CC] text-white px-6 py-2 rounded-sm w-full text-[10px]"
//                   type="submit"
//                 >
//                   {loading ? "Submitting..." : "SUBMIT"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FloatingSearchContainer;

// FloatingSearchContainer.js
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

export default function FloatingSearchContainer({
  onSelectAll,
  onSearchChange,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAllTransactions, setIsAllTransactions] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [permissions, setPermissions] = useState({
    teamMgt: false,
    appMgt: false,
    customerMgt: false,
    transactionMgt: false,
    settlementnMgt: false,
  });

  const dropdownRef = useRef(null);

  // Notify parent about search changes
  useEffect(() => {
    onSearchChange?.(searchText);
  }, [searchText, onSearchChange]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectAllChange = () => {
    const newState = !isAllTransactions;
    setIsAllTransactions(newState);
    onSelectAll?.(newState);
  };

  const handleCancelAll = () => {
    setIsAllTransactions(false);
    setSearchText("");
    onSelectAll?.(false);
  };

  const registrationSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    title: Yup.string().required("User Title is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(registrationSchema) });

  const togglePermission = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const closeModal = () => {
    reset();
    setPermissions({
      teamMgt: false,
      appMgt: false,
      customerMgt: false,
      transactionMgt: false,
      settlementnMgt: false,
    });
    setIsModalOpen(false);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("/Team/BlumenMember", { ...data, ...permissions });
      toast.success("User Created Successfully!");
      closeModal();
    } catch {
      toast.error("Create Account failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isAnySelection = isAllTransactions || searchText.trim() !== "";

  return (
    <div
      ref={dropdownRef}
      className="flex items-center bg-white shadow-lg p-3 text-sm rounded-lg w-full border border-gray-200"
    >
      <div className="flex items-center space-x-5">
        <label className="flex items-center text-xs text-gray-700">
          <input
            type="checkbox"
            checked={isAllTransactions}
            onChange={handleSelectAllChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="pl-2">All Admins</span>
        </label>

        <div className="flex items-center border border-gray-300 rounded-lg h-8 px-2">
          <FiSearch className="mr-2" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
            className="flex-1 text-sm focus:outline-none"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center space-x-2">
        {isAnySelection && (
          <button
            onClick={handleCancelAll}
            className="flex items-center text-xs hover:underline bg-gray-200 h-8 rounded-lg px-4 focus:outline-none"
          >
            <span>Cancel All Selection</span>
            <IoFilterOutline className="ml-1" />
          </button>
        )}

        <button
          onClick={() => setIsModalOpen(true)}
          className="h-8 px-3 uppercase text-white text-xs rounded-sm bg-blue-700 hover:bg-blue-800"
        >
          Add New Admin
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <header className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Add New Admin</h3>
              <button className="text-gray-600" onClick={closeModal}>
                ✕
              </button>
            </header>
            <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("fullName")}
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  placeholder="User Title"
                  {...register("title")}
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="bg-gray-100 p-3 rounded-md">
                <div className="font-bold mb-2">Assign Management Roles</div>
                {Object.entries(permissions).map(([key, value]) => (
                  <label key={key} className="flex items-center mb-2 text-sm">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => togglePermission(key)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 capitalize">
                      {key.replace(/Mgt$/, " Management")}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full py-2 text-xs bg-gray-200 rounded-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-2 text-xs text-white bg-blue-700 rounded-sm"
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
}
