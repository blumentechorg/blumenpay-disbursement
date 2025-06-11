"use client";
import OpenTickets from "@/components/cards/tickets/Open";
import Label from "@/components/tickets/Label";
import ResolvedTickets from "@/components/cards/tickets/Resolved";
import OverdueTickets from "@/components/cards/tickets/Overdue";
import ProgressTickets from "@/components/cards/tickets/Progress";
import PSearch from "@/components/businesses/PSearch";
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
          <div className=" border-r min-h-screen  hidden lg:block  ">
            <CFilter onFilterChange={handleFilterChange} />
          </div>
          <div className="flex-1 flex flex-col min-h-screen lg:pl-5 ">
            {/* Sticky Navbar */}
            <div className=" space-y-2">
              <Breadcrumbs />
              <Breadcrumb />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto pt-5 space-y-4 bg-gray-100 ">
              <div className="space-y-5">
                <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-5 py-5">
                  <OpenTickets />
                  <ProgressTickets />
                  <ResolvedTickets />
                  <OverdueTickets />
                </div>
                <div className="space-y-5 pb-7">
                  <Label />
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
