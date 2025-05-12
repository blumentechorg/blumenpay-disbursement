// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import moment from "moment";
// import axiosInstance from "@/lib/axiosInstance";
// import DTableAppId from "@/components/disbursements/appid/DTableAppId";
// import DisbursementCards from "@/components/disbursements/cards/DisbursementCards";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, parse } from "date-fns";
// import DTransactionsAppId from "./appid/DTransactionsAppId";

// // Custom DatePicker component enforcing YYYY-MM-DD format
// const CustomDatePicker = ({ value, onChange, placeholder }) => {
//   const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;

//   const handleDateChange = (date) => {
//     const formatted = date ? format(date, "yyyy-MM-dd") : "";
//     onChange(formatted);
//   };

//   return (
//     <DatePicker
//       selected={parsedDate}
//       onChange={handleDateChange}
//       dateFormat="yyyy-MM-dd"
//       placeholderText={placeholder}
//       className="px-2 py-1 border rounded w-full"
//     />
//   );
// };

// const ViewModal = ({ modalContent, appId, onClose }) => {
//   const [businessDetails, setBusinessDetails] = useState(null);
//   const [filters, setFilters] = useState({});
//   const [loading, setLoading] = useState(false);

//   // FundSweep Preview states
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [previewData, setPreviewData] = useState(null);
//   const [previewLoading, setPreviewLoading] = useState(false);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   // Initialize FundSweep state
//   const [initLoading, setInitLoading] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [hideInitButton, setHideInitButton] = useState(false);

//   // Disbursement modal & form states
//   const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false);
//   const [banks, setBanks] = useState([]);
//   const [form, setForm] = useState({
//     bankCode: "",
//     accountNumber: "",
//     amount: "",
//     accountName: "",
//     comment: "",
//   });
//   const [validationDone, setValidationDone] = useState(false);
//   const [validating, setValidating] = useState(false);
//   const [sending, setSending] = useState(false);

//   // table refresh key
//   const [tableKey, setTableKey] = useState(0);

//   // Helper to format numbers with commas and Naira sign
//   const formatAmount = (value) => {
//     const number = Number(value) || 0;
//     return `₦${number.toLocaleString("en-NG")}`;
//   };

//   // Fetch business details by appId
//   useEffect(() => {
//     if (appId) {
//       setLoading(true);
//       axiosInstance
//         .get(`/Apps/${appId}`)
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
//   }, [appId]);

//   // Fetch banks when disburse modal opens
//   useEffect(() => {
//     if (isDisburseModalOpen && appId) {
//       axiosInstance
//         .get(`/Apps/Banks/${appId}`)
//         .then((res) => {
//           if (res.data.isSuccess) setBanks(res.data.data || []);
//         })
//         .catch((err) => console.error("Error fetching banks:", err));
//     }
//   }, [isDisburseModalOpen, appId]);

//   if (!modalContent) return null;

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) onClose();
//   };

//   // FundSweep preview
//   const handleGeneratePreview = () => {
//     if (startDate && endDate && startDate > endDate) {
//       setNotification({
//         type: "error",
//         message: "Start Date cannot be after End Date",
//       });
//       return;
//     }
//     setNotification(null);
//     setPreviewLoading(true);

//     axiosInstance
//       .get(`/Apps/FSPreview/${appId}`, {
//         params: {
//           ...(startDate ? { startDate } : {}),
//           ...(endDate ? { endDate } : {}),
//         },
//       })
//       .then((res) => {
//         if (res.data.isSuccess) {
//           setPreviewData(res.data.data);
//           setIsPreviewOpen(true);
//           setHideInitButton(false);
//         } else {
//           setNotification({
//             type: "error",
//             message: res.data.message || "Failed to fetch preview",
//           });
//         }
//       })
//       .catch(() =>
//         setNotification({
//           type: "error",
//           message: "Error generating fundsweep preview",
//         })
//       )
//       .finally(() => setPreviewLoading(false));
//   };

//   // Initialize FundSweep
//   const handleInitFundSweep = async () => {
//     setNotification(null);
//     setInitLoading(true);
//     try {
//       const payload = { appId };
//       if (startDate) payload.startDate = startDate;
//       if (endDate) payload.endDate = endDate;

//       const res = await axiosInstance.post("/Apps/InitFundSweep", payload);
//       if (res.data.isSuccess) {
//         setNotification({
//           type: "success",
//           message: "FundSweep initialized successfully",
//         });
//         setTableKey((k) => k + 1);
//         setHideInitButton(true);
//       } else {
//         setNotification({
//           type: "error",
//           message: res.data.message || "Initialization failed",
//         });
//       }
//     } catch {
//       setNotification({
//         type: "error",
//         message: "Error initializing FundSweep",
//       });
//     } finally {
//       setInitLoading(false);
//     }
//   };

