// "use client";

// import { useEffect, useState } from "react";
// import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
// import Wallet from "@/public/icons/cards/wallet";
// import axios from "@/lib/axiosInstance";

// export default function Card() {
//   const [totalToday, setTotalToday] = useState(0);
//   const [percentageChange, setPercentageChange] = useState(0);
//   const [isPositiveChange, setIsPositiveChange] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/Transaction/Report", {
//           timeout: 10000, // Increased timeout to 10 seconds
//         });
//         if (response.data.isSuccess) {
//           const data = response.data.data;
//           const todayTotal = data.totaltoday;
//           const yesterdayTotal = data.totalyesterday;

//           setTotalToday(todayTotal);

//           // Calculate the percentage change
//           let computedPercentage = 0;
//           if (yesterdayTotal !== 0) {
//             computedPercentage =
//               ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100;
//           } else {
//             // If there was no collection yesterday and there is some today, treat it as 100% change.
//             computedPercentage = todayTotal > 0 ? 100 : 0;
//           }

//           // Determine if the change is positive (or equal)
//           const positive = todayTotal >= yesterdayTotal;
//           setPercentageChange(computedPercentage);
//           setIsPositiveChange(positive);
//         }
//       } catch (error) {
//         console.error("Error fetching transaction report:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="bg-white shadow-lg rounded-lg font-light">
//       {/* Title and Logo */}
//       <div className="flex items-center border-b min-w-full py-4 px-5 space-x-2">
//         <div className="text-gray-700 text-sm">Total Today</div>
//         <div className="text-blue-500 text-xl">
//           <Wallet />
//         </div>
//       </div>

//       {/* Amount and Arrow */}
//       <div className="py-4 space-y-8">
//         <div className="flex items-center px-5 space-x-2">
//           <div className="text-2xl font-bold text-gray-800">
//             &#x20A6;{totalToday.toLocaleString()}
//           </div>
//           {isPositiveChange ? (
//             <FaArrowTrendUp className="text-green-500 text-xl" />
//           ) : (
//             <FaArrowTrendDown className="text-red-500 text-xl" />
//           )}
//         </div>

//         {/* Alert with Percentage */}
//         <div className="text-sm px-5 rounded flex items-center space-x-2">
//           <div
//             className={`p-1 rounded-lg text-xs ${
//               isPositiveChange
//                 ? "bg-[#28A745] text-white"
//                 : "bg-red-500 text-white"
//             }`}
//           >
//             {isPositiveChange
//               ? `+${percentageChange.toFixed(1)}%`
//               : `${percentageChange.toFixed(1)}%`}
//           </div>
//           <div>Since Yesterday</div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
    <div className="bg-white shadow-lg rounded-lg font-light">
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
  );
}
