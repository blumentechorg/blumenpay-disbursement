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
  const [banksLoading, setBanksLoading] = useState(false);

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
      setBanksLoading(true);
      axiosInstance
        .get(`/Apps/Banks/${appId}`)
        .then((res) => {
          if (res.data.isSuccess) setBanks(res.data.data || []);
        })
        .catch(console.error)
        .finally(() => setBanksLoading(false));
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
          validatedName: "",
          amount: Number(amount),
          appId: Number(appId),
        })
        .then((res) => {
          if (res.data.isSuccess && res.data.data.validatedName) {
            setForm((f) => ({
              ...f,
              validatedName: res.data.data.validatedName,
            }));
            setValidationDone(true);
          }
        })
        .catch(console.error)
        .finally(() => setValidating(false));
    } else {
      setValidationDone(false);
      setForm((f) => ({ ...f, validatedName: "" }));
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
    setNotification(null);
    try {
      await axiosInstance.post("/Apps/Disburse", {
        appId,
        bankCode: form.bankCode,
        accountNumber: form.accountNumber,
        amount: form.amount,
        comment: form.comment,
      });
      setNotification({
        type: "success",
        message: "Disbursement sent successfully",
      });
      setIsDisburseModalOpen(false);
      setForm({
        bankCode: "",
        accountNumber: "",
        amount: "",
        validatedName: "",
        comment: "",
      });
    } catch (err) {
      console.error("Disbursement error:", err);
      setNotification({
        type: "error",
        message: "Failed to send disbursement",
      });
    } finally {
      setSending(false);
    }
  };

  if (!modalContent) return null;
  2;
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
          className="bg-gray-100 w-[350px] md:w-4/5 lg:w-1/3 h-full shadow-lg relative overflow-y-auto "
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
            <div className="flex flex-wrap space-x-2 justify-end w-full">
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
            <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100 px-3 lg:px-0">
              <label className="uppercase text-xl font-semibold p-5">
                Fundsweep table
              </label>
              <DTableAppId key={tableKey} filters={filters} appId={appId} />
            </div>
            <div className="flex-1 space-y-4 overflow-y-auto pt-5 bg-gray-100 px-3 lg:px-0">
              <label className="uppercase text-xl font-semibold p-5">
                transaction table
              </label>
              <DTransactionsAppId appId={appId} />
            </div>
          </div>

          {/* Preview Modal */}
          {isPreviewOpen && previewData && (
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center ">
              <div className="bg-white rounded-lg p-6 lg:w-1/2 space-y-4 px-3 md:px-0">
                {/* Notification & table… */}
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
                <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
                  <table className="min-w-full text-xs border border-gray-300 table-auto">
                    <thead className="bg-gray-100 font-semibold">
                      <tr>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Amount</th>
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
                        <tr key={label} className="border-t hover:bg-gray-50">
                          <td className="border px-4 py-2 font-bold">
                            {label}
                          </td>
                          <td className="border px-4 py-2">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

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
            <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center space-y-4 px-3 md:px-0">
              <div className="bg-white rounded-lg p-6 w-full max-w-md flex flex-col justify-between space-y-4 shadow-lg">
                {notification && (
                  <div
                    className={`p-3 rounded text-white mb-2 ${
                      notification.type === "success"
                        ? "bg-green-600"
                        : "bg-red-600"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <TbAlertCircleFilled size={20} />
                      <span>{notification.message}</span>
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-lg font-bold">Disbursement Form</h2>

                  {/* Bank Selector */}
                  <select
                    className="w-full border p-2 rounded"
                    value={form.bankCode}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, bankCode: e.target.value }))
                    }
                    disabled={banksLoading}
                  >
                    <option value="">Select Bank</option>
                    {banksLoading ? (
                      <option disabled>Loading banks...</option>
                    ) : (
                      banks.map((bank) => (
                        <option key={bank.bankCode} value={bank.bankCode}>
                          {bank.name}
                        </option>
                      ))
                    )}
                  </select>

                  {/* Account Number Input */}
                  <input
                    type="text"
                    placeholder="Account Number"
                    className="w-full border p-2 rounded mt-2"
                    value={form.accountNumber}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, accountNumber: e.target.value }))
                    }
                  />

                  {/* Amount Input */}
                  <input
                    type="number"
                    placeholder="Amount"
                    className="w-full border p-2 rounded mt-2"
                    value={form.amount}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, amount: e.target.value }))
                    }
                  />

                  {/* Validation Loader */}
                  {validating && (
                    <div className="flex items-center space-x-2 mt-2">
                      <div className="loader border-t-2 border-blue-600 rounded-full w-4 h-4 animate-spin"></div>
                      <span>Validating account…</span>
                    </div>
                  )}

                  {/* Display after validation is successful */}
                  {!validating && validationDone && (
                    <>
                      <input
                        type="text"
                        readOnly
                        className="w-full border p-2 rounded bg-gray-100 mt-2"
                        value={form.validatedName}
                      />

                      <textarea
                        rows={3}
                        placeholder="Comment"
                        className="w-full border p-2 rounded mt-2"
                        value={form.comment}
                        onChange={(e) =>
                          setForm((f) => ({ ...f, comment: e.target.value }))
                        }
                      />
                    </>
                  )}
                </div>

                {/* Buttons at bottom */}
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => {
                      setIsDisburseModalOpen(false);
                      setValidationDone(false);
                      setForm((f) => ({
                        ...f,
                        accountName: "",
                        comment: "",
                      }));
                    }}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                  >
                    Close
                  </button>
                  {validationDone && (
                    <button
                      onClick={handleSendDisbursement}
                      disabled={sending}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      {sending ? "Sending…" : "Send"}
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
