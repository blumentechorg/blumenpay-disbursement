import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import kaduna from "@/public/images/kaduna.png";
import Dottedline from "@/public/icons/dottedline";
import { FaCircleCheck } from "react-icons/fa6";
import moment from "moment";
import axiosInstance from "@/lib/axiosInstance";

const KadElectricModal = ({ modalContent, onClose }) => {
	const [appDetails, setAppDetails] = useState(null);
	const [isSendingToken, setIsSendingToken] = useState(false); // Loading state for Send Token

	// Fetch app details when modalContent.appId changes
	useEffect(() => {
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
	}, [modalContent?.appId]);

	if (!modalContent) return null;

	const handleBackdropClick = (e) => {
		if (e.target === e.currentTarget) {
			onClose();
		}
	};

	// Format transaction date
	const transactionDate = modalContent.createdAt || modalContent.date;
	const formattedDate = moment(transactionDate).format("h:mm A, MMM D");

	const statusLabel = modalContent.status?.label || "";

	// Render status icon
	const renderStatusIcon = () => {
		switch (statusLabel) {
			case "Success":
				return <FaCircleCheck className='text-green-500' size={32} />;
			case "Pending":
				return <TbAlertCircleFilled className='text-yellow-600' size={32} />;
			case "Failed":
				return <TbAlertCircleFilled className='text-red-500' size={32} />;
			default:
				return null;
		}
	};

	// Determine if the transaction is prepaid or postpaid
	const isPrepaid = !!modalContent.prepaid;
	const isPostpaid = !!modalContent.postpaid;

	// Handle Send Token action
	const handleSendToken = async () => {
		if (!modalContent.prepaid?.kadTransactionId) {
			console.error("kadTransactionId is missing in the payload");
			return;
		}

		setIsSendingToken(true); // Start loading

		try {
			const response = await axiosInstance.get(
				`https://blumenpay-1.onrender.com/KadElectric/Sms/Token/${modalContent.prepaid.kadTransactionId}`
			);

			if (response.data.isSuccess) {
				console.log("Token sent successfully:", response.data);
				alert("Token sent successfully!");
			} else {
				console.error("Failed to send token:", response.data.message);
				alert("Failed to send token. Please try again.");
			}
		} catch (error) {
			console.error("Error sending token:", error);
			alert("An error occurred while sending the token.");
		} finally {
			setIsSendingToken(false); // Stop loading
		}
	};

	// New stub functions for actions – update these with your own API logic
	const handleRetry = async () => {
		try {
			// Example API call – update endpoint and payload as needed
			const response = await axiosInstance.post(`/KadElectric/Retry`, {
				id: modalContent.id,
			});
			if (response.data.isSuccess) {
				alert("Retry successful");
			} else {
				alert("Retry failed: " + response.data.message);
			}
		} catch (error) {
			console.error("Error during retry:", error);
			alert("Error during retry");
		}
	};

	const handleRefund = async () => {
		try {
			// Example API call – update endpoint and payload as needed
			const response = await axiosInstance.post(`/KadElectric/Refund`, {
				id: modalContent.id,
			});
			if (response.data.isSuccess) {
				alert("Refund successful");
			} else {
				alert("Refund failed: " + response.data.message);
			}
		} catch (error) {
			console.error("Error processing refund:", error);
			alert("Error during refund");
		}
	};

	const handleSendError = async () => {
		try {
			// Example API call – update endpoint and payload as needed
			const response = await axiosInstance.post(`/KadElectric/SendError`, {
				id: modalContent.id,
			});
			if (response.data.isSuccess) {
				alert("Error message sent successfully");
			} else {
				alert("Failed to send error message: " + response.data.message);
			}
		} catch (error) {
			console.error("Error sending error message:", error);
			alert("Error during sending error message");
		}
	};

	return (
		<div
			className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'
			onClick={handleBackdropClick}
		>
			<div
				className='fixed inset-0 bg-gray-800 bg-opacity-50 z-50 text-sm flex items-center justify-end'
				onClick={handleBackdropClick}
			>
				<div
					className='bg-gray-100 w-1/3 h-full shadow-lg relative overflow-y-auto'
					onClick={(e) => e.stopPropagation()}
				>
					{/* Header */}
					<div className='flex items-center justify-between bg-white p-4'>
						<Image
							src={kaduna}
							alt='Kaduna Electric Logo'
							width={80}
							height={80}
						/>
						<button
							onClick={onClose}
							className='text-gray-600 hover:text-gray-800'
						>
							<FaTimes size={20} />
						</button>
					</div>

					{/* Transaction Details */}
					<div className='mt-5 px-4'>
						<h3 className='text-gray-700 text-sm font-semibold mb-2'>
							Transaction Details
						</h3>
						<div className='p-4 bg-gray-50 rounded-md border'>
							<div className='flex items-center mb-3'>{renderStatusIcon()}</div>
							<div className='space-y-3'>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Date:</span>{" "}
									<span className='uppercase'>{formattedDate}</span>
								</p>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Customer Name:</span>{" "}
									<span className='uppercase'>
										{modalContent.kadCustomer?.customerName || "N/A"}
									</span>
								</p>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Service Provider:</span>{" "}
									<span className='uppercase'>
										{modalContent.provider || "Kaduna Electric"}
									</span>
								</p>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Amount:</span>{" "}
									<span className='uppercase'>
										{modalContent.amount?.toLocaleString() || "N/A"}
									</span>
								</p>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Payment Method:</span>{" "}
									<span className='uppercase'>
										{modalContent.paymentMethod?.label || "N/A"}
									</span>
								</p>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Status:</span>{" "}
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
					<div className='mt-5 px-4'>
						<h3 className='text-gray-700 text-sm font-semibold mb-2'>
							Business Details
						</h3>
						<div className='p-4 bg-gray-50 rounded-md border'>
							<div className='space-y-3'>
								<div className='text-gray-700 flex gap-1 items-center text-xs font-medium'>
									<span className='font-light'>Business Name:</span>{" "}
									<span className='uppercase flex gap-1'>
										<img
											src={modalContent.app?.logo}
											alt={modalContent.app?.logo}
											className='w-10'
										/>
										{modalContent.app?.name || "Kaduna Electric"}
									</span>
								</div>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Description:</span>{" "}
									<span className='uppercase'>
										{modalContent.app?.description || "N/A"}
									</span>
								</p>
							</div>
						</div>
					</div>

					{/* Transaction Type Details Card */}
					<div className='mt-5 px-4'>
						<h3 className='text-gray-700 text-sm font-semibold mb-2'>
							Transaction Type Details
						</h3>
						<div className='p-4 bg-gray-50 rounded-md border'>
							{isPrepaid ? (
								<div className='space-y-3'>
									<h4 className='text-gray-700 text-xs font-medium mb-2'>
										Prepaid
									</h4>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Meter Number:</span>{" "}
										<span>{modalContent.prepaid.meterNumber}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Token:</span>{" "}
										<span>{modalContent.prepaid.token || "N/A"}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Amount:</span>{" "}
										<span>₦{modalContent.prepaid.amount.toLocaleString()}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Tariff Code:</span>{" "}
										<span>{modalContent.prepaid.tariffCode}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Tariff Rate:</span>{" "}
										<span>{modalContent.prepaid.tariffRate}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Total Units Vended:</span>{" "}
										<span>{modalContent.prepaid.totalUnitVended}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>RRN:</span>{" "}
										<span>{modalContent.rrn || "N/A"}</span>
									</p>
								</div>
							) : isPostpaid ? (
								<div className='space-y-3'>
									<h4 className='text-gray-700 text-xs font-medium mb-2'>
										Postpaid
									</h4>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Transaction Id:</span>{" "}
										<span>{modalContent.postpaid?.kadTransactionId}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Mode of Payment:</span>{" "}
										<span>{modalContent.postpaid?.modeOfPayment}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Amount:</span>{" "}
										<span>
											₦
											{modalContent.postpaid?.paymentChannelAmount.toLocaleString()}
										</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Date:</span>{" "}
										<span>
											{moment(modalContent.postpaid?.paymentChannelDate).format(
												"h:mm A, MMM D"
											)}
										</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Receipt Number:</span>{" "}
										<span>{modalContent.postpaid?.receiptNo}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Telephone Number:</span>{" "}
										<span>{modalContent.postpaid?.telephoneNumber}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>RRN:</span>{" "}
										<span>{modalContent.rrn || "N/A"}</span>
									</p>
								</div>
							) : (
								<p className='text-gray-700 text-xs font-medium'>
									No transaction type information available.
								</p>
							)}
						</div>
					</div>

					{/* Additional Transaction Details */}
					<div className='mt-5 px-4'>
						<h3 className='text-gray-700 text-sm font-semibold mb-2'>
							Additional Details
						</h3>
						<div className='p-4 bg-gray-50 rounded-md border'>
							<div className='space-y-3'>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Error:</span>{" "}
									<span>{modalContent.error || "N/A"}</span>
								</p>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Can Retry:</span>{" "}
									<span>{modalContent.canRetry ? "Yes" : "No"}</span>
								</p>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Can Refund:</span>{" "}
									<span>{modalContent.canRefund ? "Yes" : "No"}</span>
								</p>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Can Send Token:</span>{" "}
									<span>{modalContent.canSendToken ? "Yes" : "No"}</span>
								</p>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Can Send Error:</span>{" "}
									<span>{modalContent.canSendError ? "Yes" : "No"}</span>
								</p>
							</div>
						</div>
					</div>

					{/* Transactions Table */}
					<div className='mt-5 px-4'>
						<h3 className='text-gray-700 text-sm font-semibold mb-2'>
							Transactions
						</h3>
						{modalContent.transactions &&
						modalContent.transactions.length > 0 ? (
							<div className='p-4 bg-gray-50 rounded-md border'>
								{modalContent.transactions.map((transaction, index) => (
									<div key={index} className='space-y-3'>
										<p className='text-gray-700 text-xs font-medium'>
											<span className='font-light'>Date:</span>{" "}
											<span>
												{moment(transaction.createdAt).format("h:mm A, MMM D")}
											</span>
										</p>
										<p className='text-gray-700 text-xs font-medium'>
											<span className='font-light'>Reference Number:</span>{" "}
											<span>{transaction.referenceNumber}</span>
										</p>
										<p className='text-gray-700 text-xs font-medium'>
											<span className='font-light'>Provider:</span>{" "}
											<span>{transaction.provider}</span>
										</p>
										<p className='text-gray-700 text-xs font-medium'>
											<span className='font-light'>Amount:</span>{" "}
											<span>₦{transaction.amount?.toLocaleString()}</span>
										</p>
										<p className='text-gray-700 text-xs font-medium'>
											<span className='font-light'>Fee:</span>{" "}
											<span>₦{transaction.fee?.toLocaleString()}</span>
										</p>
										<p className='text-gray-700 text-xs font-medium'>
											<span className='font-light'>Type:</span>{" "}
											<span>{transaction.type?.label}</span>
										</p>
										<p className='text-gray-700 text-xs font-medium'>
											<span className='font-light'>Status:</span>{" "}
											<span>{transaction.status?.label}</span>
										</p>
										{index !== modalContent.transactions.length - 1 && (
											<Dottedline />
										)}
									</div>
								))}
							</div>
						) : (
							<p className='text-gray-700 text-xs font-medium'>
								No transactions found.
							</p>
						)}
					</div>

					{/* Status Actions */}
					<div className='my-10 px-4'>
						<h3 className='text-gray-700 font-semibold mb-4'>Actions</h3>
						<div className='flex space-x-4 text-xs'>
							{modalContent.canRetry && (
								<button
									onClick={handleRetry}
									className='bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full'
								>
									RETRY
								</button>
							)}
							{modalContent.canRefund && (
								<button
									onClick={handleRefund}
									className='bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full'
								>
									REFUND
								</button>
							)}
							{modalContent.canSendToken && (
								<button
									onClick={handleSendToken}
									className='bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full'
									disabled={isSendingToken}
								>
									{isSendingToken ? "Sending..." : "SEND TOKEN"}
								</button>
							)}
							{modalContent.canSendError && (
								<button
									onClick={handleSendError}
									className='bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full'
								>
									SEND ERROR
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default KadElectricModal;
