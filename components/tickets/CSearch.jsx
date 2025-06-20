// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { FiMoreVertical, FiSearch } from "react-icons/fi";
// import { IoFilterOutline } from "react-icons/io5";
// import { PiArrowSquareOutBold } from "react-icons/pi";

// const FloatingSearchContainer = ({ onSelectAll }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAllTransactions, setIsAllTransactions] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const handleFilter = () => {
//     console.log("Filter clicked with:", {
//       isAllTransactions,
//       searchText,
//     });
//   };

//   const handleCancelAll = () => {
//     setIsAllTransactions(false);
//     setSearchText("");
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
//     if (onSelectAll) {
//       onSelectAll(newState); // Notify the parent component
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const isAnySelectionMade = isAllTransactions || searchText.trim() !== "";

//   return (
//     <div className="flex  bg-white shadow-lg p-3 justify-between text-sm  rounded-lg w-full border border-gray-200">
//       {/* All Transactions Checkbox */}
//       <div className="flex space-x-5">
//         <div className="flex items-center ">
//           <input
//             type="checkbox"
//             checked={isAllTransactions}
//             onChange={handleAllTransactionsChange}
//             className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//           />
//           <label className="pl-2 text-xs text-gray-700">
//             All Disbursements
//           </label>
//         </div>

//         {/* Search and Filter Container */}
//         <div className="flex items-center border border-gray-300 rounded-lg h-8 px-2 w-60 ">
//           {/* Search Icon */}
//           <FiSearch className="text-gray-500 mr-2" />
//           {/* Search Input */}
//           <input
//             type="text"
//             value={searchText}
//             onChange={(e) => setSearchText(e.target.value)}
//             placeholder="Search..."
//             className="flex-1 text-sm focus:outline-none"
//           />
//           {/* Filter Button */}
//           {/* <button
//             onClick={handleFilter}
//             className="flex items-center border-l  font-light space-x-2  px-4  h-8 rounded- text-sm  focus:outline-none  "
//           >
//             <div>Filter</div>
//             <div>
//               {" "}
//               <IoFilterOutline className="mr-2" />
//             </div>
//           </button> */}
//         </div>
//       </div>

//       {/* Cancel All Selection Button (Conditionally Rendered) */}
//       <div className="flex space-x-5">
//         {isAnySelectionMade && (
//           <div className="">
//             <button
//               onClick={handleCancelAll}
//               className="flex text-xs hover:underline focus:outline-none bg-[#DADDE1] h-8 w-[180px] rounded-lg px-4 py-2 space-x-2"
//             >
//               <span> Cancel All Selection</span>
//               <span>
//                 <IoFilterOutline className="mt-0.5" />
//               </span>
//             </button>
//           </div>
//         )}

//         <button
//           className="w-full  bg-gray-200 uppercase flex text-xs rounded-sm p-2 hover:bg-gray-300 space-x-1 focus:outline-none"
//           onClick={() => setIsModalOpen(true)}
//         >
//           <span>Export</span>
//           <span>
//             <PiArrowSquareOutBold />
//           </span>
//         </button>

//         {isModalOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//             <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//               <header className="flex justify-between items-center">
//                 <h3 className="text-lg font-bold">Manual Disbursement</h3>
//                 <button
//                   className="text-gray-600"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   ✕
//                 </button>
//               </header>
//               <form className="mt-4">
//                 <select
//                   className="w-full mb-4 px-4 py-2 border rounded-md"
//                   placeholder="Service Provider"
//                 >
//                   <option>KAEDC</option>
//                   <option>AEDC</option>
//                 </select>
//                 <input
//                   type="number"
//                   placeholder="Amount"
//                   className="w-full mb-4 px-4 py-2 border rounded-md"
//                 />
//                 <input
//                   type="date"
//                   className="w-full mb-4 px-4 py-2 border rounded-md"
//                   placeholder={new Intl.DateTimeFormat("en-US", {
//                     month: "long",
//                     day: "numeric",
//                     year: "numeric",
//                   }).format(new Date())} // Current date in words, e.g., "December 11, 2024"
//                 />
//                 <select
//                   className="w-full mb-4 px-4 py-2 border rounded-md"
//                   placeholder="Payment Method"
//                 >
//                   <option className="">Bank Transfer</option>
//                 </select>
//                 <div className="text-sm justify-items-center text-gray-600 mb-8 ">
//                   <div className="font-bold pb-6">Account Details</div>
//                   <div>Bank Name: GTBank</div>
//                   <div>Account Number: 0104647462</div>
//                   <div>Account Name: KAEDC</div>
//                 </div>
//                 <div className="flex  space-x-2 text-[10px] ">
//                   <button
//                     className="bg-[#0052CC] text-white px-6 py-2 rounded-sm w-full"
//                     type="button"
//                   >
//                     DISBURSE NOW
//                   </button>
//                   <button
//                     className="bg-gray-200 text-gray-600 px-6 py-2 rounded-sm w-full"
//                     type="button"
//                   >
//                     SAVE
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}

//         {/* Three-Dot Menu */}
//         <div className="flex items-center justify-end " ref={dropdownRef}>
//           <button
//             onClick={toggleMenu}
//             className="text-gray-500 hover:text-gray-700 focus:outline-none"
//           >
//             <FiMoreVertical size={20} />
//           </button>
//         </div>

