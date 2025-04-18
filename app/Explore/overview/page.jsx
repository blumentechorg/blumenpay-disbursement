"use client";

import React, { useState, useEffect } from "react";
import TotalToday from "@/components/cards/TotalToday";
import TotalYesterday from "@/components/cards/TotalYesterday";
import TotalThisWeek from "@/components/cards/TotalThisWeek";
import TotalThisMonth from "@/components/cards/TotalThisMonth";
import TotalPreviousMonth from "@/components/cards/TotalPreviousMonth";
import TotalAllTime from "@/components/cards/TotalAllTime";
import Activityfeed from "@/components/overview/Activityfeed";
import ActivityTable from "@/components/overview/ActivityTable";
// import Chart from "@/components/overview/Chart";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("@/components/Chart"), {
  ssr: false,
});

export default function Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [inputValue, setInputValue] = useState("");

  // Notify parent about search changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(inputValue);
    }, 300); // 300ms debounce
    return () => clearTimeout(handler);
  }, [inputValue]);

  return (
    <>
      <div className="space-y-10">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 py-5">
          <TotalToday />
          <TotalYesterday />
          <TotalThisWeek />
          <TotalThisMonth />
          <TotalPreviousMonth />
          <TotalAllTime />
        </div>

        <div>
          <Chart />
        </div>

        <div className="space-y-5 py-7">
          <div>
            <Activityfeed onSearchChange={setInputValue} />
          </div>
          <div>
            <ActivityTable searchQuery={searchQuery} />
          </div>
        </div>
      </div>
    </>
  );
}
