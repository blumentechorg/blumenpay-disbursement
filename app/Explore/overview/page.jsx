import React from "react";
import Totalcollections from "@/components/cards/Totalcollections";
import Activeproviders from "@/components/cards/Activeproviders";
import Activeusers from "@/components/cards/Activeusers";
import Totaldisbursements from "@/components/cards/Totaldisbursements";
import Pendingdisbursements from "@/components/cards/Pendingdisbursements";
import Failedtransactions from "@/components/cards/Failedtransactions";
import Activityfeed from "@/components/overview/Activityfeed";
import ActivityTable from "@/components/overview/ActivityTable";

export default function page() {
  return (
    <>
      <div className="space-y-12">
        <div className="grid grid-cols-3 gap-y-10 gap-x-5 py-5">
          <Totalcollections />
          <Activeproviders />
          <Activeusers />
          <Totaldisbursements />
          <Pendingdisbursements />
          <Failedtransactions />
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