//   // Validate bank/account
//   const validateAccount = async () => {
//     const { bankCode, accountNumber, amount } = form;
//     if (!bankCode || !accountNumber || !amount) return;
//     setValidating(true);
//     try {
//       const res = await axiosInstance.post("/Apps/ValidateAcct", {
//         bankCode,
//         accountNumber,
//         amount,
//       });
//       if (res.data.isSuccess) {
//         setForm((f) => ({ ...f, accountName: res.data.data.accountName }));
//         setValidationDone(true);
//       }
//     } catch (err) {
//       console.error("Validation error:", err);
//     } finally {
//       setValidating(false);
//     }
//   };

//   // Send disbursement (dummy endpoint)
//   const handleSendDisbursement = async () => {
//     setSending(true);
//     try {
//       const payload = {
//         appId,
//         bankCode: form.bankCode,
//         accountNumber: form.accountNumber,
//         amount: form.amount,
//         comment: form.comment,
//       };
//       await axiosInstance.post("/Apps/Disburse", payload);
//       // you could show a success notification here...
//       setIsDisburseModalOpen(false);
//       setValidationDone(false);
//       setForm({
//         bankCode: "",
//         accountNumber: "",
//         amount: "",
//         accountName: "",
//         comment: "",
//       });
//     } catch (err) {
//       console.error("Disbursement error:", err);
//     } finally {
//       setSending(false);
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

//           {/* Disbursement Cards */}
//           <div className="mt-5 px-4">
//             <DisbursementCards appId={appId} />
//           </div>

//           {/* FundSweep Preview Generator + Disburse */}
//           <div className="mt-4 px-4 space-y-2">
//             <div className="flex space-x-2 justify-end w-full">
//               <div className="w-40">
//                 <CustomDatePicker
//                   value={startDate}
//                   onChange={setStartDate}
//                   placeholder="Start Date"
//                 />
//               </div>
//               <div className="w-40">
//                 <CustomDatePicker
//                   value={endDate}
//                   onChange={setEndDate}
//                   placeholder="End Date"
//                 />
//               </div>
//               <button
//                 onClick={handleGeneratePreview}
//                 disabled={previewLoading}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {previewLoading ? "Generating…" : "Generate FundSweep Preview"}
//               </button>
//               <button
//                 onClick={() => setIsDisburseModalOpen(true)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Disburse
//               </button>
//             </div>
//           </div>

//           {/* FundSweep & Transaction Tables */}
//           <div className="space-y-10 py-5">
//             <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
//               <label className="uppercase text-xl font-semibold p-5">
//                 Fundsweep table
//               </label>
//               <DTableAppId key={tableKey} filters={filters} appId={appId} />
//             </div>
//             <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
//               <label className="uppercase text-xl font-semibold p-5">
//                 transaction table
//               </label>
//               <DTransactionsAppId appId={appId} />
//             </div>
//           </div>

//           {/* FundSweep Preview Modal */}
//           {isPreviewOpen && previewData && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//               <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
//                 {notification && (
//                   <div
//                     className={`p-2 rounded ${
//                       notification.type === "success"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     <TbAlertCircleFilled className="inline-block mr-1" />
//                     {notification.message}
//                   </div>
//                 )}

//                 <h2 className="text-xl font-bold">FundSweep Preview</h2>
//                 <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
//                   {/* ...table rows as before... */}
//                 </div>

//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={() => setIsPreviewOpen(false)}
//                     className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                   >
//                     Close Preview
//                   </button>
//                   {!hideInitButton && (
//                     <button
//                       onClick={handleInitFundSweep}
//                       disabled={initLoading}
//                       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//                     >
//                       {initLoading ? "Initializing…" : "Initialize FundSweep"}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Disburse Modal */}
//           {isDisburseModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//               <div className="bg-white rounded-lg p-6 w-1/3 space-y-4 shadow-lg">
//                 <h2 className="text-lg font-bold">Disbursement Form</h2>

//                 {/* Bank selector */}
//                 <select
//                   className="w-full border p-2 rounded"
//                   value={form.bankCode}
//                   onChange={(e) =>
//                     setForm({ ...form, bankCode: e.target.value })
//                   }
//                 >
//                   <option value="">Select Bank</option>
//                   {banks.map((b) => (
//                     <option key={b.code} value={b.code}>
//                       {b.name}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Account number */}
//                 <input
//                   type="text"
//                   placeholder="Account Number"
//                   className="w-full border p-2 rounded"
//                   value={form.accountNumber}
//                   onChange={(e) =>
//                     setForm({ ...form, accountNumber: e.target.value })
//                   }
//                 />

//                 {/* Amount */}
//                 <input
//                   type="number"
//                   placeholder="Amount"
//                   className="w-full border p-2 rounded"
//                   value={form.amount}
//                   onChange={(e) => setForm({ ...form, amount: e.target.value })}
//                 />

//                 {/* Validate button */}
//                 <button
//                   onClick={validateAccount}
//                   disabled={validating}
//                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//                 >
//                   {validating ? "Validating…" : "Validate Account"}
//                 </button>

