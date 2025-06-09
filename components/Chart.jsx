// import React, { useState, useEffect } from "react";
// import axiosInstance from "@/lib/axiosInstance"; // Adjust the path as needed
// import { Line } from "react-chartjs-2"; // Using Line chart for area chart
// import { Chart, registerables } from "chart.js";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, parse } from "date-fns";

// // Register chart components for Chart.js v3+
// Chart.register(...registerables);

// // Custom DatePicker component that forces the format YYYY-MM-DD
// const CustomDatePicker = ({ value, onChange, label }) => {
//   // Convert the state value (a string) to a Date object
//   const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;

//   const handleDateChange = (date) => {
//     // If a date is selected, format it as "YYYY-MM-DD"
//     const formatted = date ? format(date, "yyyy-MM-dd") : "";
//     onChange(formatted);
//   };

//   return (
//     <div className="flex flex-col w-full">
//       {/* <label className="mb-2 text-sm font-medium text-gray-700">{label}</label> */}
//       <DatePicker
//         selected={parsedDate}
//         onChange={handleDateChange}
//         dateFormat="yyyy-MM-dd" // Force the display format
//         placeholderText=" date range"
//         className="border border-gray-300 rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// };

// const Chartjs = () => {
//   // Array of transaction objects from the API response
//   const [transactions, setTransactions] = useState([]);
//   // Date filter states stored as strings ("YYYY-MM-DD")
//   const [start, setStart] = useState("");
//   const [end, setEnd] = useState("");
//   // Loading and error state
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Fetch data from the API with date filters
//   const fetchData = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const params = {
//         start: start || undefined,
//         end: end || undefined,
//       };

//       // Use the custom axios instance and the provided endpoint
//       const response = await axiosInstance.get("/Transaction/Chart", {
//         params,
//       });
//       console.log("API response:", response.data);

//       if (response.data && response.data.isSuccess) {
//         // Set transactions from the response data
//         setTransactions(response.data.data);
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

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Helper function to format a date string as YYYY-MM-DD
//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toISOString().split("T")[0];
//   };

//   // Prepare the chart data if transactions are available.
//   const chartData =
//     transactions.length > 0
//       ? {
//           labels: transactions.map((tx) => formatDate(tx.transactiondate)),
//           datasets: [
//             {
//               label: "Total Amount",
//               data: transactions.map((tx) => tx.totalamount),
//               fill: true, // Enables the area fill
//               backgroundColor: "rgba(75, 192, 192, 0.4)",
//               borderColor: "rgba(75, 192, 192, 1)",
//               borderWidth: 2,
//               tension: 0.3, // Adds subtle curve to the line
//             },
//           ],
//         }
//       : { labels: [], datasets: [] };

//   // Enhanced chart options with styling details
//   const chartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//         labels: {
//           font: { family: "Arial", size: 14 },
//           color: "#333",
//           padding: 20,
//         },
//       },
//       title: {
//         display: true,

//         font: { family: "Arial", size: 20 },
//         color: "#111",
//         padding: {
//           top: 10,
//           bottom: 30,
//         },
//       },
//       tooltip: {
//         backgroundColor: "#fff",
//         titleColor: "#333",
//         bodyColor: "#666",
//         borderColor: "rgba(0, 0, 0, 0.1)",
//         borderWidth: 1,
//         cornerRadius: 4,
//       },
//     },
//     scales: {
//       x: {
//         grid: {
//           color: "rgba(200,200,200,0.2)",
//         },
//         ticks: {
//           font: { family: "Arial", size: 12 },
//           color: "#333",
//         },
//       },
//       y: {
//         grid: {
//           color: "rgba(200,200,200,0.2)",
//         },
//         ticks: {
//           font: { family: "Arial", size: 12 },
//           color: "#333",
//           // Format ticks as currency
//           callback: (value) => `₦${value}`,
//         },
//       },
//     },
//     layout: {
//       padding: {
//         left: 10,
//         right: 10,
//         top: 20,
//         bottom: 20,
//       },
//     },
//     animation: {
//       duration: 1500,
//       easing: "easeOutQuart",
//     },
//   };

