"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import moment from "moment";
import axiosInstance from "@/lib/axiosInstance";
import DTableAppId from "@/components/disbursements/appid/DTableAppId";
import DisbursementCards from "@/components/disbursements/cards/DisbursementCards";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";

// Custom DatePicker component enforcing YYYY-MM-DD format
const CustomDatePicker = ({ value, onChange, placeholder }) => {
  const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;

  const handleDateChange = (date) => {
    const formatted = date ? format(date, "yyyy-MM-dd") : "";
    onChange(formatted);
  };

  return (
    <DatePicker
      selected={parsedDate}
      onChange={handleDateChange}
      dateFormat="yyyy-MM-dd"
      placeholderText={placeholder}
      className="px-2 py-1 border rounded w-full"
    />
  );
};

const ViewModal = ({ modalContent, appId, onClose }) => {
  const [businessDetails, setBusinessDetails] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  // FundSweep Preview states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Initialize FundSweep state
  const [initLoading, setInitLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  const [hideInitButton, setHideInitButton] = useState(false);

  // table refresh key
  const [tableKey, setTableKey] = useState(0);

  // Helper to format numbers with commas and Naira sign
  const formatAmount = (value) => {
    const number = Number(value) || 0;
    return `₦${number.toLocaleString("en-NG")}`;
  };

  // Fetch business details by appId
  useEffect(() => {
    if (appId) {
      setLoading(true);
      axiosInstance
        .get(`/Apps/${appId}`)
        .then((response) => {
          if (response.data.isSuccess) {
            setBusinessDetails(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching business details:", error);
        })
        .finally(() => setLoading(false));
    }
  }, [appId]);

  if (!modalContent) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // FundSweep preview
  const handleGeneratePreview = () => {
    if (startDate && endDate && startDate > endDate) {
      setNotification({
        type: "error",
        message: "Start Date cannot be after End Date",
      });
      return;
    }
    setNotification(null);
    setPreviewLoading(true);

    axiosInstance
      .get(`/Apps/FSPreview/${appId}`, {
        params: {
          ...(startDate ? { startDate } : {}),
          ...(endDate ? { endDate } : {}),
        },
      })
      .then((res) => {
        if (res.data.isSuccess) {
          setPreviewData(res.data.data);
          setIsPreviewOpen(true);
          setHideInitButton(false);
        } else {
          setNotification({
            type: "error",
            message: res.data.message || "Failed to fetch preview",
          });
        }
      })
      .catch(() =>
        setNotification({
          type: "error",
          message: "Error generating fundsweep preview",
        })
      )
      .finally(() => setPreviewLoading(false));
  };

  // Initialize FundSweep
  const handleInitFundSweep = async () => {
    setNotification(null);
    setInitLoading(true);
    try {
      const payload = { appId };
      if (startDate) payload.startDate = startDate;
      if (endDate) payload.endDate = endDate;

      const res = await axiosInstance.post("/Apps/InitFundSweep", payload);
      if (res.data.isSuccess) {
        setNotification({
          type: "success",
          message: "FundSweep initialized successfully",
        });
        // refresh table
        setTableKey((k) => k + 1);
        // keep popup open for user to review or close manually
        setHideInitButton(true); // hide button on success
      } else {
        setNotification({
          type: "error",
          message: res.data.message || "Initialization failed",
        });
      }
    } catch {
      setNotification({
        type: "error",
        message: "Error initializing FundSweep",
      });
    } finally {
      setInitLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 text-sm flex items-center justify-end"
        onClick={handleBackdropClick}
      >
        <div
          className="bg-gray-100 h-full shadow-lg relative overflow-y-auto w-4/5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-white p-4">
            {businessDetails?.logo || modalContent.logo ? (
              <Image
                src={businessDetails?.logo || modalContent.logo}
                alt="Business Logo"
                width={80}
                height={80}
              />
            ) : (
              <div className="w-20 h-20 bg-gray-300 flex items-center justify-center">
                <span className="text-xs text-gray-600">No Logo</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Disbursement Cards */}
          <div className="mt-5 px-4">
            <DisbursementCards appId={appId} />
          </div>

          {/* FundSweep Preview Generator */}
          <div className="mt-4 px-4 space-y-2">
            <div className="flex space-x-2 justify-end w-full">
              <div className="w-40">
                <CustomDatePicker
                  value={startDate}
                  onChange={setStartDate}
                  placeholder="Start Date"
                />
              </div>
              <div className="w-40">
                <CustomDatePicker
                  value={endDate}
                  onChange={setEndDate}
                  placeholder="End Date"
                />
              </div>
              <button
                onClick={handleGeneratePreview}
                disabled={previewLoading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {previewLoading ? "Generating…" : "Generate FundSweep Preview"}
              </button>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
            <DTableAppId key={tableKey} filters={filters} appId={appId} />
          </div>

          {isPreviewOpen && previewData && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                {/* Inline Notification */}
                {notification && (
                  <div
                    className={`p-2 rounded ${
                      notification.type === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <TbAlertCircleFilled className="inline-block mr-1" />
                    {notification.message}
                  </div>
                )}

                <h2 className="text-xl font-bold">FundSweep Preview</h2>

                {/* Restyled Data Table */}
                <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
                  <table className="min-w-full text-xs border border-gray-300 table-auto">
                    <thead className="bg-gray-100 font-semibold">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Name
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                          Amount
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Total Amount", formatAmount(previewData.totalAmount)],
                        ["Cash Total", formatAmount(previewData.cashTotal)],
                        ["Online Total", formatAmount(previewData.onlineTotal)],
                        [
                          "Commission",
                          formatAmount(previewData.blumenPayCommission),
                        ],
                        [
                          "Amount Payable",
                          formatAmount(previewData.amountPayable),
                        ],
                        ["Fee Incurred", formatAmount(previewData.feeIncured)],
                        ["Cash Tx Count", previewData.cashTransactionCount],
                        ["Online Tx Count", previewData.onlineTransactionCount],
                        ["Profit", formatAmount(previewData.profit)],
                        [
                          "Unresolved Amount",
                          formatAmount(previewData.unresolvedAmount),
                        ],
                        [
                          "Highest Amount",
                          formatAmount(previewData.highestAmount),
                        ],
                        [
                          "Lowest Amount",
                          formatAmount(previewData.lowestAmount),
                        ],
                        [
                          "Window Start",
                          moment(previewData.windowStartDate).format(
                            "MMM D, YYYY h:mm A"
                          ),
                        ],
                        [
                          "Window End",
                          moment(previewData.windowEndDate).format(
                            "MMM D, YYYY h:mm A"
                          ),
                        ],
                      ].map(([label, value]) => (
                        <tr
                          key={label}
                          className="border-t hover:bg-gray-50 hover:font-semibold"
                        >
                          <td className="border border-gray-300 px-4 py-2 font-bold">
                            {label}
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            {value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    Close Preview
                  </button>

                  {!hideInitButton && (
                    <button
                      onClick={handleInitFundSweep}
                      disabled={initLoading}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {initLoading ? "Initializing…" : "Initialize FundSweep"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
