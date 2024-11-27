import Filter from "@/components/transactions/TFilter";
import Search from "@/components/transactions/Tsearch";
import Table from "@/components/transactions/Table";
import React from "react";
import TransactionTable from "@/components/transactions/Table";

export default function page() {
  return (
    <>
      <div className="pb-7">
        <TransactionTable />
      </div>
    </>
  );
}
