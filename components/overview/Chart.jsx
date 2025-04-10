// // components/TransactionChart.js
// import React, { useState, useEffect } from "react";
// import axios from "@/lib/axiosInstance"; // adjust the import path to your axios instance
// import { Line } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";

// // Register chart components (for Chart.js v3+)
// Chart.register(...registerables);

// const TransactionChart = () => {
//   // State for transaction data
//   const [transactions, setTransactions] = useState([]);
//   // State for filters
//   const [appId, setAppId] = useState("");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   // Loading and error states
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Function to fetch data from the endpoint using axios GET method with query parameters
//   const fetchData = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const params = {
//         appId: appId ? parseInt(appId, 10) : undefined,
//         start: start || undefined,
//         end: end || undefined,
//       };

//       const response = await axios.get("/Transaction/Chart", { params });
//       // Assuming the response data is an array of transactions
//       setTransactions(response.data);
//     } catch (err) {
//       console.error("Error fetching transaction data:", err);
//       setError("Error fetching transaction data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Optionally, fetch data on component mount
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Process the data for the chart. This example assumes each transaction has "date" and "value" fields.
//   const chartData = {
//     labels: transactions.map((tx) => tx.date),
//     datasets: [
//       {
//         label: "Transactions",
//         data: transactions.map((tx) => tx.value),
//         fill: false,
//         borderColor: "rgba(75,192,192,1)",
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <div>
//       <h2>Transaction Chart</h2>
//       <div style={{ marginBottom: "20px" }}>
//         {/* Filter Inputs */}
//         <label style={{ marginRight: "10px" }}>
//           App ID:
//           <input
//             type="number"
//             value={appId}
//             onChange={(e) => setAppId(e.target.value)}
//             style={{ marginLeft: "5px" }}
//           />
//         </label>
//         <label style={{ marginRight: "10px" }}>
//           Start Date:
//           <input
//             type="datetime-local"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//             style={{ marginLeft: "5px" }}
//           />
//         </label>
//         <label style={{ marginRight: "10px" }}>
//           End Date:
//           <input
//             type="datetime-local"
//             value={end}
//             onChange={(e) => setEnd(e.target.value)}
//             style={{ marginLeft: "5px" }}
//           />
//         </label>
//         <button onClick={fetchData}>Filter</button>
//       </div>

//       {/* Loading/Error handling */}
//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Chart Component */}
//       <div style={{ height: "400px" }}>
//         <Line data={chartData} />
//       </div>
//     </div>
//   );
// };

// export default TransactionChart;

// // components/overview/Chart.jsx
// import React, { useState, useEffect } from "react";
// import axios from "@/lib/axiosInstance"; // adjust the import path as needed
// import { Bar } from "react-chartjs-2"; // you can use Line if you prefer
// import { Chart, registerables } from "chart.js";

// // Register the chart components (Chart.js v3+)
// Chart.register(...registerables);

// const TransactionChart = () => {
//   // This state will hold the summary statistics object
//   const [chartStats, setChartStats] = useState(null);
//   // Filter states
//   const [appId, setAppId] = useState("");
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   // Loading and error state
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch the data from the API
//   const fetchData = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const params = {
//         appId: appId ? parseInt(appId, 10) : undefined,
//         start: start || undefined,
//         end: end || undefined,
//       };

//       const response = await axios.get("/Transaction/Chart", { params });
//       console.log("API response:", response.data);

//       if (response.data && response.data.isSuccess) {
//         // Extract the summary data from the response
//         setChartStats(response.data.data);
//       } else {
//         throw new Error("API returned an unsuccessful response");
//       }
//     } catch (err) {
//       console.error("Error fetching transaction data:", err);
//       setError("Error fetching transaction data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Run once on mount (or call fetchData when appropriate)
//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Define labels for the different time periods
//   const labels = [
//     "Today",
//     "Yesterday",
//     "This Week",
//     "Last Week",
//     "This Month",
//     "Last Month",
//     "All Time",
//   ];

