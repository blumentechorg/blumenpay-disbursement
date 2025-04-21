"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { FaTimes } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi"; // Import copy icon
import moment from "moment";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify"; // Added toast notification import
import ChartId from "@/components/businesses/appid/ChartId"; // Adjust import path if needed
import TotalTodayAppId from "@/components/businesses/appid/TotalTodayAppId";
import TotalYesterdayAppId from "@/components/businesses/appid/TotalYesterdayAppId";
import TotalThisWeekAppId from "@/components/businesses/appid/TotalThisWeekAppId";
import TotalThisMonthAppId from "@/components/businesses/appid/TotalThisMonthAppId";
import TotalPreviousMonthAppId from "@/components/businesses/appid/TotalPreviousMonthAppId";
import TotalAllTimeId from "@/components/businesses/appid/TotalAllTimeAppId";
import TransactionTable from "@/components/businesses/appid/TransactionAppId";

const BusinessModal = ({ modalContent, appId, onClose }) => {
  const [businessDetails, setBusinessDetails] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newApiKey, setNewApiKey] = useState(""); // New state for generated key

  // Fetch business details when modalContent.appId is available
  useEffect(() => {
    if (modalContent?.appId) {
      setLoading(true);
      axiosInstance
        .get(`/Apps/${modalContent.appId}`)
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
  }, [modalContent?.appId]);

  if (!modalContent) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Format API Key Creation Date
  const creationDate =
    businessDetails?.apiKeyCreationDate ||
    modalContent.apiKeyCreationDate ||
    null;
  const formattedDate = creationDate
    ? moment(creationDate).format("h:mm A, MMM D")
    : "N/A";

  // Extract status using the provided object format
  const status = businessDetails?.status ||
    modalContent.status || { label: "Unknown" };
  const statusLabel = typeof status === "object" ? status.label : status;

  // Render status icon based on status
  const renderStatusIcon = () => {
    switch (statusLabel) {
      case "Active":
        return <FaCircleCheck className="text-green-500" size={32} />;
      case "Inactive":
      case "Failed":
        return <TbAlertCircleFilled className="text-red-500" size={32} />;
      default:
        return null;
    }
  };

  // Handler for generating a new key
  const handleGenerateKey = () => {
    setIsGenerating(true);
    axiosInstance
      .post("/Apps/Key", { id: modalContent.id })
      .then((response) => {
        if (response.data.isSuccess) {
          // Update the business details with the new API key using the 'apiKey' field from response
          setBusinessDetails((prev) => ({
            ...prev,
            apiKey: response.data.data.apiKey,
          }));
          // Set the new key state so it displays below the button
          setNewApiKey(response.data.data.apiKey);
          // Show toast notification on successful key generation
          toast.success("API Key generated successfully");
        }
      })
      .catch((error) => {
        console.error("Error generating new key:", error);
        toast.error("Failed to generate API Key");
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  // Handler to copy the new API key to clipboard
  const handleCopyKey = () => {
    if (newApiKey) {
      navigator.clipboard.writeText(newApiKey);
      toast.info("API Key copied to clipboard!");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center  "
      onClick={handleBackdropClick}
    >
      <div
        className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 text-sm flex items-center justify-end"
        onClick={handleBackdropClick}
      >
        <div
          className="bg-gray-100  h-full shadow-lg relative overflow-y-auto w-4/5"
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

          {/* Business Details */}
          <div className="mt-5 px-4">
            <h3 className="text-gray-700 text-sm font-semibold mb-2">
              Business Details
            </h3>
            <div className="p-4 bg-gray-50 rounded-md border space-y-3">
              <div className="flex items-center gap-2">
                {renderStatusIcon()}
                <span
                  className={
                    statusLabel === "Active"
                      ? "text-green-600"
                      : statusLabel === "Inactive" || statusLabel === "Failed"
                      ? "text-red-600"
                      : ""
                  }
                >
                  {statusLabel}
                </span>
              </div>
              <p className="text-gray-700 text-xs font-medium">
                <span className="font-light">Business Name:</span>{" "}
                <span className="uppercase">
                  {businessDetails?.name || modalContent.name || "N/A"}
                </span>
              </p>
              <p className="text-gray-700 text-xs font-medium">
                <span className="font-light">Description:</span>{" "}
                <span className="uppercase">
                  {businessDetails?.description ||
                    modalContent.description ||
                    "N/A"}
                </span>
              </p>
              <p className="text-gray-700 text-xs font-medium">
                <span className="font-light">App ID:</span>{" "}
                <span className="uppercase">
                  {businessDetails?.appId || modalContent.appId || "N/A"}
                </span>
              </p>
              <p className="text-gray-700 text-xs font-medium">
                <span className="font-light">Total Balance:</span>{" "}
                <span className="uppercase">
                  ₦
                  {(
                    businessDetails?.totalBalance ||
                    modalContent.totalBalance ||
                    0
                  ).toLocaleString()}
                </span>
              </p>
              <p className="text-gray-700 text-xs font-medium">
                <span className="font-light">Default Provider:</span>{" "}
                <span className="uppercase">
                  {businessDetails?.defaultProvider ||
                    modalContent.defaultProvider ||
                    "N/A"}
                </span>
              </p>
              <p className="text-gray-700 text-xs font-medium">
                <span className="font-light">Api Key:</span>{" "}
                {businessDetails?.apiKey || modalContent.apiKeyMask || "N/A"}
              </p>
              {/* New Generate Key Button */}
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-sm text-xs"
                onClick={handleGenerateKey}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate New Key"}
              </button>
              {/* Newly generated key displayed below the button with a copy icon */}
              {newApiKey && (
                <div className="mt-2">
                  <div className="flex items-center gap-1">
                    <p className="text-gray-700 text-xs font-medium">
                      New API Key:{" "}
                      <span className="font-bold">{newApiKey}</span>
                    </p>
                    <button
                      onClick={handleCopyKey}
                      title="Copy API Key"
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FiCopy size={16} />
                    </button>
                  </div>
                  <p className="text-gray-500 text-xs mt-1">
                    Note: If you reload/logout this page, the API key will
                    disappear.
                  </p>
                </div>
              )}
              <p className="text-gray-700 text-xs font-medium">
                <span className="font-light">API Key Created:</span>{" "}
                <span className="uppercase">{formattedDate}</span>
              </p>
              {businessDetails?.balances &&
                businessDetails.balances.length > 0 && (
                  <div>
                    <strong className="text-gray-700 text-xs font-medium">
                      Balances:
                    </strong>
                    <ul className="mt-1">
                      {businessDetails.balances.map((balance, index) => (
                        <li key={index} className="text-gray-700 text-xs">
                          {balance.provider}: ₦
                          {balance.balance.toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Business cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-5 py-5">
              <TotalTodayAppId appId={appId} />
              <TotalYesterdayAppId appId={appId} />
              <TotalThisWeekAppId appId={appId} />
              <TotalThisMonthAppId appId={appId} />
              <TotalPreviousMonthAppId appId={appId} />
              <TotalAllTimeId appId={appId} />
            </div>

            {/* chart  */}
            <div>
              {modalContent?.appId && (
                <div className="mt-6 px-4">
                  <ChartId appId={appId} />
                </div>
              )}
            </div>

            {/* business transaction table  */}
            <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100 ">
              <TransactionTable filters={filters} appId={appId} />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 px-4">
            {/* <h3 className="text-gray-700 font-semibold mb-4">Actions</h3> */}
            <div className="flex space-x-4 text-xs justify-center ">
              <button
                className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-4/5  "
                onClick={onClose}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessModal;
