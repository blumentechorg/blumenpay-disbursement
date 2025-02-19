// // import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
// // import Total from "@/public/icons/cards/total";

// // export default function Card() {
// //   return (
// //     <div className="bg-white shadow-lg rounded-lg font-light ">
// //       {/* Title and Logo */}
// //       <div className="flex items-center  border-b min-w-full py-4 px-5 space-x-2 ">
// //         <div className="text-gray-700 text-sm ">Total Disbursements</div>
// //         <div className="text-blue-500 text-xl ">
// //           <Total />
// //         </div>
// //       </div>

// //       {/* Amount and Arrow */}
// //       <div className="py-4 space-y-8">
// //         <div className=" flex items-center px-5 space-x-2">
// //           <div className="text-2xl font-bold text-gray-800">$98,500</div>
// //           <FaArrowTrendUp className=" text-xl" />
// //         </div>

// //         {/* Alert with Percentage */}
// //         <div className=" text-sm px-5 rounded flex items-center space-x-2 ">
// //           <div className=" bg-[#0052CC] text-white p-1 rounded-lg text-xs">
// //             +15.6%
// //           </div>
// //           <div>Last 7 Days</div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useEffect, useState } from "react";
// import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
// import Total from "@/public/icons/cards/total";
// import axios from "@/lib/axiosInstance";

// export default function Card() {
//   const [totalThisMonth, setTotalThisMonth] = useState(0);
//   const [totalPreviousMonth, setTotalPreviousMonth] = useState(0);
//   const [changeLastMonth, setChangeLastMonth] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/Transaction/Report", {
//           timeout: 10000, // Increase timeout to 10 seconds
//         });
//         if (response.data.isSuccess) {
//           const data = response.data.data;
//           setTotalThisMonth(data.totalthismonth);
//           setTotalPreviousMonth(data.totalpreviousmonth);
//           setChangeLastMonth(data.changelastmonth || 0);
//         }
//       } catch (error) {
//         console.error("Error fetching transaction report:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const isPositiveChange = changeLastMonth >= 0;

//   return (
//     <div className="bg-white shadow-lg rounded-lg font-light">
//       {/* Title and Logo */}
//       <div className="flex items-center border-b min-w-full py-4 px-5 space-x-2">
//         <div className="text-gray-700 text-sm">Total Disbursements</div>
//         <div className="text-blue-500 text-xl">
//           <Total />
//         </div>
//       </div>

//       {/* Amount and Arrow */}
//       <div className="py-4 space-y-8">
//         {/* Total This Month Amount with Arrow */}
//         <div className="flex items-center px-5 space-x-2">
//           <div className="text-2xl font-bold text-gray-800">
//             &#x20A6;{totalThisMonth.toLocaleString()}
//           </div>
//           {isPositiveChange ? (
//             <FaArrowTrendUp className="text-green-500 text-xl" />
//           ) : (
//             <FaArrowTrendDown className="text-red-500 text-xl" />
//           )}
//         </div>

//         {/* Percentage Change based on Last Month */}
//         {/* <div className="text-sm px-5 rounded flex items-center space-x-2">
//           <div
//             className={`p-1 rounded-lg text-xs ${
//               isPositiveChange
//                 ? "bg-green-500 text-white"
//                 : "bg-red-500 text-white"
//             }`}
//           >
//             {isPositiveChange
//               ? `+${changeLastMonth.toFixed(1)}%`
//               : `${changeLastMonth.toFixed(1)}%`}
//           </div>
//           <div>Last Month</div>
//         </div> */}

//         {/* Total Previous Month */}
//         <div className="text-sm px-5 rounded flex items-center space-x-2">
//           <div className="bg-gray-700 text-white p-1 rounded-lg text-xs">
//             &#x20A6;{totalPreviousMonth.toLocaleString()}
//           </div>
//           <div>Previous Month</div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import Total from "@/public/icons/cards/total";
import axios from "@/lib/axiosInstance";

export default function Card() {
  const [totalThisMonth, setTotalThisMonth] = useState(0);
  const [totalPreviousMonth, setTotalPreviousMonth] = useState(0);
  const [changeLastMonth, setChangeLastMonth] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/Transaction/Report", {
          timeout: 10000, // Increased timeout to 10 seconds
        });
        if (response.data.isSuccess) {
          const data = response.data.data;
          setTotalThisMonth(data.totalthismonth);
          setTotalPreviousMonth(data.totalpreviousmonth);
          setChangeLastMonth(data.changelastmonth || 0);
        }
      } catch (error) {
        console.error("Error fetching transaction report:", error);
      }
    };

    fetchData();
  }, []);

  // Use changelastmonth to determine the arrow icon
  const isPositiveChange = changeLastMonth >= 0;

  return (
    <div className="bg-white shadow-lg rounded-lg font-light">
      {/* Title and Logo */}
      <div className="flex items-center border-b min-w-full py-4 px-5 space-x-2">
        <div className="text-gray-700 text-sm">Total This Month</div>
        <div className="text-blue-500 text-xl">
          <Total />
        </div>
      </div>

      {/* Amount and Arrow for Total This Month */}
      <div className="py-4 space-y-8">
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

        {/* Display Total Previous Month */}
        <div className="text-sm px-5 rounded flex items-center space-x-2">
          <div className="bg-gray-700 text-white p-1 rounded-lg text-xs">
            &#x20A6;{totalPreviousMonth.toLocaleString()}
          </div>
          <div>Previous Month</div>
        </div>
      </div>
    </div>
  );
}
