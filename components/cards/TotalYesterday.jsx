"use client";

import { useEffect, useState } from "react";
import Providers from "@/public/icons/cards/providers";
import axios from "@/lib/axiosInstance";

export default function Card() {
  const [totalYesterday, setTotalYesterday] = useState(0);
  const [countYesterday, setCountYesterday] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/Transaction/Report", {
          timeout: 10000, // Increased timeout to 10 seconds
        });
        if (response.data.isSuccess) {
          const data = response.data.data;
          setTotalYesterday(data.totalyesterday);
          setCountYesterday(data.countyesterday);
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
          <div className="text-gray-700 text-sm">Total Yesterday</div>
          <div className="text-blue-500 text-xl">
            <Providers />
          </div>
        </div>

        {/* Total Yesterday Amount */}
        <div className="py-4 space-y-8">
          <div className="flex items-center px-5 space-x-2">
            <div className="text-2xl font-bold text-gray-800">
              &#x20A6;{totalYesterday.toLocaleString()}
            </div>
          </div>

          {/* Count of Transactions Yesterday */}
          <div className="text-sm px-5 rounded flex items-center space-x-2">
            <div
              className={`p-1 rounded-lg text-xs text-white ${
                countYesterday >= 10 ? "bg-green-700" : "bg-red-500"
              }`}
            >
              {countYesterday.toLocaleString()}
            </div>
            <div>Transactions Yesterday</div>
          </div>
        </div>
      </div>
    </div>
  );
}