//                 {/* Show after successful validation */}
//                 {validationDone && (
//                   <>
//                     <input
//                       type="text"
//                       className="w-full border p-2 rounded bg-gray-100"
//                       value={form.accountName}
//                       readOnly
//                     />

//                     <textarea
//                       className="w-full border p-2 rounded"
//                       placeholder="Comment"
//                       rows="3"
//                       value={form.comment}
//                       onChange={(e) =>
//                         setForm({ ...form, comment: e.target.value })
//                       }
//                     ></textarea>

//                     <div className="flex justify-end gap-2">
//                       <button
//                         className="bg-gray-300 text-black px-4 py-2 rounded"
//                         onClick={() => {
//                           setIsDisburseModalOpen(false);
//                           setValidationDone(false);
//                         }}
//                       >
//                         Close
//                       </button>
//                       <button
//                         onClick={handleSendDisbursement}
//                         disabled={sending}
//                         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//                       >
//                         {sending ? "Sending…" : "Send"}
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewModal;

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import moment from "moment";
// import axiosInstance from "@/lib/axiosInstance";
// import DTableAppId from "@/components/disbursements/appid/DTableAppId";
// import DisbursementCards from "@/components/disbursements/cards/DisbursementCards";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, parse } from "date-fns";
// import DTransactionsAppId from "./appid/DTransactionsAppId";

// // Custom DatePicker component enforcing YYYY-MM-DD format
// const CustomDatePicker = ({ value, onChange, placeholder }) => {
//   const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;
//   const handleDateChange = (date) => {
//     const formatted = date ? format(date, "yyyy-MM-dd") : "";
//     onChange(formatted);
//   };
//   return (
//     <DatePicker
//       selected={parsedDate}
//       onChange={handleDateChange}
//       dateFormat="yyyy-MM-dd"
//       placeholderText={placeholder}
//       className="px-2 py-1 border rounded w-full"
//     />
//   );
// };

// const ViewModal = ({ modalContent, appId, onClose }) => {
//   const [businessDetails, setBusinessDetails] = useState(null);
//   const [filters, setFilters] = useState({});
//   const [loading, setLoading] = useState(false);

//   // FundSweep Preview states
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [previewData, setPreviewData] = useState(null);
//   const [previewLoading, setPreviewLoading] = useState(false);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   // Initialize FundSweep state
//   const [initLoading, setInitLoading] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [hideInitButton, setHideInitButton] = useState(false);

//   // Disbursement modal & form states
//   const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false);
//   const [banks, setBanks] = useState([]);
//   const [form, setForm] = useState({
//     bankCode: "",
//     accountNumber: "",
//     amount: "",
//     accountName: "",
//     comment: "",
//   });
//   const [validating, setValidating] = useState(false);
//   const [validationDone, setValidationDone] = useState(false);
//   const [sending, setSending] = useState(false);

//   // Table refresh key
//   const [tableKey, setTableKey] = useState(0);

//   // Helper to format numbers with commas and Naira sign
//   const formatAmount = (value) => {
//     const number = Number(value) || 0;
//     return `₦${number.toLocaleString("en-NG")}`;
//   };

//   // Fetch business details by appId
//   useEffect(() => {
//     if (appId) {
//       setLoading(true);
//       axiosInstance
//         .get(`/Apps/${appId}`)
//         .then((res) => {
//           if (res.data.isSuccess) setBusinessDetails(res.data.data);
//         })
//         .catch(console.error)
//         .finally(() => setLoading(false));
//     }
//   }, [appId]);

//   // Fetch banks when disburse modal opens
//   useEffect(() => {
//     if (isDisburseModalOpen && appId) {
//       axiosInstance
//         .get(`/Apps/Banks/${appId}`)
//         .then((res) => {
//           if (res.data.isSuccess) setBanks(res.data.data || []);
//         })
//         .catch(console.error);
//     }
//   }, [isDisburseModalOpen, appId]);

//   // Auto-validate bank/account when all fields are set
//   useEffect(() => {
//     const { bankCode, accountNumber, amount } = form;
//     if (bankCode && accountNumber && amount) {
//       setValidating(true);
//       axiosInstance
//         .post("/Apps/ValidateAcct", { bankCode, accountNumber, amount })
//         .then((res) => {
//           if (res.data.isSuccess) {
//             setForm((f) => ({ ...f, accountName: res.data.data.accountName }));
//             setValidationDone(true);
//           }
//         })
//         .catch(console.error)
//         .finally(() => setValidating(false));
//     } else {
//       setValidationDone(false);
//       setForm((f) => ({ ...f, accountName: "" }));
//     }
//   }, [form.bankCode, form.accountNumber, form.amount]);

