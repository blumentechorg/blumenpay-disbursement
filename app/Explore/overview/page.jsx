import React from "react";
import TotalToday from "@/components/cards/TotalToday";
import TotalYesterday from "@/components/cards/TotalYesterday";
import TotalThisWeek from "@/components/cards/TotalThisWeek";
import TotalThisMonth from "@/components/cards/TotalThisMonth";
import TotalPreviousMonth from "@/components/cards/TotalPreviousMonth";
import TotalAllTime from "@/components/cards/TotalAllTime";
import Activityfeed from "@/components/overview/Activityfeed";
import ActivityTable from "@/components/overview/ActivityTable";

export default function page() {
  return (
    <>
      <div className="space-y-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 py-5">
          <TotalToday />
          <TotalYesterday />
          <TotalThisWeek />
          <TotalThisMonth />
          <TotalPreviousMonth />
          <TotalAllTime />
        </div>

        <div className="space-y-5 py-7">
          <div>
            <Activityfeed />
          </div>
          <div>
            <ActivityTable />
          </div>
        </div>
      </div>
    </>
  );
}
