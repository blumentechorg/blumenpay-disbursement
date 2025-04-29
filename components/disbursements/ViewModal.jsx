// // "use client";

// // import Image from "next/image";
// // import React, { useEffect, useState } from "react";
// // import { FaTimes } from "react-icons/fa";
// // import { TbAlertCircleFilled } from "react-icons/tb";
// // import { FaCircleCheck } from "react-icons/fa6";
// // import { FiCopy } from "react-icons/fi";
// // import moment from "moment";
// // import axiosInstance from "@/lib/axiosInstance";
// // import { toast } from "react-toastify";
// // import DTableAppId from "@/components/disbursements/appid/DTableAppId";
// // // ← NEW import for your toggle/cards component:
// // import DisbursementCards from "@/components/disbursements/cards/DisbursementCards";

// // const ViewModal = ({ modalContent, appId, onClose }) => {
// //   const [businessDetails, setBusinessDetails] = useState(null);
// //   const [filters, setFilters] = useState({});
// //   const [loading, setLoading] = useState(false);
// //   const [isGenerating, setIsGenerating] = useState(false);
// //   const [newApiKey, setNewApiKey] = useState("");

// //   useEffect(() => {
// //     if (modalContent?.appId) {
// //       setLoading(true);
// //       axiosInstance
// //         .get(`/Apps/${modalContent.appId}`)
// //         .then((response) => {
// //           if (response.data.isSuccess) {
// //             setBusinessDetails(response.data.data);
// //           }
// //         })
// //         .catch((error) => {
// //           console.error("Error fetching business details:", error);
// //         })
// //         .finally(() => setLoading(false));
// //     }
// //   }, [modalContent?.appId]);

// //   if (!modalContent) return null;

// //   const handleBackdropClick = (e) => {
// //     if (e.target === e.currentTarget) onClose();
// //   };

// //   const creationDate =
// //     businessDetails?.apiKeyCreationDate ||
// //     modalContent.apiKeyCreationDate ||
// //     null;
// //   const formattedDate = creationDate
// //     ? moment(creationDate).format("h:mm A, MMM D")
// //     : "N/A";

// //   const status = businessDetails?.status ||
// //     modalContent.status || {
// //       label: "Unknown",
// //     };
// //   const statusLabel = typeof status === "object" ? status.label : status;

// //   const renderStatusIcon = () => {
// //     switch (statusLabel) {
// //       case "Active":
// //         return <FaCircleCheck className="text-green-500" size={32} />;
// //       case "Inactive":
// //       case "Failed":
// //         return <TbAlertCircleFilled className="text-red-500" size={32} />;
// //       default:
// //         return null;
// //     }
// //   };

// //   const handleGenerateKey = () => {
// //     setIsGenerating(true);
// //     axiosInstance
// //       .post("/Apps/Key", { id: modalContent.id })
// //       .then((response) => {
// //         if (response.data.isSuccess) {
// //           setBusinessDetails((prev) => ({
// //             ...prev,
// //             apiKey: response.data.data.apiKey,
// //           }));
// //           setNewApiKey(response.data.data.apiKey);
// //           toast.success("API Key generated successfully");
// //         }
// //       })
// //       .catch((error) => {
// //         console.error("Error generating new key:", error);
// //         toast.error("Failed to generate API Key");
// //       })
// //       .finally(() => setIsGenerating(false));
// //   };

// //   const handleCopyKey = () => {
// //     if (newApiKey) {
// //       navigator.clipboard.writeText(newApiKey);
// //       toast.info("API Key copied to clipboard!");
// //     }
// //   };

// //   return (
// //     <div
// //       className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
// //       onClick={handleBackdropClick}
// //     >
// //       <div
// //         className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 text-sm flex items-center justify-end"
// //         onClick={handleBackdropClick}
// //       >
// //         <div
// //           className="bg-gray-100 h-full shadow-lg relative overflow-y-auto w-4/5"
// //           onClick={(e) => e.stopPropagation()}
// //         >
// //           {/* Header */}
// //           <div className="flex items-center justify-between bg-white p-4">
// //             {businessDetails?.logo || modalContent.logo ? (
// //               <Image
// //                 src={businessDetails?.logo || modalContent.logo}
// //                 alt="Business Logo"
// //                 width={80}
// //                 height={80}
// //               />
// //             ) : (
// //               <div className="w-20 h-20 bg-gray-300 flex items-center justify-center">
// //                 <span className="text-xs text-gray-600">No Logo</span>
// //               </div>
// //             )}
// //             <button
// //               onClick={onClose}
// //               className="text-gray-600 hover:text-gray-800"
// //             >
// //               <FaTimes size={20} />
// //             </button>
// //           </div>

// //           {/* ←––  DISPURSMENT CARDS ––→ */}
// //           <div className="mt-5 px-4">
// //             <DisbursementCards appId={appId} />
// //           </div>

// //           {/* Transactions Table */}
// //           <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
// //             <DTableAppId filters={filters} appId={appId} />
// //           </div>

