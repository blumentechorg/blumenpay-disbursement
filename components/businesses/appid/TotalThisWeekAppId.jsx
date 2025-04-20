// TotalThisWeekCard.jsx
"use client";

import { useEffect, useState } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import ActiveUsersIcon from "@/public/icons/cards/activeusers";
import axios from "@/lib/axiosInstance";

/**
 * TotalThisWeekCard component:
 * displays the total for this week and the previous week,
 * scoped to a single business via appId.
 *
 * @param {{ appId?: string }} props
 */
export default function TotalThisWeekCard({ appId }) {
  const [totalThisWeek, setTotalThisWeek] = useState(0);
  const [totalPreviousWeek, setTotalPreviousWeek] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!appId) {
      // don't fetch until we have an appId
      return;
    }

    const fetchReport = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/Transaction/Report", {
          params: { appId },
          timeout: 10000,
        });

        if (response.data.isSuccess) {
          const data = response.data.data;
          setTotalThisWeek(data.totalthisweek);
          setTotalPreviousWeek(data.totalpreviousweek);
        } else {
          setError("Failed to fetch weekly data.");
        }
      } catch (err) {
        console.error("Error fetching weekly report:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [appId]);

  // Determine arrow direction
  const isPositiveChange = totalThisWeek >= totalPreviousWeek;

  return (
    <div className="bg-white shadow-lg rounded-lg font-light">
      {/* Title and Icon */}
      <div className="flex items-center border-b py-4 px-5 space-x-2">
        <div className="text-gray-700 text-sm">Total This Week</div>
        <div className="text-blue-500 text-xl">
          <ActiveUsersIcon />
        </div>
      </div>

      {/* Loading / Error */}
      {loading ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">{error}</div>
      ) : (
        <div className="py-4 space-y-8">
          {/* Total This Week + Trend Arrow */}
          <div className="flex items-center px-5 space-x-2">
            <div className="text-2xl font-bold text-gray-800">
              &#x20A6;{totalThisWeek.toLocaleString()}
            </div>
            {isPositiveChange ? (
              <FaArrowTrendUp className="text-green-500 text-xl" />
            ) : (
              <FaArrowTrendDown className="text-red-500 text-xl" />
            )}
          </div>

          {/* Previous Week */}
          <div className="text-sm px-5 flex items-center space-x-2">
            <div className="bg-gray-700 text-white p-1 rounded-lg text-xs">
              &#x20A6;{totalPreviousWeek.toLocaleString()}
            </div>
            <div>Previous Week</div>
          </div>
        </div>
      )}
    </div>
  );
}
