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
      <div className="flex text-sm items-center border bg-white border-gray-300 rounded-lg h-8  w-[400px]">
        <div className="font-bold px-2">Realtime Activity Feed</div>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by reference number..."
          className=" w-[220px] p-1 border border-r-2 outline-none"
        />
      </div>
    </div>
  );
}