//   // Build chart data only if stats are available
//   const chartData = chartStats
//     ? {
//         labels,
//         datasets: [
//           {
//             label: "Total Amount",
//             data: [
//               chartStats.totaltoday,
//               chartStats.totalyesterday,
//               chartStats.totalthisweek,
//               chartStats.totalpreviousweek,
//               chartStats.totalthismonth,
//               chartStats.totalpreviousmonth,
//               chartStats.totalalltime,
//             ],
//             backgroundColor: "rgba(75, 192, 192, 0.4)",
//             borderColor: "rgba(75, 192, 192, 1)",
//             borderWidth: 1,
//           },
//           // Optionally, you can add a dataset for transaction counts:
//           // {
//           //   label: "Transaction Count",
//           //   data: [
//           //     chartStats.counttoday,
//           //     chartStats.countyesterday,
//           //     chartStats.countthisweek,
//           //     // If counts for "Last Week" and "Last Month" are not provided, you may skip or fill with null:
//           //     null,
//           //     chartStats.countthismonth,
//           //     null,
//           //     chartStats.countalltime,
//           //   ],
//           //   backgroundColor: "rgba(153, 102, 255, 0.4)",
//           //   borderColor: "rgba(153, 102, 255, 1)",
//           //   borderWidth: 1,
//           // },
//         ],
//       }
//     : { labels: [], datasets: [] };

//   return (
//     <div>
//       <h2>Transaction Chart</h2>
//       <div style={{ marginBottom: "20px" }}>
//         {/* Filter inputs */}
//         <label style={{ marginRight: "10px" }}>
//           App ID:
//           <input
//             type="number"
//             value={appId}
//             onChange={(e) => setAppId(e.target.value)}
//             style={{ marginLeft: "5px" }}
//           />
//         </label>
//         <label style={{ marginRight: "10px" }}>
//           Start Date:
//           <input
//             type="datetime-local"
//             value={start}
//             onChange={(e) => setStart(e.target.value)}
//             style={{ marginLeft: "5px" }}
//           />
//         </label>
//         <label style={{ marginRight: "10px" }}>
//           End Date:
//           <input
//             type="datetime-local"
//             value={end}
//             onChange={(e) => setEnd(e.target.value)}
//             style={{ marginLeft: "5px" }}
//           />
//         </label>
//         <button onClick={fetchData}>Filter</button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {chartStats ? (
//         <div style={{ height: "400px" }}>
//           <Bar
//             data={chartData}
//             options={{
//               responsive: true,
//               maintainAspectRatio: false,
//               scales: {
//                 y: {
//                   beginAtZero: true,
//                 },
//               },
//             }}
//           />
//         </div>
//       ) : (
//         !loading && <p>No data available.</p>
//       )}
//     </div>
//   );
// };

// export default TransactionChart;

// components/overview/Chart.jsx
import React, { useState, useEffect } from "react";
import axios from "@/lib/axiosInstance"; // adjust the path as needed
import { Bar } from "react-chartjs-2"; // or Line if you prefer
import { Chart, registerables } from "chart.js";

// Register all Chart.js components (for Chart.js v3+)
Chart.register(...registerables);

const BusinessChart = () => {
  // State for storing the summary data from API response
  const [chartStats, setChartStats] = useState(null);
  // Loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch all data from the API
  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const params = {
        start: start || undefined,
        end: end || undefined,
      };

      // No query parameters are passed, so it fetches all data
      const response = await axios.get("/Transaction/Chart", { params });
      console.log("API response:", response.data);

      if (response.data && response.data.isSuccess) {
        setChartStats(response.data.data);
      } else {
        throw new Error("API returned an unsuccessful response");
      }
    } catch (err) {
      console.error("Error fetching transaction data:", err);
      if (err.code === "ECONNABORTED") {
        setError("Request timeout. Please try again later.");
      } else {
        setError("Error fetching transaction data");
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Define chart labels for different periods
  const labels = [
    "Today",
    "Yesterday",
    "This Week",
    "Last Week",
    "This Month",
    "Last Month",
    "All Time",
  ];

  // Prepare chart data if stats are available
  const chartData = chartStats
    ? {
        labels,
        datasets: [
          {
            label: "Total Amount",
            data: [
              chartStats.totaltoday,
              chartStats.totalyesterday,
              chartStats.totalthisweek,
              chartStats.totalpreviousweek,
              chartStats.totalthismonth,
              chartStats.totalpreviousmonth,
              chartStats.totalalltime,
            ],
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] };

  return (
    <div>
      <h2>Transaction Chart</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {chartStats && !loading ? (
        <div style={{ height: "400px" }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      ) : (
        !loading && <p>No data available.</p>
      )}
    </div>
  );
};

export default BusinessChart;
