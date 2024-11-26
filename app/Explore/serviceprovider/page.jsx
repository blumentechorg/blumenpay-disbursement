import React from "react";
import Totalcollections from "@/components/cards/Totalcollections";
import Activeproviders from "@/components/cards/Activeproviders";
import Activeusers from "@/components/cards/Activeusers";
import PSearch from "@/components/providers/PSearch";
import ServiceProviderTable from "@/components/providers/Table";

export default function page() {
  return (
    <>
      <div className="space-y-5">
        <div className="grid grid-cols-3  gap-x-5  ">
          <Totalcollections />
          <Activeproviders />
          <Activeusers />
        </div>
        <div className="space-y-5">
          <PSearch />
          <ServiceProviderTable />
        </div>
      </div>
    </>
  );
}
