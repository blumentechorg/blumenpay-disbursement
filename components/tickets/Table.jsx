import React, { useState, useEffect } from "react";
// Import the custom axios instance
import axiosInstance from "@/lib/axiosInstance"; // Adjust the path as needed
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { format, parseISO } from "date-fns"; // Importing date-fns for formatting

// Register chart components for Chart.js v3+
Chart.register(...registerables);

const Chartjs = () => {
  // Array of transaction objects from the API response
  const [transactions, setTransactions] = useState([]);
  // Date filter states in "YYYY-MM-DD" format
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
        // Set transactions from the response array
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
  }, []);

  // Build the chart data if transactions are available.
  // For x-axis labels, we explicitly format the date to "YYYY-MM-DD"
  const chartData = transactions.length
    ? {
        labels: transactions.map((tx) =>
          format(parseISO(tx.transactiondate), "yyyy-MM-dd")
        ),
        datasets: [
          {
            label: "Total Amount",
            data: transactions.map((tx) => tx.totalamount),
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      }
    : { labels: [], datasets: [] };

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold py-10 text-center">
        Transaction Chart
      </h2>
      {/* Filter Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8 max-w-3xl ">
        <h3 className="text-lg font-semibold mb-4">Filter by Date</h3>
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium">Start Date</label>
            <input
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="mb-1 text-sm font-medium">End Date</label>
            <input
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="border border-gray-300 rounded p-2 w-full uppercase"
              placeholder="YYYY-MM-DD"
            />
          </div>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Filter
          </button>
        </div>
      </div>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {transactions.length ? (
        <div className="max-w-4xl mx-auto" style={{ height: "400px" }}>
          <Bar
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      ) : (
        !loading && <p className="text-center">No data available.</p>
      )}
    </div>
  );
};

export default Chartjs;
