// "use client";

// import React, { useState, useEffect } from "react";
// import Activeusers from "@/public/icons/cards/activeusers";
// import axios from "@/lib/axiosInstance"; // your axios instance

// export default function Card() {
//   const [totalThisWeek, setTotalThisWeek] = useState(0);
//   const [countThisWeek, setCountThisWeek] = useState(0);

//   useEffect(() => {
//     const fetchTransactionReport = async () => {
//       try {
//         const response = await axios.get("/Transaction/Report", {
//           timeout: 10000, // Increase timeout to 10 seconds
//         });
//         if (response.data.isSuccess) {
//           const data = response.data.data;
//           setTotalThisWeek(data.totalthisweek);
//           setCountThisWeek(data.countthisweek);
//         }
//       } catch (error) {
//         console.error("Error fetching transaction report:", error);
//       }
//     };

//     fetchTransactionReport();
//   }, []);

//   return (
//     <div className="bg-white shadow-lg rounded-lg font-light">
//       {/* Title and Logo */}
//       <div className="flex items-center border-b min-w-full py-4 px-5 space-x-2">
//         <div className="text-gray-700 text-sm">Total This Week</div>
//         <div className="text-blue-500 text-xl">
//           <Activeusers />
//         </div>
//       </div>

//       {/* Total This Week Amount and Count */}
//       <div className="py-4 space-y-8">
//         <div className="flex items-center px-5 space-x-2">
//           <div className="text-2xl font-bold text-gray-800">
//             &#x20A6;{totalThisWeek.toLocaleString()}
//           </div>
//         </div>

//         <div className="text-sm px-5 rounded flex items-center space-x-2">
//           <div className="bg-[#28A745] text-white p-1 rounded-lg text-xs">
//             {countThisWeek.toLocaleString()}
//           </div>
//           <div>This Week</div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Activeusers from "@/public/icons/cards/activeusers";
import axios from "@/lib/axiosInstance"; // your axios instance

export default function Card() {
  const [totalThisWeek, setTotalThisWeek] = useState(0);
  const [totalPreviousWeek, setTotalPreviousWeek] = useState(0);

  useEffect(() => {
    const fetchTransactionReport = async () => {
      try {
        const response = await axios.get("/Transaction/Report", {
          timeout: 10000, // Increase timeout to 10 seconds
        });
        if (response.data.isSuccess) {
          const data = response.data.data;
          setTotalThisWeek(data.totalthisweek);
          setTotalPreviousWeek(data.totalpreviousweek);
        }
      } catch (error) {
        console.error("Error fetching transaction report:", error);
      }
    };

    fetchTransactionReport();
  }, []);

  // Determine the arrow direction based on comparison
  const isPositiveChange = totalThisWeek >= totalPreviousWeek;

  return (
    <div className="bg-white shadow-lg rounded-lg font-light">
      {/* Title and Logo */}
      <div className="flex items-center border-b min-w-full py-4 px-5 space-x-2">
        <div className="text-gray-700 text-sm">Total This Week</div>
        <div className="text-blue-500 text-xl">
          <Activeusers />
        </div>
      </div>

      {/* Total This Week Amount and Trend */}
      <div className="py-4 space-y-8">
        {/* Total This Week Amount with Arrow */}
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

        {/* Total Previous Week Amount */}
        <div className="text-sm px-5 rounded flex items-center space-x-2">
          <div className="bg-gray-700 text-white p-1 rounded-lg text-xs">
            &#x20A6;{totalPreviousWeek.toLocaleString()}
          </div>
          <div>Previous Week</div>
        </div>
      </div>
    </div>
  );
}