//   // FundSweep preview handler
//   const handleGeneratePreview = () => {
//     if (startDate && endDate && startDate > endDate) {
//       setNotification({
//         type: "error",
//         message: "Start Date cannot be after End Date",
//       });
//       return;
//     }
//     setNotification(null);
//     setPreviewLoading(true);
//     axiosInstance
//       .get(`/Apps/FSPreview/${appId}`, {
//         params: {
//           ...(startDate && { startDate }),
//           ...(endDate && { endDate }),
//         },
//       })
//       .then((res) => {
//         if (res.data.isSuccess) {
//           setPreviewData(res.data.data);
//           setIsPreviewOpen(true);
//           setHideInitButton(false);
//         } else {
//           setNotification({
//             type: "error",
//             message: res.data.message || "Failed to fetch preview",
//           });
//         }
//       })
//       .catch(() =>
//         setNotification({
//           type: "error",
//           message: "Error generating fundsweep preview",
//         })
//       )
//       .finally(() => setPreviewLoading(false));
//   };

//   // Initialize FundSweep handler
//   const handleInitFundSweep = async () => {
//     setNotification(null);
//     setInitLoading(true);
//     try {
//       const payload = {
//         appId,
//         ...(startDate && { startDate }),
//         ...(endDate && { endDate }),
//       };
//       const res = await axiosInstance.post("/Apps/InitFundSweep", payload);
//       if (res.data.isSuccess) {
//         setNotification({
//           type: "success",
//           message: "FundSweep initialized successfully",
//         });
//         setTableKey((k) => k + 1);
//         setHideInitButton(true);
//       } else {
//         setNotification({
//           type: "error",
//           message: res.data.message || "Initialization failed",
//         });
//       }
//     } catch {
//       setNotification({
//         type: "error",
//         message: "Error initializing FundSweep",
//       });
//     } finally {
//       setInitLoading(false);
//     }
//   };

//   // Send disbursement (dummy endpoint)
//   const handleSendDisbursement = async () => {
//     setSending(true);
//     try {
//       await axiosInstance.post("/Apps/Disburse", {
//         appId,
//         bankCode: form.bankCode,
//         accountNumber: form.accountNumber,
//         amount: form.amount,
//         comment: form.comment,
//       });
//       setIsDisburseModalOpen(false);
//       setForm({
//         bankCode: "",
//         accountNumber: "",
//         amount: "",
//         accountName: "",
//         comment: "",
//       });
//     } catch (err) {
//       console.error("Disbursement error:", err);
//     } finally {
//       setSending(false);
//     }
//   };

//   if (!modalContent) return null;
//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) onClose();
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

//           {/* Disbursement Cards */}
//           <div className="mt-5 px-4">
//             <DisbursementCards appId={appId} />
//           </div>

//           {/* FundSweep Preview Generator + Disburse */}
//           <div className="mt-4 px-4 space-y-2">
//             <div className="flex space-x-2 justify-end w-full">
//               <div className="w-40">
//                 <CustomDatePicker
//                   value={startDate}
//                   onChange={setStartDate}
//                   placeholder="Start Date"
//                 />
//               </div>
//               <div className="w-40">
//                 <CustomDatePicker
//                   value={endDate}
//                   onChange={setEndDate}
//                   placeholder="End Date"
//                 />
//               </div>
//               <button
//                 onClick={handleGeneratePreview}
//                 disabled={previewLoading}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {previewLoading ? "Generating…" : "Generate FundSweep Preview"}
//               </button>
//               <button
//                 onClick={() => setIsDisburseModalOpen(true)}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               >
//                 Disburse
//               </button>
//             </div>
//           </div>

//           {/* FundSweep & Transaction Tables */}
//           <div className="space-y-10 py-5">
//             <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
//               <label className="uppercase text-xl font-semibold p-5">
//                 Fundsweep table
//               </label>
//               <DTableAppId key={tableKey} filters={filters} appId={appId} />
//             </div>
//             <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
//               <label className="uppercase text-xl font-semibold p-5">
//                 transaction table
//               </label>
//               <DTransactionsAppId appId={appId} />
//             </div>
//           </div>

//           {/* FundSweep Preview Modal */}
//           {isPreviewOpen && previewData && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//               <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
//                 {notification && (
//                   <div
//                     className={`p-2 rounded ${
//                       notification.type === "success"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     <TbAlertCircleFilled className="inline-block mr-1" />
//                     {notification.message}
//                   </div>
//                 )}
//                 <h2 className="text-xl font-bold">FundSweep Preview</h2>
//                 <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
//                   {/* preview table rows here */}
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={() => setIsPreviewOpen(false)}
//                     className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                   >
//                     Close Preview
//                   </button>
//                   {!hideInitButton && (
//                     <button
//                       onClick={handleInitFundSweep}
//                       disabled={initLoading}
//                       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//                     >
//                       {initLoading ? "Initializing…" : "Initialize FundSweep"}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Disburse Modal */}
//           {isDisburseModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//               <div className="bg-white rounded-lg p-6 w-1/3 space-y-4 shadow-lg">
//                 <h2 className="text-lg font-bold">Disbursement Form</h2>