//   return (
//     <div className="w-full ">
//       {/* Filter Section */}
//       <div className="text-xs rounded-lg ">
//         {/* <h3 className="text-sm font-bold mb">Filter by Date</h3> */}
//         <div className="  flex  rounded-lg space-x-2 p-  items-center w-[400px] ">
//           <div className="md:w-[150px] text-[10px]">
//             <CustomDatePicker
//               label="Start Date"
//               value={start}
//               onChange={setStart}
//             />
//           </div>
//           <div className="text-[10px] md:w-[150px]">
//             <CustomDatePicker
//               label="End Date"
//               value={end}
//               onChange={setEnd}
//               className=""
//             />
//           </div>
//           <button
//             onClick={fetchData}
//             className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md"
//           >
//             Filter
//           </button>
//         </div>
//       </div>

//       {loading && <p className="text-center text-lg">Loading...</p>}
//       {error && <p className="text-center text-lg text-red-500">{error}</p>}
//       {transactions.length > 0 ? (
//         <div className="w-full   " style={{ height: "400px" }}>
//           <Line data={chartData} options={chartOptions} />
//         </div>
//       ) : (
//         !loading && <p className="text-center text-lg">No data available.</p>
//       )}
//     </div>
//   );
// };

// export default Chartjs;

import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

Chart.register(...registerables);

const CustomDatePicker = ({ value, onChange }) => {
  const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;

  const handleDateChange = (date) => {
    const formatted = date ? format(date, "yyyy-MM-dd") : "";
    onChange(formatted);
  };

  return (
    <div className="flex flex-col w-full">
      <DatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="date range"
        className="border border-gray-300 rounded-lg p-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

const Chartjs = () => {
  const [transactions, setTransactions] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const params = {
        start: start || undefined,
        end: end || undefined,
      };

      const response = await axiosInstance.get("/Transaction/Chart", {
        params,
      });

      if (response.data && response.data.isSuccess) {
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

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const chartData =
    transactions.length > 0
      ? {
          labels: transactions.map((tx) => formatDate(tx.transactiondate)),
          datasets: [
            {
              label: "Total Amount",
              data: transactions.map((tx) => tx.totalamount),
              fill: true,
              backgroundColor: "rgba(75, 192, 192, 0.4)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 2,
              tension: 0.3,
            },
          ],
        }
      : { labels: [], datasets: [] };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          font: { family: "Arial", size: isMobile ? 10 : 14 },
          color: "#333",
          padding: 20,
        },
      },
      title: {
        display: true,
        font: { family: "Arial", size: isMobile ? 14 : 20 },
        color: "#111",
        padding: { top: 10, bottom: 30 },
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#333",
        bodyColor: "#666",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        cornerRadius: 4,
        titleFont: { size: isMobile ? 10 : 14 },
        bodyFont: { size: isMobile ? 10 : 12 },
      },
    },
    scales: {
      x: {
        grid: { color: "rgba(200,200,200,0.2)" },
        ticks: {
          font: { family: "Arial", size: isMobile ? 10 : 12 },
          color: "#333",
        },
      },
      y: {
        grid: { color: "rgba(200,200,200,0.2)" },
        ticks: {
          font: { family: "Arial", size: isMobile ? 10 : 12 },
          color: "#333",
          callback: (value) => `₦${value}`,
        },
      },
    },
    layout: {
      padding: { left: 10, right: 10, top: 20, bottom: 20 },
    },
    animation: {
      duration: 1500,
      easing: "easeOutQuart",
    },
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Filter Section */}
      <div className="text-xs rounded-lg mb-4 w-full max-w-[800px]">
        <div className="flex flex-wrap gap-2 items-center justify-start">
          <div className="w-full sm:w-[150px] text-[10px]">
            <CustomDatePicker value={start} onChange={setStart} />
          </div>
          <div className="w-full sm:w-[150px] text-[10px]">
            <CustomDatePicker value={end} onChange={setEnd} />
          </div>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition shadow-md text-sm"
          >
            Filter
          </button>
        </div>
      </div>

      {/* Chart Section */}
      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}
      {transactions.length > 0 ? (
        <div className="w-full max-w-[1000px] h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px]">
          <Line data={chartData} options={chartOptions} />
        </div>
      ) : (
        !loading && <p className="text-center text-lg">No data available.</p>
      )}
    </div>
  );
};

export default Chartjs;
