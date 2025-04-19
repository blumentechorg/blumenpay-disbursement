// // import React, { useState, useEffect } from "react";
// // import axiosInstance from "@/lib/axiosInstance";
// // import { Bar } from "react-chartjs-2";
// // import { Chart, registerables } from "chart.js";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import { format, parse } from "date-fns";

// // // Register Chart.js components
// // Chart.register(...registerables);

// // // Custom datepicker
// // const CustomDatePicker = ({ value, onChange, label }) => {
// //   const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;

// //   const handleDateChange = (date) => {
// //     const formatted = date ? format(date, "yyyy-MM-dd") : "";
// //     onChange(formatted);
// //   };

// //   return (
// //     <div className="flex flex-col w-full">
// //       <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
// //       <DatePicker
// //         selected={parsedDate}
// //         onChange={handleDateChange}
// //         dateFormat="yyyy-MM-dd"
// //         placeholderText="YYYY-MM-DD"
// //         className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
// //       />
// //     </div>
// //   );
// // };

// // // ✅ Updated Chart Component
// // const Chartjs = ({ appId }) => {
// //   const [transactions, setTransactions] = useState([]);
// //   const [start, setStart] = useState("");
// //   const [end, setEnd] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const fetchData = async () => {
// //     setLoading(true);
// //     setError("");

// //     try {
// //       const params = {
// //         start: start || undefined,
// //         end: end || undefined,
// //         appId, // <-- Filter by appId
// //       };
// //       console.log("Fetching chart data with params:", params);

// //       const response = await axiosInstance.get("/Transaction/Chart", {
// //         params,
// //       });

// //       if (response.data?.isSuccess) {
// //         setTransactions(response.data.data);
// //       } else {
// //         throw new Error("Unsuccessful API response");
// //       }
// //     } catch (err) {
// //       console.error("Error fetching transaction data:", err);
// //       setError("Error fetching transaction data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (appId) fetchData();
// //   }, [appId]);

// //   const formatDate = (dateString) => {
// //     const date = new Date(dateString);
// //     return date.toISOString().split("T")[0];
// //   };

// //   const chartData = {
// //     labels: transactions.map((tx) => formatDate(tx.transactiondate)),
// //     datasets: [
// //       {
// //         label: "Total Amount",
// //         data: transactions.map((tx) => tx.totalamount),
// //         backgroundColor: "rgba(75, 192, 192, 0.4)",
// //         borderColor: "rgba(75, 192, 192, 1)",
// //         borderWidth: 1,
// //       },
// //     ],
// //   };

// //   return (
// //     <div className="w-full px-6 py-3">
// //       {/* <h2 className="text-2xl font-bold mb-4 text-center">Transaction Chart</h2> */}
// //       <div className="bg-white h-32 shadow-xl flex flex-col sm:flex-row rounded-lg space-x-2 p-2  items-center w-[400px] ">
// //         <div className="w-[150px] text-[10px]">
// //           <CustomDatePicker
// //             label="Start Date"
// //             value={start}
// //             onChange={setStart}
// //           />
// //         </div>
// //         <div className="text-[10px] w-[150px]">
// //           <CustomDatePicker
// //             label="End Date"
// //             value={end}
// //             onChange={setEnd}
// //             className=""
// //           />
// //         </div>
// //         <button
// //           onClick={fetchData}
// //           className="bg-blue-600 text-white font-semibold px-4 py-2 mt-7 rounded-lg hover:bg-blue-700 transition shadow-md"
// //         >
// //           Filter
// //         </button>
// //       </div>

// //       {loading && <p className="text-center text-lg">Loading...</p>}
// //       {error && <p className="text-center text-red-500">{error}</p>}
// //       {!loading && transactions.length === 0 && (
// //         <p className="text-center text-gray-500">No data available.</p>
// //       )}
// //       {transactions.length > 0 && (
// //         <div className="w-full h-[300px]">
// //           <Bar
// //             data={chartData}
// //             options={{
// //               responsive: true,
// //               maintainAspectRatio: false,
// //               scales: {
// //                 y: { beginAtZero: true },
// //               },
// //             }}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Chartjs;

// // // components/Chartjs.tsx
// // import React, { useState, useEffect } from "react";
// // import axiosInstance from "@/lib/axiosInstance";
// // import { Bar } from "react-chartjs-2";
// // import { Chart, registerables } from "chart.js";
// // import DatePicker from "react-datepicker";
// // import "react-datepicker/dist/react-datepicker.css";
// // import { format, parse } from "date-fns";

// // Chart.register(...registerables);

// // const CustomDatePicker = ({ value, onChange, label }) => {
// //   const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;
// //   const handleDateChange = date => onChange(date ? format(date, "yyyy-MM-dd") : "");
// //   return (
// //     <div className="flex flex-col">
// //       <label className="mb-1 text-sm font-medium">{label}</label>
// //       <DatePicker
// //         selected={parsedDate}
// //         onChange={handleDateChange}
// //         dateFormat="yyyy-MM-dd"
// //         placeholderText="YYYY-MM-DD"
// //         className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-blue-500"
// //       />
// //     </div>
// //   );
// // };

