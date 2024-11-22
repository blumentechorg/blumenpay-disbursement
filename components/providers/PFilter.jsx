"use client";

import React, { useState } from "react";

const FilterComponent = ({ onFilterChange }) => {
  // State for each filter
  const [filters, setFilters] = useState({
    serviceProvider: "",
    status: "",
    accountCreationDate: "",
  });

  // Options for dropdowns
  const serviceProvider = [
    "Credit Card",
    "Debit Card",
    "Bank Transfer",
    "Cash",
  ];
  const statuses = ["Pending", "Completed", "Failed", "Refunded"];
  const accountCreationDate = ["PayPal", "Stripe", "Square", "Amazon Pay"];

  // Handle change in filters
  const handleFilterChange = (field, value) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters); // Pass updated filters to parent
  };

  // Clear all filters
  const clearAllFilters = () => {
    const clearedFilters = {
      serviceProvider: "",
      status: "",
      accountCreationDate: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters); // Notify parent
  };

  return (
    <div className="p-6 rounded-lg max-w-md mx-auto text-sm">
      <h2 className="font-semibold mb-4">Filter</h2>

      {/* service Provider */}
      <div className="mb-4">
        <select
          value={filters.serviceProvider}
          onChange={(e) => handleFilterChange("paymentType", e.target.value)}
          className="w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-lg p-1.5 pr-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Service Provider</option>
          {serviceProvider.map((type) => (
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
          <option value="">Status</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      {/* accountCreationDate */}
      <div className="mb-4">
        <select
          value={filters.accountCreationDate}
          onChange={(e) => handleFilterChange("paymentMethod", e.target.value)}
          className="w-[200px] h-[32px] border-gray-300 rounded-lg bg-[#DADDE1] text-xs p-1.5 pr-6 focus:outline-none focus:ring-1 focus:ring-gray-500"
        >
          <option value="">Account Creation Date</option>
          {accountCreationDate.map((method) => (
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
