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

// // components/FilterPanel.jsx
// import { CalendarIcon } from "@heroicons/react/outline";

// export default function FilterPanel({
//   filtersOpen,
//   filters,
//   setFilters,
//   onApply,
//   onClear,
// }) {
//   return (
//     <div
//       className={`fixed top-16 right-0 w-64 bg-white h-full shadow-lg transform transition-transform
//         ${filtersOpen ? "translate-x-0" : "translate-x-full"}`}
//     >
//       <div className="p-4 space-y-4">
//         <h3 className="text-lg font-semibold">Filter</h3>

//         {/* Status */}
//         <select
//           className="w-full border rounded p-2 text-sm"
//           value={filters.status}
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, status: e.target.value }))
//           }
//         >
//           <option value="">Status</option>
//           <option>Opened</option>
//           <option>Resolved</option>
//           <option>InProgress</option>
//         </select>

//         {/* Priority */}
//         <select
//           className="w-full border rounded p-2 text-sm"
//           value={filters.priority}
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, priority: e.target.value }))
//           }
//         >
//           <option value="">Priority</option>
//           <option>Low</option>
//           <option>Medium</option>
//           <option>High</option>
//           <option>Critical</option>
//         </select>

//         {/* Assigned To */}
//         <select
//           className="w-full border rounded p-2 text-sm"
//           value={filters.assignedTo}
//           onChange={(e) =>
//             setFilters((f) => ({ ...f, assignedTo: e.target.value }))
//           }
//         >
//           <option value="">Assigned To</option>
//           <option>John Doe</option>
//           <option>Jane Smith</option>
//         </select>

//         {/* Date Range */}
//         <button
//           className="w-full border rounded p-2 flex items-center justify-between text-sm"
//           onClick={() => {
//             /* open your date picker here */
//           }}
//         >
//           <span>Date Range</span>
//           <CalendarIcon className="w-5 h-5 text-gray-500" />
//         </button>

//         {/* Apply / Clear */}
//         <button
//           className="w-full bg-blue-600 text-white rounded py-2 font-semibold"
//           onClick={onApply}
//         >
//           Filter
//         </button>
//         <button
//           className="w-full text-gray-600 rounded py-2 border"
//           onClick={onClear}
//         >
//           Clear All
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";

const TicketFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    status: "",
    priority: "",
    assignedTo: "",
    date: "",
  });

  const statuses = ["Resolved", "Opened", "InProgress"];
  const priorities = ["Low", "Medium", "High", "Critical"];
  const assignees = ["John Doe", "Jane Smith", "Not Assigned"];

  const handleFilterChange = (field, value) => {
    const updated = { ...filters, [field]: value };
    setFilters(updated);
    onFilterChange(updated);
  };

  const clearAll = () => {
    const cleared = {
      status: "",
      priority: "",
      assignedTo: "",
      date: "",
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div className="p-4 w-[240px] text-sm ">
      <h2 className="font-semibold mb-4">Filter</h2>

      {/* Status */}
      <div className="mb-3">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="w-full h-8 border-gray-300 bg-gray-200 text-xs rounded p-1.5 focus:outline-none focus:ring"
        >
          <option value="">Status</option>
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Priority */}
      <div className="mb-3">
        <select
          value={filters.priority}
          onChange={(e) => handleFilterChange("priority", e.target.value)}
          className="w-full h-8 border-gray-300 bg-gray-200 text-xs rounded p-1.5 focus:outline-none focus:ring"
        >
          <option value="">Priority</option>
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Assigned To */}
      <div className="mb-3">
        <select
          value={filters.assignedTo}
          onChange={(e) => handleFilterChange("assignedTo", e.target.value)}
          className="w-full h-8 border-gray-300 bg-gray-200 text-xs rounded p-1.5 focus:outline-none focus:ring"
        >
          <option value="">Assigned To</option>
          {assignees.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div className="mb-3">
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
          className="w-full h-8 px-2 bg-gray-200 border-gray-300 text-xs rounded focus:outline-none focus:ring"
        />
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-2">
        <button
          className="w-full bg-blue-700 text-white rounded text-xs py-2 hover:bg-blue-800"
          onClick={() => onFilterChange(filters)}
        >
          Filter
        </button>
        <button
          className="w-full bg-gray-200 text-black rounded text-xs py-2 hover:bg-gray-300"
          onClick={clearAll}
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default TicketFilter;
