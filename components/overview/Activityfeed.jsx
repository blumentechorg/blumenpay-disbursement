import React from "react";

import { IoFilterOutline } from "react-icons/io5";
export default function Activityfeed() {
  return (
    <div>
      <div className="flex text-sm items-center border bg-white border-gray-300  rounded-lg h-8 px-2 w-[350px] ">
        <div className="font-bold">Realtime Activity Feed</div>
        {/* Search Input */}
        <div className="flex-1 text-sm focus:outline-none" />
        {/* Filter Button */}
        <button className="flex items-center border-l  font-light space-x-2  px-4  h-8 rounded- text-sm  focus:outline-none  ">
          <div>Filter</div>
          <div>
            {" "}
            <IoFilterOutline className="mr-2" />
          </div>
        </button>
      </div>
    </div>
  );
}
