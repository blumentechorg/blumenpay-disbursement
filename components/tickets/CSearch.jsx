// "use client";

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
//   // local state to control dropdowns
//   const [localStatus, setLocalStatus] = useState("");
//   const [localUser, setLocalUser] = useState("");

//   const handleStatusSelect = (e) => {
//     const status = e.target.value;
//     setLocalStatus(status);
//     onStatusChange(status);
//   };

//   const handleUserSelect = (e) => {
//     const user = e.target.value;
//     setLocalUser(user);
//     onUserChange(user);
//   };

//   return (
//     <div className="sticky top-0 bg-white z-10 px-4 py-3 flex items-center space-x-4 border-b">
//       {/* Transactions dropdown (static for now) */}
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
//         <label htmlFor="status" className="sr-only">
//           Change Status
//         </label>
//         <select
//           id="status"
//           value={localStatus}
//           onChange={handleStatusSelect}
//           className="bg-transparent text-sm outline-none cursor-pointer"
//         >
//           <option value="">All Statuses</option>
//           <option value="Resolved">Resolved</option>
//           <option value="Opened">Opened</option>
//           <option value="InProgress">InProgress</option>
//         </select>
//         <ChevronDownIcon className="w-4 h-4 text-gray-600" />
//       </div>

//       {/* Admin/User dropdown */}
//       <div className="flex items-center space-x-1 bg-gray-50 px-3 py-1 rounded-md border">
//         <label htmlFor="user" className="sr-only">
//           Assign To
//         </label>
//         <select
//           id="user"
//           value={localUser}
//           onChange={handleUserSelect}
//           className="bg-transparent text-sm outline-none cursor-pointer"
//         >
//           <option value="">All Admins</option>
//           <option value="John Doe">John Doe</option>
//           <option value="Jane Smith">Jane Smith</option>
//           <option value="Not Assigned">Not Assigned</option>
//         </select>
//         <ChevronDownIcon className="w-4 h-4 text-gray-600" />
//       </div>

//       {/* Kebab menu */}
//       <button>
//         <DotsVerticalIcon className="w-5 h-5 text-gray-600" />
//       </button>
//     </div>
//   );
// }

// "use client";

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
//   const [localStatus, setLocalStatus] = useState("");
//   const [localUser, setLocalUser] = useState("");

//   const handleStatusSelect = (e) => {
//     const status = e.target.value;
//     setLocalStatus(status);
//     onStatusChange(status);
//   };

//   const handleUserSelect = (e) => {
//     const user = e.target.value;
//     setLocalUser(user);
//     onUserChange(user);
//   };

//   return (
//     <div className="sticky top-0 bg-white z-10 px-4 py-3 flex flex-wrap items-center gap-4 sm:gap-6 border-b">
//       {/* Transactions dropdown (static) */}
//       <div className="flex items-center space-x-1 cursor-pointer">
//         <span className="font-medium text-sm sm:text-base">
//           All Transactions
//         </span>
//         <ChevronDownIcon className="w-5 h-5 text-gray-600" />
//       </div>

//       {/* Search Bar */}
//       <div className="flex items-center bg-gray-100 rounded-md px-3 py-1 w-full sm:w-auto max-w-xs flex-grow">
//         <SearchIcon className="w-5 h-5 text-gray-500" />
//         <input
//           type="text"
//           placeholder="Search"
//           onChange={(e) => onSearch(e.target.value)}
//           className="bg-transparent flex-1 outline-none ml-2 text-sm"
//         />
//       </div>

//       {/* Filter toggle */}
//       <button
//         className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 text-sm"
//         onClick={() => setFiltersOpen(!filtersOpen)}
//       >
//         <FilterIcon className="w-5 h-5" />
//         <span>Filter</span>
//       </button>

//       {/* Change Status dropdown */}
//       <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-md border text-sm">
//         <label htmlFor="status" className="sr-only">
//           Change Status
//         </label>
//         <select
//           id="status"
//           value={localStatus}
//           onChange={handleStatusSelect}
//           className="bg-transparent outline-none cursor-pointer"
//         >
//           <option value="">All Statuses</option>
//           <option value="Resolved">Resolved</option>
//           <option value="Opened">Opened</option>
//           <option value="InProgress">InProgress</option>
//         </select>
//         <ChevronDownIcon className="w-4 h-4 text-gray-600" />
//       </div>

//       {/* User/Admin dropdown */}
//       <div className="flex items-center space-x-1 bg-gray-50 px-2 py-1 rounded-md border text-sm">
//         <label htmlFor="user" className="sr-only">
//           Assign To
//         </label>
//         <select
//           id="user"
//           value={localUser}
//           onChange={handleUserSelect}
//           className="bg-transparent outline-none cursor-pointer"
//         >
//           <option value="">All Admins</option>
//           <option value="John Doe">John Doe</option>
//           <option value="Jane Smith">Jane Smith</option>
//           <option value="Not Assigned">Not Assigned</option>
//         </select>
//         <ChevronDownIcon className="w-4 h-4 text-gray-600" />
//       </div>

//       {/* Kebab menu */}
//       <button className="ml-auto sm:ml-0">
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
    <div className="  z-10 bg-white border-b px-4 py-3 w-full">
      <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4">
        {/* Transactions label */}
        <div className="flex items-center space-x-1">
          <span className="font-medium text-sm sm:text-base">
            All Transactions
          </span>
          <ChevronDownIcon className="w-5 h-5 text-gray-600" />
        </div>

        {/* Search Input */}
        <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 w-full sm:w-auto flex-grow sm:flex-grow-0">
          <SearchIcon className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent flex-1 outline-none ml-2 text-sm"
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>

        {/* Filter Toggle */}
        <button
          className="flex items-center space-x-1 text-gray-700 hover:text-gray-900 text-sm"
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <FilterIcon className="w-5 h-5" />
          <span>Filter</span>
        </button>

        {/* Status Filter */}
        <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md border text-sm w-full sm:w-auto">
          <label htmlFor="status" className="sr-only">
            Change Status
          </label>
          <select
            id="status"
            value={localStatus}
            onChange={handleStatusSelect}
            className="w-full bg-transparent outline-none"
          >
            <option value="">All Statuses</option>
            <option value="Resolved">Resolved</option>
            <option value="Opened">Opened</option>
            <option value="InProgress">InProgress</option>
          </select>
        </div>

        {/* User Filter */}
        <div className="flex items-center bg-gray-50 px-2 py-1 rounded-md border text-sm w-full sm:w-auto">
          <label htmlFor="user" className="sr-only">
            Assigned User
          </label>
          <select
            id="user"
            value={localUser}
            onChange={handleUserSelect}
            className="w-full bg-transparent outline-none"
          >
            <option value="">All Admins</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Not Assigned">Not Assigned</option>
          </select>
        </div>

        {/* Kebab Menu */}
        <button className="self-end sm:self-auto">
          <DotsVerticalIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  );
}