//                 <select
//                   className="w-full border p-2 rounded"
//                   value={form.bankCode}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, bankCode: e.target.value }))
//                   }
//                 >
//                   <option value="">Select Bank</option>
//                   {banks.map((b) => (
//                     <option key={b.code} value={b.code}>
//                       {b.name}
//                     </option>
//                   ))}
//                 </select>

//                 <input
//                   type="text"
//                   placeholder="Account Number"
//                   className="w-full border p-2 rounded"
//                   value={form.accountNumber}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, accountNumber: e.target.value }))
//                   }
//                 />

//                 <input
//                   type="number"
//                   placeholder="Amount"
//                   className="w-full border p-2 rounded"
//                   value={form.amount}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, amount: e.target.value }))
//                   }
//                 />

//                 {validating && (
//                   <div className="flex items-center space-x-2">
//                     <div className="loader border-t-2 border-blue-600 rounded-full w-4 h-4 animate-spin"></div>
//                     <span>Validating account…</span>
//                   </div>
//                 )}

//                 {validationDone && !validating && (
//                   <>
//                     <input
//                       type="text"
//                       readOnly
//                       className="w-full border p-2 rounded bg-gray-100"
//                       value={form.accountName}
//                     />

//                     <textarea
//                       rows={3}
//                       placeholder="Comment"
//                       className="w-full border p-2 rounded"
//                       value={form.comment}
//                       onChange={(e) =>
//                         setForm((f) => ({ ...f, comment: e.target.value }))
//                       }
//                     />

//                     <div className="flex justify-end space-x-2">
//                       <button
//                         className="bg-gray-300 px-4 py-2 rounded"
//                         onClick={() => {
//                           setIsDisburseModalOpen(false);
//                           setValidationDone(false);
//                         }}
//                       >
//                         Close
//                       </button>
//                       <button
//                         onClick={handleSendDisbursement}
//                         disabled={sending}
//                         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
//                       >
//                         {sending ? "Sending…" : "Send"}
//                       </button>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ViewModal;

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import moment from "moment";
// import axiosInstance from "@/lib/axiosInstance";
// import DTableAppId from "@/components/disbursements/appid/DTableAppId";
// import DisbursementCards from "@/components/disbursements/cards/DisbursementCards";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import { format, parse } from "date-fns";
// import DTransactionsAppId from "./appid/DTransactionsAppId";

// // Custom DatePicker component enforcing YYYY-MM-DD format
// const CustomDatePicker = ({ value, onChange, placeholder }) => {
//   const parsedDate = value ? parse(value, "yyyy-MM-dd", new Date()) : null;
//   const handleDateChange = (date) => {
//     const formatted = date ? format(date, "yyyy-MM-dd") : "";
//     onChange(formatted);
//   };
//   return (
//     <DatePicker
//       selected={parsedDate}
//       onChange={handleDateChange}
//       dateFormat="yyyy-MM-dd"
//       placeholderText={placeholder}
//       className="px-2 py-1 border rounded w-full"
//     />
//   );
// };

// const ViewModal = ({ modalContent, appId, onClose }) => {
//   const [businessDetails, setBusinessDetails] = useState(null);
//   const [filters, setFilters] = useState({});
//   const [loading, setLoading] = useState(false);

//   // FundSweep Preview states
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [previewData, setPreviewData] = useState(null);
//   const [previewLoading, setPreviewLoading] = useState(false);
//   const [isPreviewOpen, setIsPreviewOpen] = useState(false);

//   // Initialize FundSweep state
//   const [initLoading, setInitLoading] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const [hideInitButton, setHideInitButton] = useState(false);

//   // Disbursement modal & form states
//   const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false);
//   const [banks, setBanks] = useState([]);
//   const [form, setForm] = useState({
//     bankCode: "",
//     accountNumber: "",
//     amount: "",
//     accountName: "",
//     comment: "",
//   });
//   const [validating, setValidating] = useState(false);
//   const [validationDone, setValidationDone] = useState(false);
//   const [sending, setSending] = useState(false);

//   // Table refresh key
//   const [tableKey, setTableKey] = useState(0);

//   // Helper to format numbers with commas and Naira sign
//   const formatAmount = (value) => {
//     const number = Number(value) || 0;
//     return `₦${number.toLocaleString("en-NG")}`;
//   };

//   // Fetch business details by appId
//   useEffect(() => {
//     if (appId) {
//       setLoading(true);
//       axiosInstance
//         .get(`/Apps/${appId}`)
//         .then((res) => {
//           if (res.data.isSuccess) setBusinessDetails(res.data.data);
//         })
//         .catch(console.error)
//         .finally(() => setLoading(false));
//     }
//   }, [appId]);

//   // Fetch banks when disburse modal opens
//   useEffect(() => {
//     if (isDisburseModalOpen && appId) {
//       axiosInstance
//         .get(`/Apps/Banks/${appId}`)
//         .then((res) => {
//           if (res.data.isSuccess) setBanks(res.data.data || []);
//         })
//         .catch(console.error);
//     }
//   }, [isDisburseModalOpen, appId]);

