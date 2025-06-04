"use client";

import { useEffect, useState } from "react";
import Wallet from "@/public/icons/cards/wallet";
import axios from "@/lib/axiosInstance";

export default function Card() {
  const [totalToday, setTotalToday] = useState(0);
  const [countToday, setCountToday] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/Transaction/Report", {
          timeout: 10000, // Increased timeout to 10 seconds
        });
        if (response.data.isSuccess) {
          const data = response.data.data;
          setTotalToday(data.totaltoday);
          setCountToday(data.counttoday);
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
          <div className="text-gray-700 text-sm">Total Today</div>
          <div className="text-blue-500 text-xl">
            <Wallet />
          </div>
        </div>

        {/* Total Amount */}
        <div className="py-4 space-y-8">
          <div className="flex items-center px-5">
            <div className="text-2xl font-bold text-gray-800">
              &#x20A6;{totalToday.toLocaleString()}
            </div>
          </div>

          {/* Count of Transactions Today */}
          <div className="text-sm px-5 rounded flex items-center space-x-2">
            <div className="bg-blue-500 text-white p-1 rounded-lg text-xs">
              {countToday.toLocaleString()}
            </div>
            <div>Transactions Today</div>
          </div>
        </div>
      </div>
    </div>
  );
}
