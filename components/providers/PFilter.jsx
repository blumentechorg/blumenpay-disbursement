// "use client";

// import React, { useState } from "react";

// const FilterComponent = ({ onFilterChange }) => {
//   // State for each filter
//   const [filters, setFilters] = useState({
//     paymentType: "",
//     status: "",
//     serviceProvider: "",
//     paymentMethod: "",
//     date: "", // Added a new key for date
//   });

//   // Options for dropdowns
//   const statuses = ["Successful", "Failed"];
//   const serviceProviders = ["KAEDC", "AEDC"];
//   const paymentMethods = ["POS", "Bank Transfer"];

//   // Handle change in filters
//   const handleFilterChange = (field, value) => {
//     const updatedFilters = { ...filters, [field]: value };
//     setFilters(updatedFilters);
//     onFilterChange(updatedFilters); // Pass updated filters to parent
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     const clearedFilters = {
//       paymentType: "",
//       status: "",
//       serviceProvider: "",
//       paymentMethod: "",
//       date: "", // Clear the date filter
//     };
//     setFilters(clearedFilters);
//     onFilterChange(clearedFilters); // Notify parent
//   };

//   return (
//     <div className="p-6 rounded-lg max-w-md mx-auto text-sm">
//       <h2 className="font-semibold mb-4">Filter</h2>

//       {/* Payment Method */}
//       <div className="mb-4">
//         <select
//           value={filters.paymentMethod}
//           onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
//           className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
//         >
//           <option value="">Payment Method</option>
//           {paymentMethods.map((type) => (
//             <option key={type} value={type}>
//               {type}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Status */}
//       <div className="mb-4">
//         <select
//           value={filters.status}
//           onChange={(e) => handleFilterChange("status", e.target.value)}
//           className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
//         >
//           <option value="">Status</option>
//           {statuses.map((status) => (
//             <option key={status} value={status}>
//               {status}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Service Provider */}
//       <div className="mb-4">
//         <select
//           value={filters.serviceProvider}
//           onChange={(e) =>
//             handleFilterChange("serviceProvider", e.target.value)
//           }
//           className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
//         >
//           <option value="">Service Provider</option>
//           {serviceProviders.map((provider) => (
//             <option key={provider} value={provider}>
//               {provider}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Date */}
//       <div className="mb-4">
//         <input
//           type="date"
//           value={filters.date || ""}
//           onChange={(e) => handleFilterChange("date", e.target.value)}
//           className="w-[200px] px-2 h-[32px] border-gray-300 rounded-sm bg-[#DADDE1] text-xs p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
//         />
//       </div>

//       {/* Clear All */}
//       <div className="mt-4">
//         <button
//           onClick={clearAllFilters}
//           className="w-[200px] h-[32px] bg-blue-700 text-white text-xs rounded-sm p-1.5 hover:bg-blue-800 focus:outline-none"
//         >
//           Clear All
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FilterComponent;

"use client";

import React, { useState } from "react";

const FilterComponent = ({ onFilterChange }) => {
  // State for each filter
  const [filters, setFilters] = useState({
    accountBalanceFrom: "",
    accountBalanceTo: "",
    dateCreated: "",
    status: "",
  });

  // Options for dropdowns
  const statuses = ["Active", "Inactive"];

  // Handle change in filters
  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass updated filters to parent
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters = {
      accountBalanceFrom: "",
      accountBalanceTo: "",
      dateCreated: "",
      status: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters); // Notify parent
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md w-72 mx-auto text-sm">
      <h2 className="font-bold mb-4">Filter</h2>

      {/* Account Balance */}
      <div className="mb-4">
        <label className="block text-xs font-medium mb-1">
          Account Balance
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="From"
            value={filters.accountBalanceFrom}
            onChange={(e) =>
              handleFilterChange("accountBalanceFrom", e.target.value)
            }
            className="w-full h-8 px-2 border border-gray-300 bg-gray-200 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
          <input
            type="text"
            placeholder="To"
            value={filters.accountBalanceTo}
            onChange={(e) =>
              handleFilterChange("accountBalanceTo", e.target.value)
            }
            className="w-full h-8 px-2 border border-gray-300 bg-gray-200 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
      </div>

      {/* Date Created */}
      <div className="mb-4">
        <label className="block text-xs font-medium mb-1">Date Created</label>
        <input
          type="date"
          value={filters.dateCreated || ""}
          onChange={(e) => handleFilterChange("dateCreated", e.target.value)}
          className="w-full h-8 px-2 border border-gray-300 bg-gray-200 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label className="block text-xs font-medium mb-1">Status</label>
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="w-full h-8 border border-gray-300 bg-gray-200 rounded-sm text-xs px-2 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Select Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Filter and Clear All Buttons */}
      <div className="flex flex-col gap-2 mt-4">
        <button
          onClick={() => onFilterChange(filters)}
          className="w-full h-8 bg-blue-600 text-white text-xs font-medium rounded-sm hover:bg-blue-700 focus:outline-none"
        >
          Filter
        </button>
        <button
          onClick={clearAllFilters}
          className="w-full h-8 bg-gray-300 text-gray-700 text-xs font-medium rounded-sm hover:bg-gray-400 focus:outline-none"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
