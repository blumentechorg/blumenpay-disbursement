import React from "react";

export default function Label() {
  return (
    <>
      <div className="">
        <div className="flex">
          <button className="border py-3 px-5 rounded-l-md focus:bg-white active:bg-white hover:bg-white">
            Pending Disbursement
          </button>
          <button className="border py-3 px-5 rounded-r-md focus:bg-white active:bg-white hover:bg-white">
            Completed Disbursement
          </button>
        </div>
      </div>
    </>
  );
}
