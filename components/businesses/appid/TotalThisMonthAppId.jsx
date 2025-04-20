// TotalThisMonthCard.jsx
"use client";

import { useEffect, useState } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import TotalIcon from "@/public/icons/cards/total";
import axios from "@/lib/axiosInstance";

/**
 * TotalThisMonthCard component:
 * displays the total for this month, the previous month,
 * and the month‑over‑month change, scoped to a single business via appId.
 *
 * @param {{ appId?: string }} props
 */
export default function TotalThisMonthCard({ appId }) {
  const [totalThisMonth, setTotalThisMonth] = useState(0);
  const [totalPreviousMonth, setTotalPreviousMonth] = useState(0);
  const [changeLastMonth, setChangeLastMonth] = useState(0);
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
          setTotalThisMonth(data.totalthismonth);
          setTotalPreviousMonth(data.totalpreviousmonth);
          setChangeLastMonth(data.changelastmonth || 0);
        } else {
          setError("Failed to fetch monthly totals.");
        }
      } catch (err) {
        console.error("Error fetching monthly report:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appId]);

  const isPositiveChange = changeLastMonth >= 0;

  return (
    <div className="bg-white shadow-lg rounded-lg font-light">
      {/* Title and Icon */}
      <div className="flex items-center border-b py-4 px-5 space-x-2">
        <div className="text-gray-700 text-sm">Total This Month</div>
        <div className="text-blue-500 text-xl">
          <TotalIcon />
        </div>
      </div>

      {/* Loading / Error */}
      {loading ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">{error}</div>
      ) : (
        <div className="py-4 space-y-4">
          {/* This Month Amount & Arrow */}
          <div className="flex items-center px-5 space-x-2">
            <div className="text-2xl font-bold text-gray-800">
              &#x20A6;{totalThisMonth.toLocaleString()}
            </div>
            {isPositiveChange ? (
              <FaArrowTrendUp className="text-green-500 text-xl" />
            ) : (
              <FaArrowTrendDown className="text-red-500 text-xl" />
            )}
          </div>

          {/* Previous Month */}
          <div className="text-sm px-5 flex items-center space-x-2">
            <div className="bg-gray-700 text-white p-1 rounded-lg text-xs">
              &#x20A6;{totalPreviousMonth.toLocaleString()}
            </div>
            <div>Previous Month</div>
          </div>
        </div>
      )}
    </div>
  );
}
