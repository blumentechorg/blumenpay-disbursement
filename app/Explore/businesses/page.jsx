"use client";
import TotalToday from "@/components/cards/TotalToday";
import TotalThisMonth from "@/components/cards/TotalThisMonth";
import TotalThisWeek from "@/components/cards/TotalThisWeek";
import PSearch from "@/components/businesses/PSearch";
import React, { useState } from "react";
import ServiceProviderTable from "@/components/businesses/Table";
import Breadcrumbs from "@/components/Breadcrumbs";
import Breadcrumb from "@/components/Breadcrumb";
import PFilter from "@/components/businesses/PFilter";

export default function BusinessPage() {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <>
      <div className="w-full max-w-[90vw] sm:max-w-[600px] md:max-w-full">
        <div className="flex">
          {/* Sticky Sidebar */}
          <div className=" border-r min-h-screen  hidden lg:block ">
            <PFilter onFilterChange={handleFilterChange} />
          </div>
          <div className="flex-1 flex flex-col min-h-screen md:pl-5 ">
            {/* Sticky Navbar */}
            <div className=" space-y-2">
              <Breadcrumbs />
              <Breadcrumb />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto pt-5 space-y-4 bg-gray-100 ">
              <div className="space-y-5">
                <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-5 py-5  ">
                  <TotalToday />
                  <TotalThisWeek />
                  <TotalThisMonth />
                </div>
                <div className="space-y-5 pb-7">
                  <ServiceProviderTable filters={filters} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
