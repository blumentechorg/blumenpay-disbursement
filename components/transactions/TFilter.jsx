"use client";

import React, { useState } from "react";

const FilterComponent = ({ onFilterChange }) => {
  // State for each filter
  const [filters, setFilters] = useState({
    paymentType: "",
    status: "",
    serviceProvider: "",
    paymentMethod: "",
  });

  // Options for dropdowns
  const paymentTypes = ["Credit Card", "Debit Card", "Bank Transfer", "Cash"];
  const statuses = ["Pending", "Completed", "Failed", "Refunded"];
  const serviceProviders = ["PayPal", "Stripe", "Square", "Amazon Pay"];
  const paymentMethods = ["Online", "Offline"];

  // Handle change in filters
  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass updated filters to parent
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters = {
      paymentType: "",
      status: "",
      serviceProvider: "",
      paymentMethod: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters); // Notify parent
  };

  return (
    <div className="p-6 rounded-lg max-w-md mx-auto text-sm">
      <h2 className="font-semibold mb-4">Filter</h2>

      {/* Payment Type */}
      <div className="mb-4">
        <select
          value={filters.paymentType}
          onChange={(e) => handleFilterChange("paymentType", e.target.value)}
          className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-lg p-1.5 pr-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Transaction Type</option>
          {paymentTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Status */}
      <div className="mb-4">
        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="w-[200px] h-[32px] border-gray-300 rounded-lg bg-[#DADDE1] text-xs p-1.5 pr-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Service Provider</option>
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
          className="w-[200px] h-[32px] border-gray-300 rounded-lg bg-[#DADDE1] text-xs p-1.5 pr-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Status</option>
          {serviceProviders.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </div>

      {/* Payment Method */}
      <div className="mb-4">
        <select
          value={filters.paymentMethod}
          onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
          className="w-[200px] h-[32px] border-gray-300 rounded-lg bg-[#DADDE1] text-xs p-1.5 pr-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Payment Method</option>
          {paymentMethods.map((method) => (
            <option key={method} value={method}>
              {method}
            </option>
          ))}
        </select>
      </div>

      {/* Clear All */}
      <div className="mt-4">
        <button
          onClick={clearAllFilters}
          className="w-[200px] h-[32px] bg-blue-700 text-white text-xs rounded-lg p-1.5 hover:bg-blue-800 focus:outline-none"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