// // type ChartjsProps = {
// //   appId: string | number;
// // };

// // const Chartjs: React.FC<ChartjsProps> = ({ appId }) => {
// //   const [transactions, setTransactions] = useState<any[]>([]);
// //   const [start, setStart] = useState("");
// //   const [end, setEnd] = useState("");
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");

// //   const fetchData = async () => {
// //     if (!appId) return;
// //     setLoading(true);
// //     setError("");
// //     try {
// //       const { data } = await axiosInstance.get("/Transaction/Chart", {
// //         params: {
// //           appId,
// //           ...(start && { start }),
// //           ...(end   && { end }),
// //         },
// //       });
// //       if (data.isSuccess) {
// //         setTransactions(data.data);
// //       } else {
// //         throw new Error("API returned an error");
// //       }
// //     } catch (err) {
// //       console.error(err);
// //       setError("Could not load chart data");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // re-fetch on appId/start/end changes
// //   useEffect(() => {
// //     fetchData();
// //   }, [appId, start, end]);

// //   const labels = transactions.map(tx =>
// //     format(new Date(tx.transactiondate), "yyyy-MM-dd")
// //   );
// //   const amounts = transactions.map(tx => tx.totalamount);

// //   return (
// //     <div className="p-4 bg-white rounded-lg shadow">
// //       <div className="flex space-x-2 mb-4">
// //         <div className="w-1/3">
// //           <CustomDatePicker label="Start Date" value={start} onChange={setStart} />
// //         </div>
// //         <div className="w-1/3">
// //           <CustomDatePicker label="End Date" value={end} onChange={setEnd} />
// //         </div>
// //       </div>

// //       {loading && <p className="text-center">Loading…</p>}
// //       {error   && <p className="text-red-500 text-center">{error}</p>}
// //       {!loading && !error && transactions.length === 0 && (
// //         <p className="text-center text-gray-500">No data for this business.</p>
// //       )}
// //       {transactions.length > 0 && (
// //         <div className="h-64">
// //           <Bar
// //             data={{
// //               labels,
// //               datasets: [{
// //                 label: "Total Amount",
// //                 data: amounts,
// //                 backgroundColor: "rgba(75,192,192,0.4)",
// //                 borderColor:     "rgba(75,192,192,1)",
// //                 borderWidth: 1,
// //               }]
// //             }}
// //             options={{
// //               responsive: true,
// //               maintainAspectRatio: false,
// //               scales: { y: { beginAtZero: true } },
// //             }}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Chartjs;

// // File: components/Chart.jsx
// import React, { useState, useEffect } from "react";
// import axiosInstance from "@/lib/axiosInstance";
// import { Line } from "react-chartjs-2";
// import { Chart, registerables } from "chart.js";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, parse } from "date-fns";

// Chart.register(...registerables);

