// PreviousMonthCard.jsx
"use client";

import { useEffect, useState } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import PendingIcon from "@/public/icons/cards/pending";
import axios from "@/lib/axiosInstance";

/**
 * PreviousMonthCard component:
 * displays the total for the previous month and the change vs. the month before,
 * scoped to a single business via the appId.
 *
 * @param {{ appId?: string }} props
 */
export default function PreviousMonthCard({ appId }) {
  const [totalPreviousMonth, setTotalPreviousMonth] = useState(0);
  const [changeLastMonth, setChangeLastMonth] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!appId) {
      // nothing to fetch until we have an appId
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
          setTotalPreviousMonth(data.totalpreviousmonth);
          setChangeLastMonth(data.changelastmonth || 0);
        } else {
          setError("Failed to fetch previous-month data.");
        }
      } catch (err) {
        console.error("Error fetching previous-month report:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [appId]);

  // Determine arrow direction
  const isPositiveChange = changeLastMonth >= 0;

  return (
    <div className="bg-white shadow-lg rounded-lg font-light">
      {/* Title and Logo */}
      <div className="flex items-center border-b py-4 px-5 space-x-2">
        <div className="text-gray-700 text-sm">Total Previous Month</div>
        <div className="text-blue-500 text-xl">
          <PendingIcon />
        </div>
      </div>

      {/* Loading / Error */}
      {loading ? (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      ) : error ? (
        <div className="p-4 text-center text-red-500">{error}</div>
      ) : (
        // Amount and Arrow
        <div className="py-4 space-y-8">
          <div className="flex items-center px-5 space-x-2">
            <div className="text-2xl font-bold text-gray-800">
              &#x20A6;{totalPreviousMonth.toLocaleString()}
            </div>
            {isPositiveChange ? (
              <FaArrowTrendUp className="text-green-500 text-xl" />
            ) : (
              <FaArrowTrendDown className="text-red-500 text-xl" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
