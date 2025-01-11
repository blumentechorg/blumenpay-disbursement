"use client";
import OpenTickets from "@/components/cards/tickets/Open";
import Activeproviders from "@/components/cards/Activeproviders";
import Activeusers from "@/components/cards/Activeusers";
import PSearch from "@/components/providers/PSearch";
import React, { useState } from "react";
import TicketsTable from "@/components/tickets/Table";
import Breadcrumbs from "@/components/Breadcrumbs";
import Breadcrumb from "@/components/Breadcrumb";
import CFilter from "@/components/tickets/CFilter";

export default function TicketsPage() {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <>
      <div>
        <div className="flex">
          {/* Sticky Sidebar */}
          <div className=" border-r min-h-screen   ">
            <CFilter onFilterChange={handleFilterChange} />
          </div>
          <div className="flex-1 flex flex-col min-h-screen pl-5 ">
            {/* Sticky Navbar */}
            <div className=" space-y-2">
              <Breadcrumbs />
              <Breadcrumb />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto pt-5 space-y-4 bg-gray-100 ">
              <div className="space-y-5">
                <div className="grid grid-cols-3  gap-x-5  ">
                  <OpenTickets />
                  <Activeproviders />
                  <Activeusers />
                </div>
                <div className="space-y-5 pb-7">
                  <TicketsTable filters={filters} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
