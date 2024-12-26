"use client";

import React, { useState } from "react";

export default function Label() {
  const [activeTab, setActiveTab] = useState("pending");

  const tabs = [
    { id: "pending", label: "Pending Disbursement" },
    { id: "completed", label: "Completed Disbursement" },
  ];

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex border rounded-lg bg-white shadow-md overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-6 py-3 text-sm font-semibold transition-all duration-300 ease-in-out ${
              activeTab === tab.id
                ? "bg-gray-100 text-gray-900 shadow-inner"
                : "bg-white text-gray-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4 p-4 border rounded-lg bg-gray-50 shadow-inner">
        {activeTab === "pending" && (
          <p className="text-gray-700 text-sm">
            Pending disbursement details will appear here.
          </p>
        )}
        {activeTab === "completed" && (
          <p className="text-gray-700 text-sm">
            Completed disbursement details will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
