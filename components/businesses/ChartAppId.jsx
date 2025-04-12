import React, { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

// Register Chart.js components
Chart.register(...registerables);

// Custom datepicker
const CustomDatePicker = ({ value, onChange, label }) => {
  const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;

  const handleDateChange = (date) => {
    const formatted = date ? format(date, "yyyy-MM-dd") : "";
    onChange(formatted);
  };

  return (
    <div className="flex flex-col w-full">
      <label className="mb-2 text-sm font-medium text-gray-700">{label}</label>
      <DatePicker
        selected={parsedDate}
        onChange={handleDateChange}
        dateFormat="yyyy-MM-dd"
        placeholderText="YYYY-MM-DD"
        className="border border-gray-300 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

// ✅ Updated Chart Component
const Chartjs = ({ appId }) => {
  const [transactions, setTransactions] = useState([]);
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");

    try {
      const params = {
        start: start || undefined,
        end: end || undefined,
        appId, // <-- Filter by appId
      };
      console.log("Fetching chart data with params:", params);

      const response = await axiosInstance.get("/Transaction/Chart", {
        params,
      });

      if (response.data?.isSuccess) {
        setTransactions(response.data.data);
      } else {
        throw new Error("Unsuccessful API response");
      }
    } catch (err) {
      console.error("Error fetching transaction data:", err);
      setError("Error fetching transaction data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (appId) fetchData();
  }, [appId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const chartData = {
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
  };

  return (
    <div className="w-full px-6 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Transaction Chart</h2>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <CustomDatePicker
            label="Start Date"
            value={start}
            onChange={setStart}
          />
          <CustomDatePicker label="End Date" value={end} onChange={setEnd} />
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Filter
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-lg">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {!loading && transactions.length === 0 && (
        <p className="text-center text-gray-500">No data available.</p>
      )}
      {transactions.length > 0 && (
        <div className="w-full h-[300px]">
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
      )}
    </div>
  );
};

export default Chartjs;
