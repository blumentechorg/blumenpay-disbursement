"use client";
import Totalcollections from "@/components/cards/TotalToday";
import Activeproviders from "@/components/cards/TotalYesterday";
import Activeusers from "@/components/cards/TotalThisWeek";
import PSearch from "@/components/businesses/PSearch";
import React, { useState } from "react";
import AdminTable from "@/components/admin/Table";
import Breadcrumbs from "@/components/Breadcrumbs";
import Breadcrumb from "@/components/Breadcrumb";
import PFilter from "@/components/businesses/PFilter";

export default function ProvidersPage() {
  const [filters, setFilters] = useState({});

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  return (
    <>
      <div>
        <div className="flex">
          {/* Sticky Sidebar */}
          <div className="flex-1 flex flex-col min-h-screen lg:pl-5 ">
            {/* Sticky Navbar */}
            <div className=" space-y-2">
              <Breadcrumbs />
              <Breadcrumb />
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto pt-5 space-y-4 bg-gray-100 ">
              <div className="space-y-5">
                <div className="space-y-5 pb-7">
                  <AdminTable filters={filters} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
