// TotalTodayCard.jsx
"use client";

import { useEffect, useState } from "react";
import WalletIcon from "@/public/icons/cards/wallet";
import axios from "@/lib/axiosInstance";

/**
 * TotalTodayCard component:
 * displays today's total amount and count of transactions,
 * scoped to a single business via appId.
 *
 * @param {{ appId?: string }} props
 */
export default function TotalTodayCard({ appId }) {
  const [totalToday, setTotalToday] = useState(0);
  const [countToday, setCountToday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!appId) return; // don't fetch until we have an appId

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/Transaction/Report", {
          params: { appId },
          timeout: 10000,
        });

        if (response.data.isSuccess) {
          const data = response.data.data;
          setTotalToday(data.totaltoday);
          setCountToday(data.counttoday);
        } else {
          setError("Failed to fetch today's data.");
        }
      } catch (err) {
        console.error("Error fetching today's report:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appId]);

  return (
    <div className="bg-white shadow-lg rounded-lg font-light">
      {/* Header */}
      <div className="flex items-center border-b py-4 px-5 space-x-2">
        <div className="text-gray-700 text-sm">Total Today</div>
        <div className="text-blue-500 text-xl">
          <WalletIcon />
        </div>
      </div>

      {/* Loading / Error */}
      {loading ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">{error}</div>
      ) : (
        <div className="py-4 space-y-8">
          {/* Total Amount */}
          <div className="flex items-center px-5">
            <div className="text-2xl font-bold text-gray-800">
              &#x20A6;{totalToday.toLocaleString()}
            </div>
          </div>

          {/* Transaction Count */}
          <div className="text-sm px-5 flex items-center space-x-2">
            <div className="bg-blue-500 text-white p-1 rounded-lg text-xs">
              {countToday.toLocaleString()}
            </div>
            <div>Transactions Today</div>
          </div>
        </div>
      )}
    </div>
  );
}
