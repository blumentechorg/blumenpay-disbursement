"use client";

import { useEffect, useState } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Wallet from "@/public/icons/cards/wallet";
import axios from "@/lib/axiosInstance";

export default function Card() {
  const [totalCollections, setTotalCollections] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [isPositiveChange, setIsPositiveChange] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/Transaction/Report", {
          timeout: 10000, // Increase timeout to 10 seconds
        });
        if (response.data.isSuccess) {
          const data = response.data.data;
          setTotalCollections(data.totalalltime); // Change this based on which data you want to show
          setPercentageChange(data.changelastweek || 0);
          setIsPositiveChange((data.changelastweek || 0) >= 0);
        }
      } catch (error) {
        console.error("Error fetching transaction report:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg font-light">
      {/* Title and Logo */}
      <div className="flex items-center border-b min-w-full py-4 px-5 space-x-2">
        <div className="text-gray-700 text-sm">Total Collections</div>
        <div className="text-blue-500 text-xl">
          <Wallet />
        </div>
      </div>

      {/* Amount and Arrow */}
      <div className="py-4 space-y-8">
        <div className="flex items-center px-5 space-x-2">
          <div className="text-2xl font-bold text-gray-800">
            &#x20A6;{totalCollections.toLocaleString()}
          </div>
          {isPositiveChange ? (
            <FaArrowTrendUp className="text-green-500 text-xl" />
          ) : (
            <FaArrowTrendDown className="text-red-500 text-xl" />
          )}
        </div>

        {/* Alert with Percentage */}
        <div className="text-sm px-5 rounded flex items-center space-x-2">
          <div
            className={`p-1 rounded-lg text-xs ${
              isPositiveChange
                ? "bg-[#28A745] text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {isPositiveChange
              ? `+${percentageChange.toFixed(1)}%`
              : `${percentageChange.toFixed(1)}%`}
          </div>
          <div>Last 7 Days</div>
        </div>
      </div>
    </div>
  );
}
