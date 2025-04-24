"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import { FiCopy } from "react-icons/fi";
import moment from "moment";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import DTableAppId from "@/components/disbursements/appid/DTableAppId";
// ← NEW import for your toggle/cards component:
import DisbursementCards from "@/components/disbursements/cards/DisbursementCards";

const ViewModal = ({ modalContent, appId, onClose }) => {
  const [businessDetails, setBusinessDetails] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");

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
    if (e.target === e.currentTarget) onClose();
  };

  const creationDate =
    businessDetails?.apiKeyCreationDate ||
    modalContent.apiKeyCreationDate ||
    null;
  const formattedDate = creationDate
    ? moment(creationDate).format("h:mm A, MMM D")
    : "N/A";

  const status = businessDetails?.status ||
    modalContent.status || {
      label: "Unknown",
    };
  const statusLabel = typeof status === "object" ? status.label : status;

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

  const handleGenerateKey = () => {
    setIsGenerating(true);
    axiosInstance
      .post("/Apps/Key", { id: modalContent.id })
      .then((response) => {
        if (response.data.isSuccess) {
          setBusinessDetails((prev) => ({
            ...prev,
            apiKey: response.data.data.apiKey,
          }));
          setNewApiKey(response.data.data.apiKey);
          toast.success("API Key generated successfully");
        }
      })
      .catch((error) => {
        console.error("Error generating new key:", error);
        toast.error("Failed to generate API Key");
      })
      .finally(() => setIsGenerating(false));
  };

  const handleCopyKey = () => {
    if (newApiKey) {
      navigator.clipboard.writeText(newApiKey);
      toast.info("API Key copied to clipboard!");
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

          {/* ←––  DISPURSMENT CARDS ––→ */}
          <div className="mt-5 px-4">
            <DisbursementCards appId={appId} />
          </div>

          {/* Transactions Table */}
          <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
            <DTableAppId filters={filters} appId={appId} />
          </div>

          {/* Actions */}
          <div className="mt-10 px-4">
            <div className="flex space-x-4 text-xs justify-center">
              <button
                className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-4/5"
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

export default ViewModal;