// // Custom DatePicker (unchanged)
// const CustomDatePicker = ({ value, onChange, label }) => {
//   const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;
//   const handleDateChange = (date) => {
//     onChange(date ? format(date, "yyyy-MM-dd") : "");
//   };
//   return (
//     <div className="flex flex-col w-full">
//       <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
//       <DatePicker
//         selected={parsedDate}
//         onChange={handleDateChange}
//         dateFormat="yyyy-MM-dd"
//         placeholderText="YYYY-MM-DD"
//         className="border border-gray-300 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// // **No more `type ChartjsProps`** — just destructure props
// const Chartjs = ({ appId }) => {
//   const [transactions, setTransactions] = useState([]);
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const fetchData = async () => {
//     if (!appId) return;
//     setLoading(true);
//     setError("");
//     try {
//       const params = { appId };
//       if (start) params.start = start;
//       if (end) params.end = end;

//       const { data } = await axiosInstance.get("/Transaction/Chart", {
//         params,
//       });
//       if (data.isSuccess) setTransactions(data.data);
//       else throw new Error("API returned an error");
//     } catch (err) {
//       console.error(err);
//       setError("Error fetching transaction data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [appId]);

//   const formatDate = (d) => format(new Date(d), "yyyy-MM-dd");

//   const chartData = {
//     labels: transactions.map((tx) => formatDate(tx.transactiondate)),
//     datasets: [
//       {
//         label: "Total Amount",
//         data: transactions.map((tx) => tx.totalamount),
//         fill: true,
//         backgroundColor: "rgba(75,192,192,0.4)",
//         borderColor: "rgba(75,192,192,1)",
//         borderWidth: 2,
//         tension: 0.3,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: { display: true, position: "top" },
//       title: { display: true, text: "Transactions for Business" },
//     },
//     scales: {
//       x: { grid: { color: "rgba(200,200,200,0.2)" } },
//       y: {
//         grid: { color: "rgba(200,200,200,0.2)" },
//         ticks: { callback: (v) => `₦${v}` },
//       },
//     },
//     layout: { padding: 20 },
//     animation: { duration: 1500, easing: "easeOutQuart" },
//   };

//   return (
//     <div className="w-full px-6">
//       <div className="bg-white h-32 shadow-xl flex flex-col sm:flex-row space-x-2 p-2 items-center w-[400px] rounded-lg">
//         <div className="w-[150px] text-xs">
//           <CustomDatePicker
//             label="Start Date"
//             value={start}
//             onChange={setStart}
//           />
//         </div>
//         <div className="w-[150px] text-xs">
//           <CustomDatePicker label="End Date" value={end} onChange={setEnd} />
//         </div>
//         <button
//           onClick={fetchData}
//           className="bg-blue-600 text-white px-4 py-2 mt-7 rounded-lg hover:bg-blue-700 shadow-md"
//         >
//           Filter
//         </button>
//       </div>

//       {loading && <p className="text-center mt-4">Loading...</p>}
//       {error && <p className="text-center text-red-500 mt-4">{error}</p>}
//       {!loading && !error && transactions.length === 0 && (
//         <p className="text-center text-gray-500 mt-4">
//           No data for this business.
//         </p>
//       )}
//       {transactions.length > 0 && (
//         <div className="w-full mx-auto" style={{ height: "400px" }}>
//           <Line data={chartData} options={chartOptions} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chartjs;

import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance"; // Adjust the path as needed
import { Line } from "react-chartjs-2"; // Using Line chart for area chart
import { Chart, registerables } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

// Register chart components for Chart.js v3+
Chart.register(...registerables);

// Custom DatePicker component that forces the format YYYY-MM-DD
const CustomDatePicker = ({ value, onChange, label }) => {
  // Convert the state value (a string) to a Date object
  const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;

  const handleDateChange = (date) => {
    // If a date is selected, format it as "YYYY-MM-DD"
    const formatted = date ? format(date, "yyyy-MM-dd") : "";
    onChange(formatted);
  };

  return (
    <div className="flex flex-col w-full">
      {/* <label className="mb-2 text-sm font-medium text-gray-700">{label}</label> */}
      <DatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd" // Force the display format
        placeholderText=" date range"
        className="border border-gray-300 rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const Chartjs = () => {
  // Array of transaction objects from the API response
  const [transactions, setTransactions] = useState([]);
  // Date filter states stored as strings ("YYYY-MM-DD")
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  // Loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch data from the API with date filters
  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const params = {
        start: start || undefined,
        end: end || undefined,
      };

      // Use the custom axios instance and the provided endpoint
      const response = await axiosInstance.get("/Transaction/Chart", {
        params,
      });
      console.log("API response:", response.data);

      if (response.data && response.data.isSuccess) {
        // Set transactions from the response data
        setTransactions(response.data.data);
      } else {
        throw new Error("API returned an unsuccessful response");
      }
    } catch (err) {
      console.error("Error fetching transaction data:", err);
      setError("Error fetching transaction data");
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to format a date string as YYYY-MM-DD
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  // Prepare the chart data if transactions are available.
  const chartData =
    transactions.length > 0
      ? {
          labels: transactions.map((tx) => formatDate(tx.transactiondate)),
          datasets: [
            {
              label: "Total Amount",
              data: transactions.map((tx) => tx.totalamount),
              fill: true, // Enables the area fill
              backgroundColor: "rgba(75, 192, 192, 0.4)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              tension: 0.3, // Adds subtle curve to the line
            },
          ],
        }
      : { labels: [], datasets: [] };

  // Enhanced chart options with styling details
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: { family: "Arial", size: 14 },
          color: "#333",
          padding: 20,
        },
      },
      title: {
        display: true,

        font: { family: "Arial", size: 20 },
        color: "#111",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        cornerRadius: 4,
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(200,200,200,0.2)",
        },
        ticks: {
          font: { family: "Arial", size: 12 },
          color: "#333",
        },
      },
      y: {
        grid: {
          color: "rgba(200,200,200,0.2)",
        },
        ticks: {
          font: { family: "Arial", size: 12 },
          color: "#333",
          // Format ticks as currency
          callback: (value) => `₦${value}`,
        },
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 20,
        bottom: 20,
      },
    },
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="w-full ">
      {/* Filter Section */}
      <div className="text-xs rounded-lg ">
        {/* <h3 className="text-sm font-bold mb">Filter by Date</h3> */}
        <div className="  flex flex-col sm:flex-row rounded-lg space-x-2 p-  items-center w-[400px] ">
          <div className="w-[150px] text-[10px]">
            <CustomDatePicker
              label="Start Date"
              value={start}
              onChange={setStart}
            />
          </div>
          <div className="text-[10px] w-[150px]">
            <CustomDatePicker
              label="End Date"
              value={end}
              onChange={setEnd}
              className=""
            />
          </div>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Filter
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}
      {transactions.length > 0 ? (
        <div className="w-full mx-auto" style={{ height: "400px" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        !loading && <p className="text-center text-lg">No data available.</p>
      )}
    </div>
  );
};

export default Chartjs;
