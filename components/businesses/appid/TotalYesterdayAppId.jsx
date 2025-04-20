"use client";

import { useEffect, useState } from "react";
import ProvidersIcon from "@/public/icons/cards/providers";
import axios from "@/lib/axiosInstance";

/**
 * TotalYesterdayCard component:
 * displays yesterday’s total amount and transaction count,
 * scoped to a single business via the appId prop.
 *
 * @param {{ appId?: string }} props
 */
export default function TotalYesterdayCard({ appId }) {
  const [totalYesterday, setTotalYesterday] = useState(0);
  const [countYesterday, setCountYesterday] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!appId) {
      // don’t fetch until we have an appId
      return;
    }

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
          setTotalYesterday(data.totalyesterday);
          setCountYesterday(data.countyesterday);
        } else {
          setError("Failed to fetch yesterday’s data.");
        }
      } catch (err) {
        console.error("Error fetching yesterday’s report:", err);
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
        <div className="text-gray-700 text-sm">Total Yesterday</div>
        <div className="text-blue-500 text-xl">
          <ProvidersIcon />
        </div>
      </div>

      {/* Loading / Error */}
      {loading ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">{error}</div>
      ) : (
        <div className="py-4 space-y-8">
          {/* Yesterday’s Total */}
          <div className="flex items-center px-5 space-x-2">
            <div className="text-2xl font-bold text-gray-800">
              &#x20A6;{totalYesterday.toLocaleString()}
            </div>
          </div>

          {/* Yesterday’s Count */}
          <div className="text-sm px-5 flex items-center space-x-2">
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
      )}
    </div>
  );
}
