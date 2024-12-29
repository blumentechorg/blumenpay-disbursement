"use client";

import TFilter from "@/components/transactions/TFilter";
import Search from "@/components/transactions/Tsearch";
import Table from "@/components/transactions/Table";
import React, { useState } from "react";
import TransactionTable from "@/components/transactions/Table";
import Breadcrumbs from "@/components/Breadcrumbs";
import Breadcrumb from "@/components/Breadcrumb";

export default function TransactionPage() {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <div className="flex">
        {/* Sticky Sidebar */}
        <div className=" border-r min-h-screen top-0 hidden lg:block  ">
          <TFilter onFilterChange={handleFilterChange} />
        </div>
        <div className="flex-1 flex flex-col min-h-screen lg:pl-5 ">
          {/* Sticky Navbar */}
          <div className=" space-y-2">
            <Breadcrumbs />
            <Breadcrumb />
          </div>

          {/* Scrollable content */}
          <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100 ">
            <TransactionTable filters={filters} />
          </div>
        </div>
      </div>
    </>
  );
}