//   // Auto-validate bank/account when bankCode, accountNumber & amount are set
//   useEffect(() => {
//     const { bankCode, accountNumber, amount } = form;
//     if (bankCode && accountNumber && amount) {
//       setValidating(true);
//       axiosInstance
//         .post("/Apps/ValidateAcct", {
//           provider: "paystack",
//           bankCode,
//           acctNumber: accountNumber,
//           acctName: "", // blank on request, Paystack fills it
//           amount: Number(amount),
//           appId: Number(appId),
//         })
//         .then((res) => {
//           if (res.data.isSuccess && res.data.data.acctName) {
//             setForm((f) => ({ ...f, accountName: res.data.data.acctName }));
//             setValidationDone(true);
//           }
//         })
//         .catch(console.error)
//         .finally(() => setValidating(false));
//     } else {
//       setValidationDone(false);
//       setForm((f) => ({ ...f, accountName: "" }));
//     }
//   }, [form.bankCode, form.accountNumber, form.amount, appId]);

//   // FundSweep preview handler
//   const handleGeneratePreview = () => {
//     if (startDate && endDate && startDate > endDate) {
//       setNotification({
//         type: "error",
//         message: "Start Date cannot be after End Date",
//       });
//       return;
//     }
//     setNotification(null);
//     setPreviewLoading(true);
//     axiosInstance
//       .get(`/Apps/FSPreview/${appId}`, {
//         params: {
//           ...(startDate && { startDate }),
//           ...(endDate && { endDate }),
//         },
//       })
//       .then((res) => {
//         if (res.data.isSuccess) {
//           setPreviewData(res.data.data);
//           setIsPreviewOpen(true);
//           setHideInitButton(false);
//         } else {
//           setNotification({
//             type: "error",
//             message: res.data.message || "Failed to fetch preview",
//           });
//         }
//       })
//       .catch(() =>
//         setNotification({
//           type: "error",
//           message: "Error generating fundsweep preview",
//         })
//       )
//       .finally(() => setPreviewLoading(false));
//   };

//   // Initialize FundSweep handler
//   const handleInitFundSweep = async () => {
//     setNotification(null);
//     setInitLoading(true);
//     try {
//       const payload = {
//         appId,
//         ...(startDate && { startDate }),
//         ...(endDate && { endDate }),
//       };
//       const res = await axiosInstance.post("/Apps/InitFundSweep", payload);
//       if (res.data.isSuccess) {
//         setNotification({
//           type: "success",
//           message: "FundSweep initialized successfully",
//         });
//         setTableKey((k) => k + 1);
//         setHideInitButton(true);
//       } else {
//         setNotification({
//           type: "error",
//           message: res.data.message || "Initialization failed",
//         });
//       }
//     } catch {
//       setNotification({
//         type: "error",
//         message: "Error initializing FundSweep",
//       });
//     } finally {
//       setInitLoading(false);
//     }
//   };

//   // Send disbursement
//   const handleSendDisbursement = async () => {
//     setSending(true);
//     try {
//       await axiosInstance.post("/Apps/Disburse", {
//         appId,
//         bankCode: form.bankCode,
//         accountNumber: form.accountNumber,
//         amount: form.amount,
//         comment: form.comment,
//       });
//       setIsDisburseModalOpen(false);
//       setForm({
//         bankCode: "",
//         accountNumber: "",
//         amount: "",
//         accountName: "",
//         comment: "",
//       });
//     } catch (err) {
//       console.error("Disbursement error:", err);
//     } finally {
//       setSending(false);
//     }
//   };

//   if (!modalContent) return null;
//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) onClose();
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

//           {/* Disbursement Cards */}
//           <div className="mt-5 px-4">
//             <DisbursementCards appId={appId} />
//           </div>

//           {/* FundSweep Preview Generator + Disburse */}
//           <div className="mt-4 px-4 space-y-2">
//             <div className="flex space-x-2 justify-end w-full">
//               <div className="w-40">
//                 <CustomDatePicker
//                   value={startDate}
//                   onChange={setStartDate}
//                   placeholder="Start Date"
//                 />
//               </div>
//               <div className="w-40">
//                 <CustomDatePicker
//                   value={endDate}
//                   onChange={setEndDate}
//                   placeholder="End Date"
//                 />
//               </div>
//               <button
//                 onClick={handleGeneratePreview}
//                 disabled={previewLoading}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
//               >
//                 {previewLoading ? "Generating…" : "Generate FundSweep Preview"}
//               </button>
//               <button
//                 onClick={() => setIsDisburseModalOpen(true)}
//                 className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//               >
//                 Disburse
//               </button>
//             </div>
//           </div>

