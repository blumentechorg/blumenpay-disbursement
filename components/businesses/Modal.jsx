// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import { FaCircleCheck } from "react-icons/fa6";
// import moment from "moment";
// import axiosInstance from "@/lib/axiosInstance";

// const BusinessModal = ({ modalContent, onClose }) => {
//   const [businessDetails, setBusinessDetails] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch business details when modalContent.appId is available
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
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   // Format API Key Creation Date
//   const creationDate =
//     businessDetails?.apiKeyCreationDate ||
//     modalContent.apiKeyCreationDate ||
//     null;
//   const formattedDate = creationDate
//     ? moment(creationDate).format("h:mm A, MMM D")
//     : "N/A";

//   // Extract status using the provided object format
//   const status = businessDetails?.status ||
//     modalContent.status || { label: "Unknown" };
//   const statusLabel = typeof status === "object" ? status.label : status;

//   // Render status icon based on status
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
//           className="bg-gray-100 w-1/3 h-full shadow-lg relative overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between bg-white p-4">
//             {businessDetails?.logo ? (
//               <Image
//                 src={businessDetails.logo}
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

//           {/* Business Details */}
//           <div className="mt-5 px-4">
//             <h3 className="text-gray-700 text-sm font-semibold mb-2">
//               Business Details
//             </h3>
//             <div className="p-4 bg-gray-50 rounded-md border space-y-3">
//               <div className="flex items-center gap-2">
//                 {renderStatusIcon()}
//                 <span
//                   className={
//                     statusLabel === "Active"
//                       ? "text-green-600"
//                       : statusLabel === "Inactive" || statusLabel === "Failed"
//                       ? "text-red-600"
//                       : ""
//                   }
//                 >
//                   {statusLabel}
//                 </span>
//               </div>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">Business Name:</span>{" "}
//                 <span className="uppercase">
//                   {businessDetails?.name || modalContent.name || "N/A"}
//                 </span>
//               </p>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">Description:</span>{" "}
//                 <span className="uppercase">
//                   {businessDetails?.description ||
//                     modalContent.description ||
//                     "N/A"}
//                 </span>
//               </p>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">App ID:</span>{" "}
//                 <span className="uppercase">
//                   {businessDetails?.appId || modalContent.appId || "N/A"}
//                 </span>
//               </p>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">Total Balance:</span>{" "}
//                 <span className="uppercase">
//                   ₦
//                   {(
//                     businessDetails?.totalBalance ||
//                     modalContent.totalBalance ||
//                     0
//                   ).toLocaleString()}
//                 </span>
//               </p>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">Default Provider:</span>{" "}
//                 <span className="uppercase">
//                   {businessDetails?.defaultProvider ||
//                     modalContent.defaultProvider ||
//                     "N/A"}
//                 </span>
//               </p>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">Business Key:</span>{" "}
//                 {businessDetails?.apiKeyMask ||
//                   modalContent.apiKeyMask ||
//                   "N/A"}
//               </p>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">API Key Created:</span>{" "}
//                 <span className="uppercase">{formattedDate}</span>
//               </p>
//               {businessDetails?.balances &&
//                 businessDetails.balances.length > 0 && (
//                   <div>
//                     <strong className="text-gray-700 text-xs font-medium">
//                       Balances:
//                     </strong>
//                     <ul className="mt-1">
//                       {businessDetails.balances.map((balance, index) => (
//                         <li key={index} className="text-gray-700 text-xs">
//                           {balance.provider}: ₦
//                           {balance.balance.toLocaleString()}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//             </div>
//           </div>

//           {/* Additional Business Information */}
//           <div className="mt-5 px-4">
//             <h3 className="text-gray-700 text-sm font-semibold mb-2">
//               Additional Details
//             </h3>
//             <div className="p-4 bg-gray-50 rounded-md border">
//               {loading ? (
//                 <p className="text-gray-500 text-xs">Loading...</p>
//               ) : businessDetails ? (
//                 // For demonstration, we're showing the full JSON details.
//                 // You can customize this section to show specific fields.
//                 <pre className="text-xs text-gray-600">
//                   {JSON.stringify(businessDetails, null, 2)}
//                 </pre>
//               ) : (
//                 <p className="text-gray-500 text-xs">
//                   No additional details available.
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="mt-10 px-4">
//             <h3 className="text-gray-700 font-semibold mb-4">Actions</h3>
//             <div className="flex space-x-4 text-xs">
//               <button
//                 className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full"
//                 onClick={onClose}
//               >
//                 CLOSE
//               </button>
//               <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-sm w-full">
//                 PRINT
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessModal;

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import { FaCircleCheck } from "react-icons/fa6";
// import moment from "moment";
// import axiosInstance from "@/lib/axiosInstance";