// //           {/* Actions */}
// //           <div className="mt-10 px-4">
// //             <div className="flex space-x-4 text-xs justify-center">
// //               <button
// //                 className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-4/5"
// //                 onClick={onClose}
// //               >
// //                 CLOSE
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default ViewModal;

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import { FaCircleCheck } from "react-icons/fa6";
// import { FiCopy } from "react-icons/fi";
// import moment from "moment";
// import axiosInstance from "@/lib/axiosInstance";
// import { toast } from "react-toastify";
// import DTableAppId from "@/components/disbursements/appid/DTableAppId";
// // ← NEW import for your toggle/cards component:
// import DisbursementCards from "@/components/disbursements/cards/DisbursementCards";

// const ViewModal = ({ modalContent, appId, onClose }) => {
//   const [businessDetails, setBusinessDetails] = useState(null);
//   const [filters, setFilters] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [newApiKey, setNewApiKey] = useState("");

//   // —— NEW STATES for FundSweep Preview ——
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [previewData, setPreviewData] = useState(null);
//   const [previewLoading, setPreviewLoading] = useState(false);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   useEffect(() => {
//     if (modalContent?.appId) {
//       setLoading(true);
//       axiosInstance
//         .get(`/Apps/${modalContent.appId}`)
//         .then((response) => {
//           if (response.data.isSuccess) {
//             setBusinessDetails(response.data.data);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching business details:", error);
//         })
//         .finally(() => setLoading(false));
//     }
//   }, [modalContent?.appId]);

//   if (!modalContent) return null;

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) onClose();
//   };

//   // —— NEW handler to call your FSPreview endpoint ——
//   const handleGeneratePreview = () => {
//     setPreviewLoading(true);
//     axiosInstance
//       .get(`/Apps/FSPreview/${modalContent.appId}`, {
//         params: {
//           ...(startDate && { startDate }),
//           ...(endDate && { endDate }),
//         },
//       })
//       .then((response) => {
//         if (response.data.isSuccess) {
//           setPreviewData(response.data.data);
//           setIsPreviewOpen(true);
//         } else {
//           toast.error(response.data.message || "Failed to fetch preview");
//         }
//       })
//       .catch((error) => {
//         console.error("Error generating fundsweep preview:", error);
//         toast.error("Error generating fundsweep preview");
//       })
//       .finally(() => setPreviewLoading(false));
//   };

//   const creationDate =
//     businessDetails?.apiKeyCreationDate ||
//     modalContent.apiKeyCreationDate ||
//     null;
//   const formattedDate = creationDate
//     ? moment(creationDate).format("h:mm A, MMM D")
//     : "N/A";

//   const status = businessDetails?.status ||
//     modalContent.status || {
//       label: "Unknown",
//     };
//   const statusLabel = typeof status === "object" ? status.label : status;

//   const renderStatusIcon = () => {
//     switch (statusLabel) {
//       case "Active":
//         return <FaCircleCheck className="text-green-500" size={32} />;
//       case "Inactive":
//       case "Failed":
//         return <TbAlertCircleFilled className="text-red-500" size={32} />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
//       onClick={handleBackdropClick}
//     >
//       <div
//         className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 text-sm flex items-center justify-end"
//         onClick={handleBackdropClick}
//       >
//         <div
//           className="bg-gray-100 h-full shadow-lg relative overflow-y-auto w-4/5"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between bg-white p-4">
//             {businessDetails?.logo || modalContent.logo ? (
//               <Image
//                 src={businessDetails?.logo || modalContent.logo}
//                 alt="Business Logo"
//                 width={80}
//                 height={80}
//               />
//             ) : (
//               <div className="w-20 h-20 bg-gray-300 flex items-center justify-center">
//                 <span className="text-xs text-gray-600">No Logo</span>
//               </div>
//             )}
//             <button
//               onClick={onClose}
//               className="text-gray-600 hover:text-gray-800"
//             >
//               <FaTimes size={20} />
//             </button>
//           </div>

//           {/* ←––  DISBURSEMENT CARDS ––→ */}
//           <div className="mt-5 px-4">
//             <DisbursementCards appId={appId} />
//           </div>

//           {/* ←––  FUNDSWEEP PREVIEW GENERATOR ––→ */}
//           <div className="mt-4 px-4 space-y-2  ">
//             <div className="flex space-x-2 justify-end">
//               <input
//                 type="date"
//                 value={startDate}
//                 onChange={(e) => setStartDate(e.target.value)}
//                 className="px-2 py-1 border rounded"
//                 placeholder="Start Date"
//               />
//               <input
//                 type="date"
//                 value={endDate}
//                 onChange={(e) => setEndDate(e.target.value)}
//                 className="px-2 py-1 border rounded"
//                 placeholder="End Date"
//               />
//               <button
//                 onClick={handleGeneratePreview}
//                 disabled={previewLoading}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
//               >
//                 {previewLoading ? "Generating…" : "Generate FundSweep Preview"}
//               </button>
//             </div>
//           </div>

//           {/* ←––  TRANSACTIONS TABLE ––→ */}
//           <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
//             <DTableAppId filters={filters} appId={appId} />
//           </div>

