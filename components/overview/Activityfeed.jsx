"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoFilterOutline } from "react-icons/io5";

export default function Activityfeed({ onSearchChange }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search input changes and propagate to parent if provided.
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };

  return (
    <div className="">
      <div className="flex text-sm items-center border bg-white border-gray-300 rounded-lg h-8 w-[170px]">
        <div className="font-bold px-2">Recent Transactions</div>
        {/* <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by reference number..."
          className=" w-[220px] p-1   border-l rounded-r-md  outline-none"
        /> */}
      </div>
    </div>
  );
}
