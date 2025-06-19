import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import { FiCopy } from "react-icons/fi";
import { FaCircleCheck } from "react-icons/fa6";
import kaduna from "@/public/images/kaduna.png";
import Dottedline from "@/public/icons/dottedline";
import moment from "moment";
import axiosInstance from "@/lib/axiosInstance";

// New component to handle copying and icon toggle
const CopyReference = ({ reference }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <span onClick={handleCopy} className="cursor-pointer">
      {copied ? (
        <FaCircleCheck className="text-green-500" size={14} />
      ) : (
        <FiCopy className="text-gray-500" size={14} />
      )}
    </span>
  );
};

const KadElectricModal = ({ modalContent, onClose }) => {
  const [appDetails, setAppDetails] = useState(null);
  const [isSendingToken, setIsSendingToken] = useState(false);
  const [showRetryForm, setShowRetryForm] = useState(false);
  const [retryReference, setRetryReference] = useState("");
  const [retryResponse, setRetryResponse] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentModalContent, setCurrentModalContent] = useState(modalContent);
  const [tokenResponse, setTokenResponse] = useState(null);

  // Initialize retryReference when showing the form
  const handleShowRetryForm = () => {
    const firstTransactionRef =
      currentModalContent.transactions?.[0]?.referenceNumber || "";
    setRetryReference(firstTransactionRef);
    setShowRetryForm(true);
    setRetryResponse(null);
  };

  // Refresh data whenever modal opens or modalContent changes
  useEffect(() => {
    setCurrentModalContent(modalContent);
    setRetryResponse(null);
    setTokenResponse(null);
    setShowRetryForm(false);
    setRetryReference("");

    if (modalContent?.appId) {
      axiosInstance
        .get(`/Apps/${modalContent.appId}`)
        .then((response) => {
          if (response.data.isSuccess) {
            setAppDetails(response.data.data);
          }
        })
        .catch((error) => {
          console.error("Error fetching app details:", error);
        });
    }
  }, [modalContent]);

  if (!currentModalContent) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const transactionDate =
    currentModalContent.createdAt || currentModalContent.date;
  const formattedDate = moment(transactionDate).format("h:mm A, MMM D");
  const statusLabel = currentModalContent.status?.label || "";

  const renderStatusIcon = () => {
    switch (statusLabel) {
      case "Success":
        return <FaCircleCheck className="text-green-500" size={32} />;
      case "Pending":
        return <TbAlertCircleFilled className="text-yellow-600" size={32} />;
      case "Failed":
        return <TbAlertCircleFilled className="text-red-500" size={32} />;
      default:
        return null;
    }
  };

  const isPrepaid = !!currentModalContent.prepaid;
  const isPostpaid = !!currentModalContent.postpaid;

  const handleSendToken = async () => {
    if (!currentModalContent.prepaid?.kadTransactionId) {
      console.error("kadTransactionId is missing in the payload");
      return;
    }
    setIsSendingToken(true);
    setTokenResponse(null);
    try {
      const response = await axiosInstance.get(
        `https://blumenpay.onrender.com/KadElectric/Sms/Token/${currentModalContent.prepaid.kadTransactionId}`
      );
      setTokenResponse({
        isSuccess: response.data.isSuccess,
        message: response.data.message || "Token sent successfully",
      });
    } catch (error) {
      console.error("Error sending token:", error);
      setTokenResponse({
        isSuccess: false,
        message: "Failed to send token",
      });
    } finally {
      setIsSendingToken(false);
    }
  };

  const handleRetrySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/KadElectric/OnlineFinalize", {
        reference: retryReference,
      });
      setRetryResponse(response.data);
      // Refresh the modal content after successful retry
      if (response.data.isSuccess && currentModalContent?.appId) {
        const appResponse = await axiosInstance.get(
          `/Apps/${currentModalContent.appId}`
        );
        if (appResponse.data.isSuccess) {
          setAppDetails(appResponse.data.data);
        }
      }
    } catch (error) {
      console.error("Error finalizing online transaction:", error);
      // Use the error response from the server if available
      if (error.response) {
        setRetryResponse({
          isSuccess: false,
          message:
            error.response.data.message || "Error finalizing transaction",
          data: error.response.data, // Include the full error response
        });
      } else if (error.request) {
        setRetryResponse({
          isSuccess: false,
          message: "No response received from server",
          data: null,
        });
      } else {
        setRetryResponse({
          isSuccess: false,
          message: error.message,
          data: null,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRefund = async () => {
    try {
      const response = await axiosInstance.post("/KadElectric/Refund", {
        id: currentModalContent.id,
      });
      if (response.data.isSuccess) {
        // Handle success
      }
    } catch (error) {
      console.error("Error processing refund:", error);
    }
  };

  const handleSendError = async () => {
    try {
      if (!currentModalContent.id) {
        console.error("Transaction id is missing in the payload");
        return;
      }
      const response = await axiosInstance.get(
        `/KadElectric/Errors/Notify/${currentModalContent.id}`
      );
      if (response.data.isSuccess) {
        console.log("Error notification sent successfully:", response.data);
      } else {
        console.error("Error notification failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error sending error message:", error);
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
          className="bg-gray-100 w-[320px] md:w-[420px] lg:w-1/3 h-full shadow-lg relative overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-white p-4">
            <Image
              src={kaduna}
              alt="Kaduna Electric Logo"
              width={80}
              height={80}
            />
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Transaction Details */}
          <div className="mt-5 px-4">
            <h3 className="text-gray-700 text-sm font-semibold mb-2">
              Transaction Details
            </h3>
            <div className="p-4 bg-gray-50 rounded-md border">
              <div className="flex items-center mb-3">{renderStatusIcon()}</div>
              <div className="space-y-3">
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Date:</span>{" "}
                  <span className="uppercase">{formattedDate}</span>
                </p>
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Customer Name:</span>{" "}
                  <span className="uppercase">
                    {currentModalContent.kadCustomer?.customerName || "N/A"}
                  </span>
                </p>
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Service Provider:</span>{" "}
                  <span className="uppercase">
                    {currentModalContent.provider || "Kaduna Electric"}
                  </span>
                </p>
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Amount:</span>{" "}
                  <span className="uppercase">
                    {currentModalContent.amount?.toLocaleString() || "N/A"}
                  </span>
                </p>
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Payment Method:</span>{" "}
                  <span className="uppercase">
                    {currentModalContent.paymentMethod?.label || "N/A"}
                  </span>
                </p>
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Status:</span>{" "}
                  <span
                    className={
                      statusLabel === "Failed"
                        ? "text-red-600"
                        : statusLabel === "Success"
                        ? "text-green-600"
                        : statusLabel === "Pending"
                        ? "text-yellow-600"
                        : ""
                    }
                  >
                    {statusLabel}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Business Details */}
          <div className="mt-5 px-4">
            <h3 className="text-gray-700 text-sm font-semibold mb-2">
              Business Details
            </h3>
            <div className="p-4 bg-gray-50 rounded-md border">
              <div className="space-y-3">
                <div className="text-gray-700 flex gap-1 items-center text-xs font-medium">
                  <span className="font-light">Business Name:</span>{" "}
                  <span className="uppercase flex gap-1">
                    <img
                      src={currentModalContent.app?.logo}
                      alt={currentModalContent.app?.logo}
                      className="w-10"
                    />
                    {currentModalContent.app?.name || "Kaduna Electric"}
                  </span>
                </div>
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Description:</span>{" "}
                  <span className="uppercase">
                    {currentModalContent.app?.description || "N/A"}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Transaction Type Details */}
          <div className="mt-5 px-4">
            <h3 className="text-gray-700 text-sm font-semibold mb-2">
              Transaction Type Details
            </h3>
            <div className="p-4 bg-gray-50 rounded-md border">
              {isPrepaid ? (
                <div className="space-y-3">
                  <h4 className="text-gray-700 text-xs font-medium mb-2">
                    Prepaid
                  </h4>
                  <p className="text-gray-700 text-xs font-medium flex items-center gap-1">
                    <span className="font-light">Meter Number:</span>{" "}
                    <span className="flex items-center gap-1">
                      {currentModalContent.prepaid.meterNumber}
                      <CopyReference
                        reference={currentModalContent.prepaid.meterNumber}
                      />
                    </span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium flex items-center gap-1">
                    <span className="font-light">Token:</span>{" "}
                    <span className="flex items-center gap-1">
                      {currentModalContent.prepaid.token || "N/A"}
                      {currentModalContent.prepaid.token && (
                        <CopyReference
                          reference={currentModalContent.prepaid.token}
                        />
                      )}
                    </span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium">
                    <span className="font-light">Amount:</span>{" "}
                    <span>
                      ₦{currentModalContent.prepaid.amount.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium">
                    <span className="font-light">Tariff Code:</span>{" "}
                    <span>{currentModalContent.prepaid.tariffCode}</span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium">
                    <span className="font-light">Tariff Rate:</span>{" "}
                    <span>{currentModalContent.prepaid.tariffRate}</span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium">
                    <span className="font-light">Total Units Vended:</span>{" "}
                    <span>{currentModalContent.prepaid.totalUnitVended}</span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium flex items-center gap-1">
                    <span className="font-light">RRN:</span>{" "}
                    <span className="flex items-center gap-1">
                      {currentModalContent.rrn || "N/A"}
                      {currentModalContent.rrn && (
                        <CopyReference reference={currentModalContent.rrn} />
                      )}
                    </span>
                  </p>
                </div>
              ) : isPostpaid ? (
                <div className="space-y-3">
                  <h4 className="text-gray-700 text-xs font-medium mb-2">
                    Postpaid
                  </h4>
                  <p className="text-gray-700 text-xs font-medium">
                    <span className="font-light">Transaction Id:</span>{" "}
                    <span>
                      {currentModalContent.postpaid?.kadTransactionId}
                    </span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium">
                    <span className="font-light">Mode of Payment:</span>{" "}
                    <span>{currentModalContent.postpaid?.modeOfPayment}</span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium">
                    <span className="font-light">Amount:</span>{" "}
                    <span>
                      ₦
                      {currentModalContent.postpaid?.paymentChannelAmount.toLocaleString()}
                    </span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium">
                    <span className="font-light">Date:</span>{" "}
                    <span>
                      {moment(
                        currentModalContent.postpaid?.paymentChannelDate
                      ).format("h:mm A, MMM D")}
                    </span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium">
                    <span className="font-light">Receipt Number:</span>{" "}
                    <span>{currentModalContent.postpaid?.receiptNo}</span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium">
                    <span className="font-light">Telephone Number:</span>{" "}
                    <span>{currentModalContent.postpaid?.telephoneNumber}</span>
                  </p>
                  <p className="text-gray-700 text-xs font-medium flex items-center gap-1">
                    <span className="font-light">RRN:</span>{" "}
                    <span className="flex items-center gap-1">
                      {currentModalContent.rrn || "N/A"}
                      {currentModalContent.rrn && (
                        <CopyReference reference={currentModalContent.rrn} />
                      )}
                    </span>
                  </p>
                </div>
              ) : (
                <p className="text-gray-700 text-xs font-medium">
                  No transaction type information available.
                </p>
              )}
            </div>
          </div>

          {/* Additional Transaction Details */}
          <div className="mt-5 px-4">
            <h3 className="text-gray-700 text-sm font-semibold mb-2">
              Additional Details
            </h3>
            <div className="p-4 bg-gray-50 rounded-md border">
              <div className="space-y-3">
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Error:</span>{" "}
                  <span>{currentModalContent.error || "N/A"}</span>
                </p>
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Can Retry:</span>{" "}
                  <span>{currentModalContent.canRetry ? "Yes" : "No"}</span>
                </p>
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Can Refund:</span>{" "}
                  <span>{currentModalContent.canRefund ? "Yes" : "No"}</span>
                </p>
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Can Send Token:</span>{" "}
                  <span>{currentModalContent.canSendToken ? "Yes" : "No"}</span>
                </p>
                <p className="text-gray-700 text-xs font-medium">
                  <span className="font-light">Can Send Error:</span>{" "}
                  <span>{currentModalContent.canSendError ? "Yes" : "No"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="mt-5 px-4">
            <h3 className="text-gray-700 text-sm font-semibold mb-2">
              Transactions
            </h3>
            {currentModalContent.transactions &&
            currentModalContent.transactions.length > 0 ? (
              <div className="p-4 bg-gray-50 rounded-md border space-y-4">
                {currentModalContent.transactions.map((transaction, index) => (
                  <div key={index} className="space-y-3">
                    <p className="text-gray-700 text-xs font-medium">
                      <span className="font-light">Date:</span>{" "}
                      <span>
                        {moment(transaction.createdAt).format("h:mm A, MMM D")}
                      </span>
                    </p>
                    <p className="text-gray-700 text-xs font-medium flex items-center gap-1">
                      <span className="font-light">Reference Number:</span>{" "}
                      <span className="flex items-center gap-1">
                        <span>{transaction.referenceNumber}</span>
                        <CopyReference
                          reference={transaction.referenceNumber}
                        />
                      </span>
                    </p>
                    <p className="text-gray-700 text-xs font-medium">
                      <span className="font-light">Provider:</span>{" "}
                      <span>{transaction.provider}</span>
                    </p>
                    <p className="text-gray-700 text-xs font-medium">
                      <span className="font-light">Amount:</span>{" "}
                      <span>₦{transaction.amount?.toLocaleString()}</span>
                    </p>
                    <p className="text-gray-700 text-xs font-medium">
                      <span className="font-light">Fee:</span>{" "}
                      <span>₦{transaction.fee?.toLocaleString()}</span>
                    </p>
                    <p className="text-gray-700 text-xs font-medium">
                      <span className="font-light">Type:</span>{" "}
                      <span>{transaction.type?.label}</span>
                    </p>
                    <p className="text-gray-700 text-xs font-medium">
                      <span className="font-light">Status:</span>{" "}
                      <span>{transaction.status?.label}</span>
                    </p>
                    {index !== currentModalContent.transactions.length - 1 && (
                      <Dottedline />
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-700 text-xs font-medium">
                No transactions found.
              </p>
            )}
          </div>

          {/* Token Response */}
          {tokenResponse && (
            <div className="mt-5 px-4">
              <h3 className="text-gray-700 text-sm font-semibold mb-2">
                Token Response
              </h3>
              <div
                className={`p-4 rounded-md border ${
                  tokenResponse.isSuccess
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="space-y-2">
                  <p
                    className={`text-xs font-medium ${
                      tokenResponse.isSuccess
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {tokenResponse.isSuccess ? "✅ Success" : "❌ Error"}
                  </p>
                  <p className="text-xs text-gray-700">
                    {tokenResponse.message || "No message provided"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Retry Response */}
          {retryResponse && (
            <div className="mt-5 px-4">
              <h3 className="text-gray-700 text-sm font-semibold mb-2">
                Retry Response
              </h3>
              <div
                className={`p-4 rounded-md border ${
                  retryResponse.isSuccess
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                }`}
              >
                <div className="space-y-2">
                  <p
                    className={`text-xs font-medium ${
                      retryResponse.isSuccess
                        ? "text-green-700"
                        : "text-red-700"
                    }`}
                  >
                    {retryResponse.isSuccess ? "✅ Success" : "❌ Error"}
                  </p>
                  <p className="text-xs text-gray-700">
                    {retryResponse.message ||
                      retryResponse.data?.message ||
                      "No message provided"}
                  </p>

                  {/* Display the retry response details */}
                  {retryResponse.isSuccess && retryResponse.data && (
                    <div className="space-y-3 mt-3">
                      <p className="text-gray-700 text-xs font-medium flex items-center gap-1">
                        <span className="font-light">Meter Number:</span>{" "}
                        <span className="flex items-center gap-1">
                          {retryResponse.data.meterNumber}
                          <CopyReference
                            reference={retryResponse.data.meterNumber}
                          />
                        </span>
                      </p>
                      <p className="text-gray-700 text-xs font-medium flex items-center gap-1">
                        <span className="font-light">Token:</span>{" "}
                        <span className="flex items-center gap-1">
                          {retryResponse.data.token || "N/A"}
                          {retryResponse.data.token && (
                            <CopyReference
                              reference={retryResponse.data.token}
                            />
                          )}
                        </span>
                      </p>
                      <p className="text-gray-700 text-xs font-medium">
                        <span className="font-light">Total Units Vended:</span>{" "}
                        <span>{retryResponse.data.totalUnitVended}</span>
                      </p>
                      <p className="text-gray-700 text-xs font-medium">
                        <span className="font-light">Token Comment:</span>{" "}
                        <span>{retryResponse.data.tokenComment || "N/A"}</span>
                      </p>
                      <p className="text-gray-700 text-xs font-medium">
                        <span className="font-light">Amount:</span>{" "}
                        <span>
                          ₦
                          {parseFloat(
                            retryResponse.data.amount
                          ).toLocaleString()}
                        </span>
                      </p>
                      <p className="text-gray-700 text-xs font-medium">
                        <span className="font-light">Tariff Code:</span>{" "}
                        <span>{retryResponse.data.tariffCode || "N/A"}</span>
                      </p>
                      <p className="text-gray-700 text-xs font-medium">
                        <span className="font-light">Tariff Rate:</span>{" "}
                        <span>{retryResponse.data.tariffRate || "N/A"}</span>
                      </p>
                    </div>
                  )}

                  {/* Enhanced error display */}
                  {!retryResponse.isSuccess && retryResponse.data && (
                    <div className="mt-3">
                      {retryResponse.data.error && (
                        <p className="text-xs text-red-600">
                          {retryResponse.data.error}
                        </p>
                      )}
                      {retryResponse.data.errorMessage && (
                        <p className="text-xs text-red-600">
                          {retryResponse.data.errorMessage}
                        </p>
                      )}
                      {retryResponse.data.errors && (
                        <div className="space-y-2">
                          {Object.entries(retryResponse.data.errors).map(
                            ([key, value]) => (
                              <p key={key} className="text-xs text-red-600">
                                <span className="font-medium">{key}:</span>{" "}
                                {value}
                              </p>
                            )
                          )}
                        </div>
                      )}
                      {/* {!retryResponse.data.error &&
												!retryResponse.data.errorMessage &&
												!retryResponse.data.errors && (
													<pre className='text-xs bg-white p-2 rounded overflow-x-auto'>
														{JSON.stringify(retryResponse.data, null, 2)}
													</pre>
												)} */}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Status Actions */}
          <div className="my-10 px-4">
            {/* Retry Form */}
            {showRetryForm && (
              <form
                onSubmit={handleRetrySubmit}
                className="space-y-4 border p-4 rounded-md bg-white"
              >
                <div>
                  <label
                    className="block text-xs text-gray-700 mb-1"
                    htmlFor="retryReference"
                  >
                    Reference Number
                  </label>
                  <input
                    id="retryReference"
                    type="text"
                    value={retryReference}
                    onChange={(e) => setRetryReference(e.target.value)}
                    className="w-full border rounded px-2 py-2 text-xs"
                    placeholder="Enter reference number"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-sm text-xs w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowRetryForm(false);
                      setRetryReference("");
                      setRetryResponse(null);
                    }}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-sm text-xs w-full"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
            <h3 className="text-gray-700 pt-4 font-semibold mb-4">Actions</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4 text-xs">
                {currentModalContent.canRetry && (
                  <button
                    onClick={handleShowRetryForm}
                    className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full"
                  >
                    RETRY
                  </button>
                )}
                {currentModalContent.canRefund && (
                  <button
                    onClick={handleRefund}
                    className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full"
                  >
                    REFUND
                  </button>
                )}
                {currentModalContent.canSendToken && (
                  <button
                    onClick={handleSendToken}
                    className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full"
                    disabled={isSendingToken}
                  >
                    {isSendingToken ? "Sending..." : "SEND TOKEN"}
                  </button>
                )}
                {currentModalContent.canSendError && (
                  <button
                    onClick={handleSendError}
                    className="bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full"
                  >
                    SEND ERROR
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KadElectricModal;
