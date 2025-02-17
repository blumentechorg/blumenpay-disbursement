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

// "use client";

// import React, { useState } from "react";

// const FilterComponent = ({ onFilterChange }) => {
//   // State for each filter field
//   const [filters, setFilters] = useState({
//     referenceNumber: "",
//     provider: "",
//     status: "",
//     date: "",
//     type: "",
//   });

//   // Options for dropdowns
//   const statuses = ["Success", "Pending"];
//   const providers = ["card", "Paystack"];
//   const types = ["KadElectric", "Payment"];

//   // Handle change in filters
//   const handleFilterChange = (field, value) => {
//     const updatedFilters = { ...filters, [field]: value };
//     setFilters(updatedFilters);
//     onFilterChange(updatedFilters); // Pass updated filters to parent
//   };

//   // Clear all filters
//   const clearAllFilters = () => {
//     const clearedFilters = {
//       referenceNumber: "",
//       provider: "",
//       status: "",
//       date: "",
//       type: "",
//     };
//     setFilters(clearedFilters);
//     onFilterChange(clearedFilters); // Notify parent
//   };

//   return (
//     <div className="p-6 rounded-lg max-w-md mx-auto text-sm">
//       <h2 className="font-semibold mb-4">Filter</h2>

//       {/* Reference Number */}
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Reference Number"
//           value={filters.referenceNumber}
//           onChange={(e) =>
//             handleFilterChange("referenceNumber", e.target.value)
//           }
//           className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
//         />
//       </div>

//       {/* Provider */}
//       <div className="mb-4">
//         <select
//           value={filters.provider}
//           onChange={(e) => handleFilterChange("provider", e.target.value)}
//           className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
//         >
//           <option value="">Provider</option>
//           {providers.map((prov) => (
//             <option key={prov} value={prov}>
//               {prov}
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

//       {/* Date */}
//       <div className="mb-4">
//         <input
//           type="date"
//           value={filters.date}
//           onChange={(e) => handleFilterChange("date", e.target.value)}
//           className="w-[200px] px-2 h-[32px] border-gray-300 rounded-sm bg-[#DADDE1] text-xs p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
//         />
//       </div>

//       {/* Type */}
//       <div className="mb-4">
//         <select
//           value={filters.type}
//           onChange={(e) => handleFilterChange("type", e.target.value)}
//           className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
//         >
//           <option value="">Type</option>
//           {types.map((t) => (
//             <option key={t} value={t}>
//               {t}
//             </option>
//           ))}
//         </select>
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
  // State for each filter field
  const [filters, setFilters] = useState({
    referenceNumber: "",
    provider: "",
    status: "",
    date: "",
    type: "",
  });

  // Options for dropdowns
  const statuses = ["Success", "Pending"];
  const providers = ["card", "Paystack"];
  const types = ["KadElectric", "Payment"];

  // Handle change in filters
  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass updated filters to parent
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters = {
      referenceNumber: "",
      provider: "",
      status: "",
      date: "",
      type: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters); // Notify parent
  };

  return (
    <div className="p-6 rounded-lg max-w-md mx-auto text-sm">
      <h2 className="font-semibold mb-4">Filter</h2>

      {/* Reference Number */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Reference Number"
          value={filters.referenceNumber}
          onChange={(e) =>
            handleFilterChange("referenceNumber", e.target.value)
          }
          className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {/* Provider */}
      <div className="mb-4">
        <select
          value={filters.provider}
          onChange={(e) => handleFilterChange("provider", e.target.value)}
          className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Provider</option>
          {providers.map((prov) => (
            <option key={prov} value={prov}>
              {prov}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="mb-4">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div className="mb-4">
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
          className="w-[200px] px-2 h-[32px] border-gray-300 rounded-sm bg-[#DADDE1] text-xs p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {/* Type */}
      <div className="mb-4">
        <select
          value={filters.type}
          onChange={(e) => handleFilterChange("type", e.target.value)}
          className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Type</option>
          {types.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Clear All */}
      <div className="mt-4">
        <button
          onClick={clearAllFilters}
          className="w-[200px] h-[32px] bg-blue-700 text-white text-xs rounded-sm p-1.5 hover:bg-blue-800 focus:outline-none"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