//           {/* ←––  CLOSE BUTTON ––→ */}
//           <div className="mt-10 px-4">
//             <div className="flex space-x-4 text-xs justify-center">
//               <button
//                 className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-4/5"
//                 onClick={onClose}
//               >
//                 CLOSE
//               </button>
//             </div>
//           </div>

//           {/* ←––  PREVIEW POPUP ––→ */}
//           {isPreviewOpen && previewData && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//               <div className="bg-white rounded-lg p-6 w-1/3 space-y-4">
//                 <h2 className="text-lg font-semibold">FundSweep Preview</h2>
//                 <div className="space-y-1 text-sm">
//                   <div>Total Amount: {previewData.totalAmount}</div>
//                   <div>Cash Total: {previewData.cashTotal}</div>
//                   <div>Online Total: {previewData.onlineTotal}</div>
//                   <div>Commission: {previewData.blumenPayCommission}</div>
//                   <div>Amount Payable: {previewData.amountPayable}</div>
//                   <div>Fee Incurred: {previewData.feeIncured}</div>
//                   <div>Cash Tx Count: {previewData.cashTransactionCount}</div>
//                   <div>
//                     Online Tx Count: {previewData.onlineTransactionCount}
//                   </div>
//                   <div>Profit: {previewData.profit}</div>
//                   <div>Unresolved Amount: {previewData.unresolvedAmount}</div>
//                   <div>Highest Amount: {previewData.highestAmount}</div>
//                   <div>Lowest Amount: {previewData.lowestAmount}</div>
//                   <div>
//                     Window Start:{" "}
//                     {moment(previewData.windowStartDate).format(
//                       "MMM D, YYYY h:mm A"
//                     )}
//                   </div>
//                   <div>
//                     Window End:{" "}
//                     {moment(previewData.windowEndDate).format(
//                       "MMM D, YYYY h:mm A"
//                     )}
//                   </div>
//                 </div>
//                 <div className="text-right">
//                   <button
//                     onClick={() => setIsPreviewOpen(false)}
//                     className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
//                   >
//                     Close Preview
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewModal;

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
import DisbursementCards from "@/components/disbursements/cards/DisbursementCards";

const ViewModal = ({ modalContent, appId, onClose }) => {
  const [businessDetails, setBusinessDetails] = useState(null);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(false);

  // API Key states
  const [isGenerating, setIsGenerating] = useState(false);
  const [newApiKey, setNewApiKey] = useState("");

  // FundSweep Preview states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [previewData, setPreviewData] = useState(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

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

  // API Key generation
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

  // FundSweep preview
  const handleGeneratePreview = () => {
    setPreviewLoading(true);
    axiosInstance
      .get(`/Apps/FSPreview/${appId}`, {
        params: {
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
        },
      })
      .then((response) => {
        if (response.data.isSuccess) {
          setPreviewData(response.data.data);
          setIsPreviewOpen(true);
        } else {
          toast.error(response.data.message || "Failed to fetch preview");
        }
      })
      .catch((error) => {
        console.error("Error generating fundsweep preview:", error);
        toast.error("Error generating fundsweep preview");
      })
      .finally(() => setPreviewLoading(false));
  };

  // Status display helpers (unused in this UI but retained)
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
            <div className="flex space-x-2 justify-end ">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="px-2 py-1 border rounded"
                placeholder="Start Date"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="px-2 py-1 border rounded"
                placeholder="End Date"
              />
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
            <DTableAppId filters={filters} appId={appId} />
          </div>

          {/* Close Button */}
          {/* <div className="mt-10 px-4">
            <div className="flex space-x-4 text-xs justify-center">
              <button
                className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-4/5"
                onClick={onClose}
              >
                CLOSE
              </button>
            </div>
          </div> */}

          {/* Preview Popup */}
          {isPreviewOpen && previewData && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-1/3 space-y-4">
                <h2 className="text-lg font-semibold">FundSweep Preview</h2>
                <div className="space-y-1 text-sm">
                  <div>Total Amount: {previewData.totalAmount}</div>
                  <div>Cash Total: {previewData.cashTotal}</div>
                  <div>Online Total: {previewData.onlineTotal}</div>
                  <div>Commission: {previewData.blumenPayCommission}</div>
                  <div>Amount Payable: {previewData.amountPayable}</div>
                  <div>Fee Incurred: {previewData.feeIncured}</div>
                  <div>Cash Tx Count: {previewData.cashTransactionCount}</div>
                  <div>
                    Online Tx Count: {previewData.onlineTransactionCount}
                  </div>
                  <div>Profit: {previewData.profit}</div>
                  <div>Unresolved Amount: {previewData.unresolvedAmount}</div>
                  <div>Highest Amount: {previewData.highestAmount}</div>
                  <div>Lowest Amount: {previewData.lowestAmount}</div>
                  <div>
                    Window Start:{" "}
                    {moment(previewData.windowStartDate).format(
                      "MMM D, YYYY h:mm A"
                    )}
                  </div>
                  <div>
                    Window End:{" "}
                    {moment(previewData.windowEndDate).format(
                      "MMM D, YYYY h:mm A"
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="mt-4 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Close Preview
                  </button>
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
