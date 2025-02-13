// import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
// import Activeusers from "@/public/icons/cards/activeusers";

// export default function Card() {
//   return (
//     <div className="bg-white shadow-lg rounded-lg font-light ">
//       {/* Title and Logo */}
//       <div className="flex items-center  border-b min-w-full py-4 px-5 space-x-2 ">
//         <div className="text-gray-700 text-sm ">Daily Active Users</div>
//         <div className="text-blue-500 text-xl ">
//           <Activeusers />
//         </div>
//       </div>

//       {/* Amount and Arrow */}
//       <div className="py-4 space-y-8">
//         <div className=" flex items-center px-5 space-x-2">
//           <div className="text-2xl font-bold text-gray-800">1,000</div>
//           <FaArrowTrendUp className=" text-xl" />
//         </div>

//         {/* Alert with Percentage */}
//         <div className=" text-sm px-5 rounded flex items-center space-x-2 ">
//           <div className=" bg-[#28A745] text-white p-1 rounded-lg text-xs">
//             +15.6%
//           </div>
//           <div>Last 7 Days</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import React, { useState, useEffect } from "react";
// import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
// import Activeusers from "@/public/icons/cards/activeusers";
// import axios from "@/lib/axiosInstance"; // your axios instance

// export default function Card() {
//   const [activeCount, setActiveCount] = useState(0);

//   useEffect(() => {
//     const fetchActiveUsers = async () => {
//       try {
//         const response = await axios.get("/Team?pageNumber=1&pageSize=20", {
//           timeout: 10000,
//         });
//         const teamData = response.data.data || [];

//         // Format data similarly to your AdminTable component
//         const formattedData = teamData.map((item) => ({
//           id: item.user?.id || "N/A",
//           fullName: item.user?.fullName || "N/A",
//           role: item.title || "N/A",
//           status: item.active ? "Active" : "Inactive",
//           workplaces: [
//             item.teamMgt && "Admin",
//             item.transactionMgt && "Overview, Transactions",
//             item.settlementnMgt && "Disbursements",
//             item.appMgt && "Service Providers",
//             item.customerMgt && "Complain Tickets",
//           ]
//             .filter(Boolean)
//             .join(" | "),
//         }));

//         // Filter the users with "Active" status
//         const activeUsers = formattedData.filter(
//           (user) => user.status === "Active"
//         );
//         setActiveCount(activeUsers.length);
//       } catch (error) {
//         console.error("Error fetching active users:", error);
//       }
//     };

//     fetchActiveUsers();
//   }, []);

//   return (
//     <div className="bg-white shadow-lg rounded-lg font-light ">
//       {/* Title and Logo */}
//       <div className="flex items-center border-b min-w-full py-4 px-5 space-x-2 ">
//         <div className="text-gray-700 text-sm "> Active Users</div>
//         <div className="text-blue-500 text-xl ">
//           <Activeusers />
//         </div>
//       </div>

//       {/* Amount and Arrow */}
//       <div className="py-4 space-y-8">
//         <div className="flex items-center px-5 space-x-2">
//           <div className="text-2xl font-bold text-gray-800">{activeCount}</div>
//           <FaArrowTrendUp className="text-xl" />
//         </div>

//         {/* Alert with Percentage */}
//         <div className="text-sm px-5 rounded flex items-center space-x-2 ">
//           <div className="bg-[#28A745] text-white p-1 rounded-lg text-xs">
//             +15.6%
//           </div>
//           <div>Last 7 Days</div>
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
  const [activeCount, setActiveCount] = useState(0);
  const [activeLast7Days, setActiveLast7Days] = useState(0);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await axios.get("/Team?pageNumber=1&pageSize=20", {
          timeout: 10000,
        });
        const teamData = response.data.data || [];

        // Format data for the card, including createdAt (assuming it exists on item.user)
        const formattedData = teamData.map((item) => ({
          id: item.user?.id || "N/A",
          fullName: item.user?.fullName || "N/A",
          role: item.title || "N/A",
          status: item.active ? "Active" : "Inactive",
          createdAt: item.user?.createdAt, // Must be provided by your API
          workplaces: [
            item.teamMgt && "Admin",
            item.transactionMgt && "Overview, Transactions",
            item.settlementnMgt && "Disbursements",
            item.appMgt && "Service Providers",
            item.customerMgt && "Complain Tickets",
          ]
            .filter(Boolean)
            .join(" | "),
        }));

        // Count all active users
        const activeUsers = formattedData.filter(
          (user) => user.status === "Active"
        );
        setActiveCount(activeUsers.length);

        // Calculate the date 7 days ago
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Count active users created in the last 7 days
        const activeUsersLast7Days = activeUsers.filter((user) => {
          // Convert the createdAt string to a Date object (if available)
          const createdAt = new Date(user.createdAt);
          return createdAt >= sevenDaysAgo;
        });
        setActiveLast7Days(activeUsersLast7Days.length);
      } catch (error) {
        console.error("Error fetching active users:", error);
      }
    };

    fetchActiveUsers();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-lg font-light ">
      {/* Title and Logo */}
      <div className="flex items-center border-b min-w-full py-4 px-5 space-x-2 ">
        <div className="text-gray-700 text-sm">Active Users</div>
        <div className="text-blue-500 text-xl">
          <Activeusers />
        </div>
      </div>

      {/* Amount and Trend */}
      <div className="py-4 space-y-8">
        <div className="flex items-center px-5 space-x-2">
          <div className="text-2xl font-bold text-gray-800">{activeCount}</div>
          {/* <FaArrowTrendUp className="text-xl" /> */}
        </div>

        {/* Active Users in the Last 7 Days */}
        <div className="text-sm px-5 rounded flex items-center space-x-2">
          <div className="bg-[#28A745] text-white p-1 rounded-lg text-xs">
            {activeLast7Days}
          </div>
          <div>in last 7 days</div>
        </div>
      </div>
    </div>
  );
}
