import React from "react";

export default function Label() {
  return (
    <>
      <div className="">
        <div className="flex text-sm font-semibold">
          <button className="border py-3 px-5 rounded-l-md focus:bg-white active:bg-white hover:bg-white">
            All Tickets
          </button>
          <button className="border py-3 px-5  focus:bg-white active:bg-white hover:bg-white">
            Open Tickets
          </button>
          <button className="border py-3 px-5  focus:bg-white active:bg-white hover:bg-white">
            Inprogress
          </button>
          <button className="border py-3 px-5 rounded-r-md focus:bg-white active:bg-white hover:bg-white">
            Resolved
          </button>
        </div>
      </div>
    </>
  );
}