// const BusinessModal = ({ modalContent, onClose }) => {
//   const [businessDetails, setBusinessDetails] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [isGenerating, setIsGenerating] = useState(false);

//   // Fetch business details when modalContent.appId is available
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
//     if (e.target === e.currentTarget) {
//       onClose();
//     }
//   };

//   // Format API Key Creation Date
//   const creationDate =
//     businessDetails?.apiKeyCreationDate ||
//     modalContent.apiKeyCreationDate ||
//     null;
//   const formattedDate = creationDate
//     ? moment(creationDate).format("h:mm A, MMM D")
//     : "N/A";

//   // Extract status using the provided object format
//   const status = businessDetails?.status ||
//     modalContent.status || { label: "Unknown" };
//   const statusLabel = typeof status === "object" ? status.label : status;

//   // Render status icon based on status
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

//   // Handler for generating a new key
//   const handleGenerateKey = () => {
//     setIsGenerating(true);
//     axiosInstance
//       .post("/Apps/Key", { appId: modalContent.appId })
//       .then((response) => {
//         if (response.data.isSuccess) {
//           // Update the business details with the new API key.
//           // Assuming the response returns the new key in either "fullApiKey" or "apiKeyMask"
//           setBusinessDetails((prev) => ({
//             ...prev,
//             apiKeyMask: response.data.data.apiKeyMask,
//             fullApiKey:
//               response.data.data.fullApiKey || response.data.data.apiKeyMask,
//             apiKeyCreationDate: new Date(), // Optionally update the creation date
//           }));
//         }
//       })
//       .catch((error) => {
//         console.error("Error generating new key:", error);
//       })
//       .finally(() => {
//         setIsGenerating(false);
//       });
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
//           className="bg-gray-100 w-1/3 h-full shadow-lg relative overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="flex items-center justify-between bg-white p-4">
//             {businessDetails?.logo ? (
//               <Image
//                 src={businessDetails.logo}
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

//           {/* Business Details */}
//           <div className="mt-5 px-4">
//             <h3 className="text-gray-700 text-sm font-semibold mb-2">
//               Business Details
//             </h3>
//             <div className="p-4 bg-gray-50 rounded-md border space-y-3">
//               <div className="flex items-center gap-2">
//                 {renderStatusIcon()}
//                 <span
//                   className={
//                     statusLabel === "Active"
//                       ? "text-green-600"
//                       : statusLabel === "Inactive" || statusLabel === "Failed"
//                       ? "text-red-600"
//                       : ""
//                   }
//                 >
//                   {statusLabel}
//                 </span>
//               </div>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">Business Name:</span>{" "}
//                 <span className="uppercase">
//                   {businessDetails?.name || modalContent.name || "N/A"}
//                 </span>
//               </p>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">Description:</span>{" "}
//                 <span className="uppercase">
//                   {businessDetails?.description ||
//                     modalContent.description ||
//                     "N/A"}
//                 </span>
//               </p>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">App ID:</span>{" "}
//                 <span className="uppercase">
//                   {businessDetails?.appId || modalContent.appId || "N/A"}
//                 </span>
//               </p>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">Total Balance:</span>{" "}
//                 <span className="uppercase">
//                   ₦
//                   {(
//                     businessDetails?.totalBalance ||
//                     modalContent.totalBalance ||
//                     0
//                   ).toLocaleString()}
//                 </span>
//               </p>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">Default Provider:</span>{" "}
//                 <span className="uppercase">
//                   {businessDetails?.defaultProvider ||
//                     modalContent.defaultProvider ||
//                     "N/A"}
//                 </span>
//               </p>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">Business Key:</span>{" "}
//                 <span className="uppercase">
//                   {businessDetails?.fullApiKey ||
//                     businessDetails?.apiKeyMask ||
//                     modalContent.apiKeyMask ||
//                     "N/A"}
//                 </span>
//               </p>
//               {/* New Generate Key Button */}
//               <button
//                 className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-sm text-xs"
//                 onClick={handleGenerateKey}
//                 disabled={isGenerating}
//               >
//                 {isGenerating ? "Generating..." : "Generate New Key"}
//               </button>
//               <p className="text-gray-700 text-xs font-medium">
//                 <span className="font-light">API Key Created:</span>{" "}
//                 <span className="uppercase">{formattedDate}</span>
//               </p>
//               {businessDetails?.balances &&
//                 businessDetails.balances.length > 0 && (
//                   <div>
//                     <strong className="text-gray-700 text-xs font-medium">
//                       Balances:
//                     </strong>
//                     <ul className="mt-1">
//                       {businessDetails.balances.map((balance, index) => (
//                         <li key={index} className="text-gray-700 text-xs">
//                           {balance.provider}: ₦
//                           {balance.balance.toLocaleString()}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//             </div>
//           </div>

