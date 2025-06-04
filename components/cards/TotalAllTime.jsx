"use client";

import { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import Total from "@/public/icons/cards/total"; // Use an appropriate icon for "Total All Time"
import axios from "@/lib/axiosInstance";

export default function Card() {
  const [totalAllTime, setTotalAllTime] = useState(0);
  const [countAllTime, setCountAllTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/Transaction/Report", {
          timeout: 10000, // Increased timeout to 10 seconds
        });
        if (response.data.isSuccess) {
          const data = response.data.data;
          setTotalAllTime(data.totalalltime);
          setCountAllTime(data.countalltime);
        }
      } catch (error) {
        console.error("Error fetching transaction report:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] px-">
      <div className="bg-white shadow-lg rounded-lg font-light ">
        {/* Title and Logo */}
        <div className="flex items-center border-b min-w-full py-4 px-5 space-x-2">
          <div className="text-gray-700 text-sm">Total All Time</div>
          <div className="text-blue-500 text-xl">
            <Total />
          </div>
        </div>

        {/* Amount and Arrow */}
        <div className="py-4 space-y-8">
          <div className="flex items-center px-5 space-x-2">
            <div className="text-2xl font-bold text-gray-800">
              &#x20A6;{totalAllTime.toLocaleString()}
            </div>
            {/* Default arrow (upward) is shown as a visual cue */}
            <FaArrowTrendUp className="text-green-500 text-xl" />
          </div>

          {/* Display Count All Time */}
          <div className="text-sm px-5 rounded flex items-center space-x-2">
            <div className="bg-[#0052CC] text-white p-1 rounded-lg text-xs">
              {countAllTime.toLocaleString()}
            </div>
            <div>Transactions All Time</div>
          </div>
        </div>
      </div>
    </div>
  );
}
