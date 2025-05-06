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
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingReports, setPendingReports] = useState([]);
  const [completedReports, setCompletedReports] = useState([]);
  const [availableBalance, setAvailableBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  // ←─ FETCH TRANSACTION REPORTS ─→
  const fetchReport = async () => {
    setLoading(true);
    try {
      const resp = await axios.get("/Transaction/FundsweepReport", {
        params: appId != null ? { appId } : {},
        timeout: 10000,
      });
      if (resp.data.isSuccess) {
        const { pending, completed } = resp.data.data || {};
        setPendingReports(
          Array.isArray(pending) ? pending : pending ? [pending] : []
        );
        setCompletedReports(
          Array.isArray(completed) ? completed : completed ? [completed] : []
        );
      }
    } catch (err) {
      console.error("Error fetching fundsweep report:", err);
    } finally {
      setLoading(false);
    }
  };

  // ←─ FETCH PROVIDER BALANCE ─→
  const fetchProviderBalance = async () => {
    try {
      const resp = await axios.get(`/Apps/ProviderBalance/${appId}`, {
        timeout: 10000,
      });
      if (resp.data.isSuccess) {
        setAvailableBalance(resp.data.data?.availableBalance ?? 0);
      }
    } catch (err) {
      console.error("Error fetching provider balance:", err);
    }
  };

  useEffect(() => {
    if (appId != null) {
      fetchReport();
      fetchProviderBalance();
    }
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-gray-200 h-28 rounded-lg" />
          ))}
        </div>
      ) : currentReports.length === 0 ? (
        <p className="text-center text-gray-500">No data available.</p>
      ) : (
        <>
          {currentReports.map((report, index) => {
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
              <div key={`report-${index}`} className="space-y-4">
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
          })}

          {/* Single Available Balance Card */}
          {availableBalance != null && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card
                title="Provider Balance"
                amount={availableBalance}
                IconComponent={
                  <GiTakeMyMoney className="text-green-500 text-xl" />
                }
              />
            </div>
          )}
        </>
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
          &#x20A6;{Number(amount ?? 0).toLocaleString()}
        </div>
      </div>
    </div>
  );
}
