// "use client";

// import { useEffect, useState } from "react";
// import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
// import { GiTakeMyMoney } from "react-icons/gi";

// import PendingIcon from "@/public/icons/cards/pending";
// import axios from "@/lib/axiosInstance";

// export default function FundsweepToggle({ appId }) {
//   const [activeTab, setActiveTab] = useState("pending");
//   const [pendingReports, setPendingReports] = useState([]);
//   const [completedReports, setCompletedReports] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchReport = async () => {
//     setLoading(true);
//     try {
//       const resp = await axios.get("/Transaction/FundsweepReport", {
//         params: appId != null ? { appId } : {},
//         timeout: 10000,
//       });

//       if (resp.data.isSuccess) {
//         const { pending, completed } = resp.data.data;
//         setPendingReports(Array.isArray(pending) ? pending : [pending]);
//         setCompletedReports(Array.isArray(completed) ? completed : [completed]);
//       }
//     } catch (err) {
//       console.error("Error fetching fundsweep report:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReport();
//   }, [appId]);

//   const currentReports =
//     activeTab === "pending" ? pendingReports : completedReports;

//   return (
//     <div className="space-y-6">
//       {/* Toggle Buttons */}
//       <div className="flex gap-4">
//         {["pending", "completed"].map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 rounded-md font-medium ${
//               activeTab === tab
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-700"
//             }`}
//           >
//             {tab.charAt(0).toUpperCase() + tab.slice(1)} Disbursement
//           </button>
//         ))}
//       </div>

//       {loading ? (
//         <p className="text-center">Loading...</p>
//       ) : (
//         <>
//           {currentReports.length === 0 ? (
//             <p className="text-center text-gray-500">No data available.</p>
//           ) : (
//             currentReports.map((report) => {
//               const metrics = [
//                 { title: "Amount", value: report.amount },
//                 { title: "Commission", value: report.blumenpaycommission },
//                 { title: "Profit", value: report.blumenpayprofit },
//                 { title: "Fee Incurred", value: report.feeincured },
//               ];

//               return (
//                 <div key={report.appId} className="space-y-4">
//                   {/* <h3 className="text-lg font-semibold text-gray-800">
//                     {report.appname}
//                   </h3> */}
//                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//                     {metrics.map(({ title, value }) => (
//                       <Card key={title} title={title} amount={value} />
//                     ))}
//                   </div>
//                 </div>
//               );
//             })
//           )}
//         </>
//       )}
//     </div>
//   );
// }

// function Card({ title, amount }) {
//   // no "change" data yet, so we’ll always show a neutral icon
//   return (
//     <div className="bg-white shadow-lg rounded-lg font-light ">
//       <div className="flex items-center border-b py-3 px-5 space-x-2">
//         <div className="text-black text-sm">{title}</div>
//         <div className="text-blue-500 text-xl">
//           <GiTakeMyMoney />
//         </div>
//       </div>
//       <div className="flex items-center justify-between py-4 px-5">
//         <div className="text-2xl font-bold text-gray-800">
//           &#x20A6;{amount.toLocaleString()}
//         </div>
//         {/* Placeholder for trend icon
//         <FaArrowTrendUp className="text-gray-300 text-xl" /> */}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { GiTakeMyMoney } from "react-icons/gi";
import {
  FaCashRegister,
  FaDollarSign,
  FaReceipt,
  FaMoneyBillTransfer,
} from "react-icons/fa6";
import axios from "@/lib/axiosInstance";

export default function DisbursementCards({ appId }) {
  // ←─ STATE DEFINITIONS YOU’LL NEED ─→
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingReports, setPendingReports] = useState([]);
  const [completedReports, setCompletedReports] = useState([]);
  const [loading, setLoading] = useState(false);

  // ←─ FETCH LOGIC ─→
  const fetchReport = async () => {
    setLoading(true);
    try {
      const resp = await axios.get("/Transaction/FundsweepReport", {
        params: appId != null ? { appId } : {},
        timeout: 10000,
      });
      if (resp.data.isSuccess) {
        const { pending, completed } = resp.data.data;
        setPendingReports(Array.isArray(pending) ? pending : [pending]);
        setCompletedReports(Array.isArray(completed) ? completed : [completed]);
      }
    } catch (err) {
      console.error("Error fetching fundsweep report:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [appId]);

  const currentReports =
    activeTab === "pending" ? pendingReports : completedReports;

  return (
    <div className="space-y-6">
      {/* Toggle Buttons */}
      <div className="flex gap-4">
        {["pending", "completed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md font-medium ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Disbursement
          </button>
        ))}
      </div>

      {/* Loading / Empty / Cards */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : currentReports.length === 0 ? (
        <p className="text-center text-gray-500">No data available.</p>
      ) : (
        currentReports.map((report) => {
          const metrics = [
            {
              title: "Amount",
              value: report.amount,
              icon: <FaMoneyBillTransfer className="text-blue-500 text-xl" />,
            },
            {
              title: "Commission",
              value: report.blumenpaycommission,
              icon: <FaCashRegister className="text-green-500 text-xl" />,
            },
            {
              title: "Profit",
              value: report.blumenpayprofit,
              icon: <FaDollarSign className="text-indigo-500 text-xl" />,
            },
            {
              title: "Fee Incurred",
              value: report.feeincured,
              icon: <FaReceipt className="text-red-500 text-xl" />,
            },
          ];

          return (
            <div key={report.appId} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map(({ title, value, icon }) => (
                  <Card
                    key={title}
                    title={title}
                    amount={value}
                    IconComponent={icon}
                  />
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

function Card({ title, amount, IconComponent }) {
  return (
    <div className="bg-white shadow-lg rounded-lg font-light">
      <div className="flex items-center border-b py-3 px-5 space-x-2">
        <div className="text-black text-sm">{title}</div>
        <div>{IconComponent}</div>
      </div>
      <div className="flex items-center justify-between py-4 px-5">
        <div className="text-2xl font-bold text-gray-800">
          &#x20A6;{(amount ?? 0).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