//           {/* Additional Business Information */}
//           <div className="mt-5 px-4">
//             <h3 className="text-gray-700 text-sm font-semibold mb-2">
//               Additional Details
//             </h3>
//             <div className="p-4 bg-gray-50 rounded-md border">
//               {loading ? (
//                 <p className="text-gray-500 text-xs">Loading...</p>
//               ) : businessDetails ? (
//                 <pre className="text-xs text-gray-600">
//                   {JSON.stringify(businessDetails, null, 2)}
//                 </pre>
//               ) : (
//                 <p className="text-gray-500 text-xs">
//                   No additional details available.
//                 </p>
//               )}
//             </div>
//           </div>

//           {/* Actions */}
//           <div className="mt-10 px-4">
//             <h3 className="text-gray-700 font-semibold mb-4">Actions</h3>
//             <div className="flex space-x-4 text-xs">
//               <button
//                 className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full"
//                 onClick={onClose}
//               >
//                 CLOSE
//               </button>
//               <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-sm w-full">
//                 PRINT
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BusinessModal;

"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import { FaCircleCheck } from "react-icons/fa6";
import moment from "moment";
import axiosInstance from "@/lib/axiosInstance";

const BusinessModal = ({ modalContent, onClose }) => {
  const [businessDetails, setBusinessDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

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
      .post("/Apps/Key", { appId: modalContent.appId })
      .then((response) => {
        if (response.data.isSuccess) {
          // Update the business details with the new API key
          setBusinessDetails((prev) => ({
            ...prev,
            apiKeyMask: response.data.data.apiKeyMask,
          }));
        }
      })
      .catch((error) => {
        console.error("Error generating new key:", error);
      })
      .finally(() => {
        setIsGenerating(false);
      });
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
          className="bg-gray-100 w-1/3 h-full shadow-lg relative overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-white p-4">
            {businessDetails?.logo ? (
              <Image
                src={businessDetails.logo}
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
                {businessDetails?.apiKeyMask ||
                  modalContent.apiKeyMask ||
                  "N/A"}
              </p>
              {/* New Generate Key Button */}
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-sm text-xs"
                onClick={handleGenerateKey}
                disabled={isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate New Key"}
              </button>
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
          </div>

          {/* Additional Business Information */}
          <div className="mt-5 px-4">
            <h3 className="text-gray-700 text-sm font-semibold mb-2">
              Additional Details
            </h3>
            <div className="p-4 bg-gray-50 rounded-md border">
              {loading ? (
                <p className="text-gray-500 text-xs">Loading...</p>
              ) : businessDetails ? (
                // For demonstration, we're showing the full JSON details.
                // You can customize this section to show specific fields.
                <pre className="text-xs text-gray-600">
                  {JSON.stringify(businessDetails, null, 2)}
                </pre>
              ) : (
                <p className="text-gray-500 text-xs">
                  No additional details available.
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-10 px-4">
            <h3 className="text-gray-700 font-semibold mb-4">Actions</h3>
            <div className="flex space-x-4 text-xs">
              <button
                className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full"
                onClick={onClose}
              >
                CLOSE
              </button>
              <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-sm w-full">
                PRINT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessModal;