//         {/* Menu Dropdown */}
//         {isMenuOpen && (
//           <div className=" fixed right-2 flex-none mt-12 bg-gray-50 border border-gray-200 rounded-md shadow-lg">
//             <ul className="text-sm text-gray-700">
//               <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b">
//                 Disburse All Selected
//               </li>
//               <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer border-b">
//                 Reschedule Disbursements
//               </li>
//               <li className="py-2 px-4 hover:bg-gray-100 cursor-pointer ">
//                 Export Selected
//               </li>
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FloatingSearchContainer;

// components/FloatingBar.jsx
// import { useState } from "react";
// import {
//   ChevronDownIcon,
//   FilterIcon,
//   DotsVerticalIcon,
//   SearchIcon,
// } from "@heroicons/react/solid";

// export default function FloatingBar({
//   filtersOpen,
//   setFiltersOpen,
//   onSearch,
//   onStatusChange,
//   onUserChange,
// }) {
//   return (
//     <div className="sticky top-0 bg-white z-10 px-4 py-3 flex items-center space-x-4 border-b">
//       {/* Left: Transactions dropdown */}
//       <div className="flex items-center space-x-1 cursor-pointer">
//         <span className="font-medium">All Transactions</span>
//         <ChevronDownIcon className="w-5 h-5 text-gray-600" />
//       </div>

//       {/* Search */}
//       <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 flex-1 max-w-sm">
//         <SearchIcon className="w-5 h-5 text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search"
//           className="bg-transparent flex-1 outline-none ml-2 text-sm"
//           onChange={(e) => onSearch(e.target.value)}
//         />
//       </div>

//       {/* Filter toggle */}
//       <button
//         className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
//         onClick={() => setFiltersOpen(!filtersOpen)}
//       >
//         <FilterIcon className="w-5 h-5" />
//         <span>Filter</span>
//       </button>

//       {/* Change Status dropdown */}
//       <div className="flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-md border">
//         <span>Change Status</span>
//         <ChevronDownIcon className="w-4 h-4 text-gray-600" />
//         <span className="ml-2 font-semibold text-green-600">Resolved</span>
//       </div>

//       {/* User menu */}
//       <div className="flex items-center space-x-1 cursor-pointer">
//         <span className="font-medium">Admin | John Doe</span>
//         <ChevronDownIcon className="w-5 h-5 text-gray-600" />
//       </div>

//       {/* Kebab menu */}
//       <button>
//         <DotsVerticalIcon className="w-5 h-5 text-gray-600" />
//       </button>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import {
  ChevronDownIcon,
  FilterIcon,
  DotsVerticalIcon,
  SearchIcon,
} from "@heroicons/react/solid";

export default function FloatingBar({
  filtersOpen,
  setFiltersOpen,
  onSearch,
  onStatusChange,
  onUserChange,
}) {
  // local state to control dropdowns
  const [localStatus, setLocalStatus] = useState("");
  const [localUser, setLocalUser] = useState("");

  const handleStatusSelect = (e) => {
    const status = e.target.value;
    setLocalStatus(status);
    onStatusChange(status);
  };

  const handleUserSelect = (e) => {
    const user = e.target.value;
    setLocalUser(user);
    onUserChange(user);
  };

  return (
    <div className="sticky top-0 bg-white z-10 px-4 py-3 flex items-center space-x-4 border-b">
      {/* Transactions dropdown (static for now) */}
      <div className="flex items-center space-x-1 cursor-pointer">
        <span className="font-medium">All Transactions</span>
        <ChevronDownIcon className="w-5 h-5 text-gray-600" />
      </div>

      {/* Search */}
      <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 flex-1 max-w-sm">
        <SearchIcon className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent flex-1 outline-none ml-2 text-sm"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* Filter toggle */}
      <button
        className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
        onClick={() => setFiltersOpen(!filtersOpen)}
      >
        <FilterIcon className="w-5 h-5" />
        <span>Filter</span>
      </button>

      {/* Change Status dropdown */}
      <div className="flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-md border">
        <label htmlFor="status" className="sr-only">
          Change Status
        </label>
        <select
          id="status"
          value={localStatus}
          onChange={handleStatusSelect}
          className="bg-transparent text-sm outline-none cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="Resolved">Resolved</option>
          <option value="Opened">Opened</option>
          <option value="InProgress">InProgress</option>
        </select>
        <ChevronDownIcon className="w-4 h-4 text-gray-600" />
      </div>

      {/* Admin/User dropdown */}
      <div className="flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-md border">
        <label htmlFor="user" className="sr-only">
          Assign To
        </label>
        <select
          id="user"
          value={localUser}
          onChange={handleUserSelect}
          className="bg-transparent text-sm outline-none cursor-pointer"
        >
          <option value="">All Admins</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
          <option value="Not Assigned">Not Assigned</option>
        </select>
        <ChevronDownIcon className="w-4 h-4 text-gray-600" />
      </div>

      {/* Kebab menu */}
      <button>
        <DotsVerticalIcon className="w-5 h-5 text-gray-600" />
      </button>
    </div>
  );
}
