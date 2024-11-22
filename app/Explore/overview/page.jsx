import React from "react";
import Totalcollections from "@/components/cards/Totalcollections";
import Activeproviders from "@/components/cards/Activeproviders";
import Activeusers from "@/components/cards/Activeusers";
import Totaldisbursements from "@/components/cards/Totaldisbursements";
import Pendingdisbursements from "@/components/cards/Pendingdisbursements";
import Failedtransactions from "@/components/cards/Failedtransactions";

export default function page() {
  return (
    <>
      <div>
        <div className="grid grid-cols-3 gap-y-10 gap-x-5 py-5">
          <Totalcollections />
          <Activeproviders />
          <Activeusers />
          <Totaldisbursements />
          <Pendingdisbursements />
          <Failedtransactions />
        </div>
        <div>Transactions table</div>
      </div>
    </>
  );
}
