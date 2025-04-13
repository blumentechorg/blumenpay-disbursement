
import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance"; // Adjust the path as needed
import { Bar } from "react-chartjs-2";
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
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <DatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd" // Force the display format
        placeholderText="YYYY-MM-DD"
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              backgroundColor: "rgba(75, 192, 192, 0.4)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        }
      : { labels: [], datasets: [] };

  return (
    <div className="w-full px-6 py-10">
      <h2 className="text-3xl font-bold py-6 text-center">Transaction Chart</h2>
      {/* Filter Section */}
      <div className="bg-white shadow-xl rounded-lg p-8 mb-8 w-full">
        <h3 className="text-xl font-semibold mb-6">Filter by Date</h3>
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
          <CustomDatePicker
            label="Start Date"
            value={start}
            onChange={setStart}
          />
          <CustomDatePicker label="End Date" value={end} onChange={setEnd} />
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            Filter
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-lg text-red-500">{error}</p>}
      {transactions.length > 0 ? (
        <div className="w-full mx-auto" style={{ height: "400px" }}>
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
        !loading && <p className="text-center text-lg">No data available.</p>
      )}
    </div>
  );
};

export default Chartjs;
