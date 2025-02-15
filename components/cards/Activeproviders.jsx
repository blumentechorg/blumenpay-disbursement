// "use client";

// import { useEffect, useState } from "react";
// import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
// import Providers from "@/public/icons/cards/providers";
// import axios from "@/lib/axiosInstance";

// export default function Card() {
//   const [totalCount, setTotalCount] = useState(0);
//   const [countThisMonth, setCountThisMonth] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/Transaction?pageNumber=1&pageSize=20", {
//           timeout: 10000, // Increase timeout to 10 seconds
//         });

//         if (response.data.isSuccess) {
//           const data = response.data.data;
//           setTotalCount(data.countalltime);
//           setCountThisMonth(data.countthismonth);
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
//         <div className="text-gray-700 text-sm">Total Transactions</div>
//         <div className="text-blue-500 text-xl">
//           <Providers />
//         </div>
//       </div>

//       {/* Amount and Arrow */}
//       <div className="py-4 space-y-8">
//         <div className="flex items-center px-5 space-x-2">
//           <div className="text-2xl font-bold text-gray-800">
//             {totalCount.toLocaleString()}
//           </div>
//         </div>

//         {/* Alert with Percentage */}
//         <div className="text-sm px-5 rounded flex items-center space-x-2">
//           <div
//             className={`p-1 rounded-lg text-xs text-white ${
//               countThisMonth >= 10 ? "bg-green-700" : "bg-red-500"
//             }`}
//           >
//             {countThisMonth.toLocaleString()}
//           </div>
//           <div>This Month</div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Providers from "@/public/icons/cards/providers";
import axios from "@/lib/axiosInstance";

export default function Card() {
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [transactionsThisMonth, setTransactionsThisMonth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "/Transaction?pageNumber=1&pageSize=20",
          {
            timeout: 10000, // Increase timeout to 10 seconds
          }
        );

        if (response.data.isSuccess) {
          // Get total transactions from the top-level property
          setTotalTransactions(response.data.totalCount);

          // Calculate the count for transactions created in the current month
          const transactions = response.data.data;
          const now = new Date();
          const currentYear = now.getFullYear();
          const currentMonth = now.getMonth(); // Months are zero-indexed

          const monthlyTransactions = transactions.filter((tx) => {
            const txDate = new Date(tx.createdAt);
            return (
              txDate.getFullYear() === currentYear &&
              txDate.getMonth() === currentMonth
            );
          });
          setTransactionsThisMonth(monthlyTransactions.length);
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
        <div className="text-gray-700 text-sm">Total Transactions</div>
        <div className="text-blue-500 text-xl">
          <Providers />
        </div>
      </div>

      {/* Total Transactions Count */}
      <div className="py-4 space-y-8">
        <div className="flex items-center px-5 space-x-2">
          <div className="text-2xl font-bold text-gray-800">
            {totalTransactions.toLocaleString()}
          </div>
        </div>

        {/* Monthly Transactions Count */}
        <div className="text-sm px-5 rounded flex items-center space-x-2">
          <div
            className={`p-1 rounded-lg text-xs text-white ${
              transactionsThisMonth >= 10 ? "bg-green-700" : "bg-red-500"
            }`}
          >
            {transactionsThisMonth.toLocaleString()}
          </div>
          <div>This Month</div>
        </div>
      </div>
    </div>
  );
}
