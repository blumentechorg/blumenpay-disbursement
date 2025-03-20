// "use client";

// import React, { useState } from "react";

// const FilterComponent = ({ onFilterChange }) => {
//   // State for each filter
//   const [filters, setFilters] = useState({
//     businessName: "",
//     status: "",
//     serviceProvider: "",
//     paymentMethod: "",
//     date: "", // Added a new key for date
//   });

//   // Options for dropdowns
//   const statuses = ["Active", "Inactive"];
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
//   // State for each filter
//   const [filters, setFilters] = useState({
//     businessName: "",
//     status: "",
//     serviceProvider: "",
//     appId: "",
//     date: "", // Added a new key for date
//   });

//   // Options for dropdowns
//   const statuses = ["Active", "Inactive"];
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
//       businessName: "",
//       status: "",
//       serviceProvider: "",
//       appId: "",
//       date: "",
//     };
//     setFilters(clearedFilters);
//     onFilterChange(clearedFilters); // Notify parent
//   };

//   return (
//     <div className="p-6 rounded-lg max-w-md mx-auto text-sm">
//       <h2 className="font-semibold mb-4">Filter</h2>

//       {/* Business Name */}
//       <label className="font-bold">Business</label>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="Business Name"
//           value={filters.businessName}
//           onChange={(e) => handleFilterChange("businessName", e.target.value)}
//           className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
//         />
//       </div>

//       {/* Payment Method */}
//       <label className="font-bold">App ID</label>
//       <div className="mb-4">
//         <input
//           type="text"
//           placeholder="App ID"
//           value={filters.appId}
//           onChange={(e) => handleFilterChange("appId", e.target.value)}
//           className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
//         />
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
    businessName: "",
    status: "",
    serviceProvider: "",
    appId: "",
    date: "", // Remove this field if date filtering is not needed
  });

  // Options for dropdowns
  const statuses = ["Active", "Inactive"];
  const serviceProviders = ["paystack", "paga"];

  // Handle change in filters
  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass updated filters to parent
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters = {
      businessName: "",
      status: "",
      serviceProvider: "",
      appId: "",
      date: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters); // Notify parent
  };

  return (
    <div className="p-6 rounded-lg max-w-md mx-auto text-sm">
      <h2 className="font-semibold mb-4">Filter</h2>

      {/* Business Name */}
      <label className="font-bold">Business</label>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Business Name"
          value={filters.businessName}
          onChange={(e) => handleFilterChange("businessName", e.target.value)}
          className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
      </div>

      {/* App ID */}
      <label className="font-bold">App ID</label>
      <div className="mb-4">
        <input
          type="text"
          placeholder="App ID"
          value={filters.appId}
          onChange={(e) => handleFilterChange("appId", e.target.value)}
          className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
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

      {/* Service Provider */}
      <div className="mb-4">
        <select
          value={filters.serviceProvider}
          onChange={(e) =>
            handleFilterChange("serviceProvider", e.target.value)
          }
          className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Service Provider</option>
          {serviceProviders.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </div>

      {/* Date (optional) */}
      <div className="mb-4">
        <input
          type="date"
          value={filters.date || ""}
          onChange={(e) => handleFilterChange("date", e.target.value)}
          className="w-[200px] px-2 h-[32px] border-gray-300 rounded-sm bg-[#DADDE1] text-xs p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
        />
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
