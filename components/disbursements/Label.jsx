"use client";

import React, { useState } from "react";

export default function Label() {
  const [activeTab, setActiveTab] = useState(null);

  return (
    <div className="w-[440px]">
      <div className="flex border rounded-lg bg-white font-semibold md:text-base text-sm ">
        <div
          className={`border-r px-4 py-2 cursor-pointer  ${
            activeTab === "pending" ? "bg-[#F5F7FA] text-" : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Disbursement
        </div>
        <div
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "completed"
              ? "bg-[#F5F7FA] text-"
              : "hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("completed")}
        >
          Completed Disbursement
        </div>
      </div>
    </div>
  );
}