//           {/* FundSweep & Transaction Tables */}
//           <div className="space-y-10 py-5">
//             <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
//               <label className="uppercase text-xl font-semibold p-5">
//                 Fundsweep table
//               </label>
//               <DTableAppId key={tableKey} filters={filters} appId={appId} />
//             </div>
//             <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
//               <label className="uppercase text-xl font-semibold p-5">
//                 transaction table
//               </label>
//               <DTransactionsAppId appId={appId} />
//             </div>
//           </div>

//           {/* FundSweep Preview Modal */}
//           {isPreviewOpen && previewData && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//               <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
//                 {notification && (
//                   <div
//                     className={`p-2 rounded ${
//                       notification.type === "success"
//                         ? "bg-green-100 text-green-800"
//                         : "bg-red-100 text-red-800"
//                     }`}
//                   >
//                     <TbAlertCircleFilled className="inline-block mr-1" />{" "}
//                     {notification.message}
//                   </div>
//                 )}
//                 <h2 className="text-xl font-bold">FundSweep Preview</h2>
//                 <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
//                   {/* … */}
//                 </div>
//                 <div className="flex justify-end space-x-4">
//                   <button
//                     onClick={() => setIsPreviewOpen(false)}
//                     className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//                   >
//                     Close Preview
//                   </button>
//                   {!hideInitButton && (
//                     <button
//                       onClick={handleInitFundSweep}
//                       disabled={initLoading}
//                       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//                     >
//                       {initLoading ? "Initializing…" : "Initialize FundSweep"}
//                     </button>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Disburse Modal */}
//           {isDisburseModalOpen && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
//               <div className="bg-white rounded-lg p-6 w-1/3 space-y-4 shadow-lg">
//                 <h2 className="text-lg font-bold">Disbursement Form</h2>

//                 {/* Bank selector */}
//                 <select
//                   className="w-full border p-2 rounded"
//                   value={form.bankCode}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, bankCode: e.target.value }))
//                   }
//                 >
//                   <option value="">Select Bank</option>
//                   {banks.map((b) => (
//                     <option key={b.code} value={b.code}>
//                       {b.name}
//                     </option>
//                   ))}
//                 </select>

//                 {/* Account number */}
//                 <input
//                   type="text"
//                   placeholder="Account Number"
//                   className="w-full border p-2 rounded"
//                   value={form.accountNumber}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, accountNumber: e.target.value }))
//                   }
//                 />

//                 {/* Amount */}
//                 <input
//                   type="number"
//                   placeholder="Amount"
//                   className="w-full border p-2 rounded"
//                   value={form.amount}
//                   onChange={(e) =>
//                     setForm((f) => ({ ...f, amount: e.target.value }))
//                   }
//                 />

//                 {/* Loader */}
//                 {validating && (
//                   <div className="flex items-center space-x-2">
//                     <div className="loader border-t-2 border-blue-600 rounded-full w-4 h-4 animate-spin"></div>
//                     <span>Validating account…</span>
//                   </div>
//                 )}

//                 {/* After validation */}
//                 {validationDone && !validating && (
//                   <>
//                     <input
//                       type="text"
//                       readOnly
//                       className="w-full border p-2 rounded bg-gray-100"
//                       value={form.accountName}
//                     />

//                     <textarea
//                       rows={3}
//                       placeholder="Comment"
//                       className="w-full border p-2 rounded"
//                       value={form.comment}
//                       onChange={(e) =>
//                         setForm((f) => ({ ...f, comment: e.target.value }))
//                       }
//                     />

