// "use client";

// import React, { useState, useEffect } from "react";
// import axiosInstance from "@/lib/axiosInstance";
// import { Line } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, parse } from "date-fns";

// Chart.register(...registerables);

// // Custom DatePicker that forces YYYY‑MM‑DD format
// const CustomDatePicker = ({ value, onChange }) => {
//   const parsed = value ? parse(value, "yyyy-MM-dd", new Date()) : null;
//   const handle = (d) => onChange(d ? format(d, "yyyy-MM-dd") : "");
//   return (
//     <DatePicker
//       selected={parsed}
//       onChange={handle}
//       dateFormat="yyyy-MM-dd"
//       placeholderText="YYYY‑MM‑DD"
//       className="border border-gray-300 rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//     />
//   );
// };

// export default function Chartjs({ appId }) {
//   const [transactions, setTransactions] = useState([]);
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch chart data for this appId (and optional date range)
//   const fetchData = async () => {
//     if (!appId) return;
//     setLoading(true);
//     setError("");

//     try {
//       const params = {
//         appId,
//         start: start || undefined,
//         end: end || undefined,
//       };

//       const response = await axiosInstance.get("/Transaction/Chart", {
//         params,
//       });
//       if (response.data?.isSuccess) {
//         setTransactions(response.data.data);
//       } else {
//         throw new Error("API returned an unsuccessful response");
//       }
//     } catch (err) {
//       console.error("Error fetching chart data:", err);
//       setError("Error fetching chart data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Initial load when appId changes
//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [appId]);

//   // Format raw date to YYYY‑MM‑DD
//   const formatDate = (d) => new Date(d).toISOString().split("T")[0];

//   // Build chart dataset
//   const chartData = transactions.length
//     ? {
//         labels: transactions.map((tx) => formatDate(tx.transactiondate)),
//         datasets: [
//           {
//             label: "Total Amount",
//             data: transactions.map((tx) => tx.totalamount),
//             fill: true,
//             tension: 0.3,
//           },
//         ],
//       }
//     : { labels: [], datasets: [] };

//   // Chart options (keep your styling here)
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: true, position: "top" },
//       title: { display: true, text: "Transaction Volume" },
//       tooltip: {},
//     },
//     scales: {
//       x: { ticks: { callback: (v) => v } },
//       y: { ticks: { callback: (v) => `₦${v}` } },
//     },
//   };

//   return (
//     <div className="w-full">
//       {/* Date filters */}
//       <div className="flex space-x-2 mb-4 w-[400px]">
//         <div className="w-1/2 text-xs">
//           <CustomDatePicker value={start} onChange={setStart} />
//         </div>
//         <div className="w-1/2 text-xs">
//           <CustomDatePicker value={end} onChange={setEnd} />
//         </div>
//         <button
//           onClick={fetchData}
//           className="bg-blue-600 text-white px-4 py-2 text-xs rounded-lg hover:bg-blue-700"
//         >
//           Filter
//         </button>
//       </div>

//       {loading && <p className="text-center text-gray-500">Loading...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {!loading && !error && transactions.length > 0 && (
//         <div className="h-[400px]">
//           <Line data={chartData} options={chartOptions} />
//         </div>
//       )}

//       {!loading && !error && transactions.length === 0 && (
//         <p className="text-center text-gray-600">No data available.</p>
//       )}
//     </div>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import "chartjs-adapter-moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

Chart.register(...registerables);

// DatePicker forcing YYYY‑MM‑DD
const CustomDatePicker = ({ value, onChange }) => {
  const parsed = value ? parse(value, "yyyy-MM-dd", new Date()) : null;
  const handle = (d) => onChange(d ? format(d, "yyyy-MM-dd") : "");
  return (
    <DatePicker
      selected={parsed}
      onChange={handle}
      dateFormat="yyyy-MM-dd"
      placeholderText="YYYY‑MM‑DD"
      className="border border-gray-300 rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default function Chartjs({ appId }) {
  const [transactions, setTransactions] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!appId) return;
    setLoading(true);
    setError("");

    try {
      const params = {
        appId,
        start: start || undefined,
        end: end || undefined,
      };
      const { data: resp } = await axiosInstance.get("/Transaction/Chart", {
        params,
      });
      if (resp.isSuccess) setTransactions(resp.data);
      else throw new Error("Unsuccessful response");
    } catch (err) {
      console.error("Error fetching chart data:", err);
      setError("Error fetching chart data");
    } finally {
      setLoading(false);
    }
  };

  // reload whenever appId changes
  useEffect(() => {
    fetchData();
  }, [appId]);

  // build dataset as { x: date, y: amount }
  const chartData = {
    datasets: [
      {
        label: "Total Amount",
        data: transactions.map((tx) => ({
          x: new Date(tx.transactiondate),
          y: tx.totalamount,
        })),
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time", // ← use time axis
        time: {
          parser: "YYYY-MM-DD",
          unit: "day",
          displayFormats: { day: "yyyy-MM-dd" },
        },
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        ticks: {
          callback: (v) => `₦${v}`,
        },
        title: {
          display: true,
          text: "Amount",
        },
      },
    },
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Transaction Volume Over Time" },
      tooltip: { mode: "index", intersect: false },
    },
  };

  return (
    <div className="w-full">
      <div className="flex space-x-2 mb-4 w-[400px]">
        <div className="w-1/2 text-xs">
          <CustomDatePicker value={start} onChange={setStart} />
        </div>
        <div className="w-1/2 text-xs">
          <CustomDatePicker value={end} onChange={setEnd} />
        </div>
        <button
          onClick={fetchData}
          className="bg-blue-600 text-white px-4 py-2 text-xs rounded-lg hover:bg-blue-700"
        >
          Filter
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && transactions.length > 0 && (
        <div className="h-[400px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      )}

      {!loading && !error && transactions.length === 0 && (
        <p className="text-center text-gray-600">No data available.</p>
      )}
    </div>
  );
}