//                     <div className="flex justify-end space-x-2">
//                       <button
//                         className="bg-gray-300 px-4 py-2 rounded"
//                         onClick={() => {
//                           setIsDisburseModalOpen(false);
//                           setValidationDone(false);
//                         }}
//                       >
//                         Close
//                       </button>
//                       <button
//                         onClick={handleSendDisbursement}
//                         disabled={sending}
//                         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
//                       >
//                         {sending ? "Sending…" : "Send"}
//                       </button>
//                     </div>
//                   </>
//                 )}
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
import moment from "moment";
import axiosInstance from "@/lib/axiosInstance";
import DTableAppId from "@/components/disbursements/appid/DTableAppId";
import DisbursementCards from "@/components/disbursements/cards/DisbursementCards";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import DTransactionsAppId from "./appid/DTransactionsAppId";

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

  // Disbursement modal & form states
  const [isDisburseModalOpen, setIsDisburseModalOpen] = useState(false);
  const [banks, setBanks] = useState([]);
  const [form, setForm] = useState({
    bankCode: "",
    accountNumber: "",
    amount: "",
    accountName: "",
    comment: "",
  });
  const [validating, setValidating] = useState(false);
  const [validationDone, setValidationDone] = useState(false);
  const [sending, setSending] = useState(false);

  // Table refresh key
  const [tableKey, setTableKey] = useState(0);

  const formatAmount = (value) => {
    const number = Number(value) || 0;
    return `₦${number.toLocaleString("en-NG")}`;
  };

  // Fetch business details
  useEffect(() => {
    if (appId) {
      setLoading(true);
      axiosInstance
        .get(`/Apps/${appId}`)
        .then((res) => {
          if (res.data.isSuccess) setBusinessDetails(res.data.data);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [appId]);

  // Fetch banks
  useEffect(() => {
    if (isDisburseModalOpen && appId) {
      axiosInstance
        .get(`/Apps/Banks/${appId}`)
        .then((res) => {
          if (res.data.isSuccess) setBanks(res.data.data || []);
        })
        .catch(console.error);
    }
  }, [isDisburseModalOpen, appId]);

  // Auto-validate
  useEffect(() => {
    const { bankCode, accountNumber, amount } = form;
    if (bankCode && accountNumber && amount) {
      setValidating(true);
      axiosInstance
        .post("/Apps/ValidateAcct", {
          provider: "paystack",
          bankCode,
          acctNumber: accountNumber,
          acctName: "",
          amount: Number(amount),
          appId: Number(appId),
        })
        .then((res) => {
          if (res.data.isSuccess && res.data.data.acctName) {
            setForm((f) => ({ ...f, accountName: res.data.data.acctName }));
            setValidationDone(true);
          }
        })
        .catch(console.error)
        .finally(() => setValidating(false));
    } else {
      setValidationDone(false);
      setForm((f) => ({ ...f, accountName: "" }));
    }
  }, [form.bankCode, form.accountNumber, form.amount, appId]);

  // Preview handlers...
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
          ...(startDate && { startDate }),
          ...(endDate && { endDate }),
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

  const handleInitFundSweep = async () => {
    setNotification(null);
    setInitLoading(true);
    try {
      const payload = {
        appId,
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      };
      const res = await axiosInstance.post("/Apps/InitFundSweep", payload);
      if (res.data.isSuccess) {
        setNotification({
          type: "success",
          message: "FundSweep initialized successfully",
        });
        setTableKey((k) => k + 1);
        setHideInitButton(true);
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

  const handleSendDisbursement = async () => {
    setSending(true);
    try {
      await axiosInstance.post("/Apps/Disburse", {
        appId,
        bankCode: form.bankCode,
        accountNumber: form.accountNumber,
        amount: form.amount,
        comment: form.comment,
      });
      setIsDisburseModalOpen(false);
      setForm({
        bankCode: "",
        accountNumber: "",
        amount: "",
        accountName: "",
        comment: "",
      });
    } catch (err) {
      console.error("Disbursement error:", err);
    } finally {
      setSending(false);
    }
  };

  if (!modalContent) return null;
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
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

          {/* FundSweep & Disburse controls */}
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
              <button
                onClick={() => setIsDisburseModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Disburse
              </button>
            </div>
          </div>

          {/* Tables */}
          <div className="space-y-10 py-5">
            <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
              <label className="uppercase text-xl font-semibold p-5">
                Fundsweep table
              </label>
              <DTableAppId key={tableKey} filters={filters} appId={appId} />
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100">
              <label className="uppercase text-xl font-semibold p-5">
                transaction table
              </label>
              <DTransactionsAppId appId={appId} />
            </div>
          </div>

          {/* Preview Modal */}
          {isPreviewOpen && previewData && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-1/2 space-y-4">
                {/* Notification & table… */}
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

          {/* Disburse Modal */}
          {isDisburseModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 w-1/3 space-y-4 shadow-lg">
                <h2 className="text-lg font-bold">Disbursement Form</h2>

                <select
                  className="w-full border p-2 rounded"
                  value={form.bankCode}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, bankCode: e.target.value }))
                  }
                >
                  <option value="">Select Bank</option>
                  {banks.map((b) => (
                    <option key={b.code} value={b.code}>
                      {b.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Account Number"
                  className="w-full border p-2 rounded"
                  value={form.accountNumber}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, accountNumber: e.target.value }))
                  }
                />

                <input
                  type="number"
                  placeholder="Amount"
                  className="w-full border p-2 rounded"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: e.target.value }))
                  }
                />

                <button
                  className="bg-gray-300 text-black px-4 py-2 rounded mb-2"
                  onClick={() => {
                    setIsDisburseModalOpen(false);
                    setValidationDone(false);
                  }}
                >
                  Close
                </button>

                {validating && (
                  <div className="flex items-center space-x-2">
                    <div className="loader border-t-2 border-blue-600 rounded-full w-4 h-4 animate-spin"></div>
                    <span>Validating account…</span>
                  </div>
                )}

                {validationDone && !validating && (
                  <>
                    <input
                      type="text"
                      readOnly
                      className="w-full border p-2 rounded bg-gray-100"
                      value={form.accountName}
                    />

                    <textarea
                      rows={3}
                      placeholder="Comment"
                      className="w-full border p-2 rounded"
                      value={form.comment}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, comment: e.target.value }))
                      }
                    />

                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={handleSendDisbursement}
                        disabled={sending}
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                      >
                        {sending ? "Sending…" : "Send"}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
