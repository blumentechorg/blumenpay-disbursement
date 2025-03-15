import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import kaduna from "@/public/images/kaduna.png";
import Dottedline from "@/public/icons/dottedline";
import { FaCircleCheck } from "react-icons/fa6";
import moment from "moment";
import axiosInstance from "@/lib/axiosInstance";

const TransactionModal = ({ modalContent, onClose }) => {
	const [appDetails, setAppDetails] = useState(null);

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
									<span className='font-light'>Service Provider:</span>{" "}
									<span className='uppercase'>
										{modalContent.provider || "Kaduna Electric"}
									</span>
								</p>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Amount:</span>{" "}
									<span className='uppercase'>
										{modalContent.amount.toLocaleString()}
									</span>
								</p>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Payment Method:</span>{" "}
									<span className='uppercase'>
										{modalContent.paymentMethod || "Bank Transfer"}
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
											className=' w-10'
										/>
										{modalContent.app?.name || "Kaduna Electric"}
									</span>
								</div>
								<p className='text-gray-700 text-xs font-medium'>
									<span className='font-light'>Description:</span>{" "}
									<span className='uppercase'>
										{modalContent.app?.description}
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
							{modalContent.postpaid ? (
								<div>
									<h4 className='text-gray-700 text-xs font-medium mb-2'>
										Postpaid
									</h4>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Bank Receipt No:</span>{" "}
										<span>{modalContent.postpaid.bankReceiptNo}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Mode of Payment:</span>{" "}
										<span>{modalContent.postpaid.modeOfPayment}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Types of Payment:</span>{" "}
										<span>{modalContent.postpaid.typesOfPayment}</span>
									</p>
									{/* You can add more postpaid fields here */}
								</div>
							) : modalContent.prepaid ? (
								<div>
									<h4 className='text-gray-700 text-xs font-medium mb-2'>
										Prepaid
									</h4>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Token:</span>{" "}
										<span>{modalContent.prepaid.token}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Result Description:</span>{" "}
										<span>{modalContent.prepaid.resultDescription}</span>
									</p>
									<p className='text-gray-700 text-xs font-medium'>
										<span className='font-light'>Amount:</span>{" "}
										<span>{modalContent.prepaid.amount}</span>
									</p>
									{/* You can add more prepaid fields here */}
								</div>
							) : (
								<p className='text-gray-700 text-xs font-medium'>
									No transaction type information available.
								</p>
							)}
						</div>
					</div>

					{/* Status Actions */}
					<div className='mt-10 px-4'>
						<h3 className='text-gray-700 font-semibold mb-4'>Status</h3>
						<div className='flex space-x-4 text-xs'>
							{statusLabel === "Failed" ? (
								<>
									<button className='bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full'>
										RETRY
									</button>
									<button className='bg-gray-300 text-gray-700 px-4 py-2 rounded-sm w-full'>
										REFUND
									</button>
								</>
							) : (
								<>
									<button className='bg-[#0052CC] text-white px-4 py-2 rounded-sm w-full'>
										CLOSE
									</button>
									<button className='bg-gray-300 text-gray-700 px-4 py-2 rounded-sm w-full'>
										PRINT
									</button>
								</>
							)}
						</div>
					</div>

					{/* Activity Log */}
					<div className='my-10 px-4'>
						<h3 className='text-gray-700 font-semibold mb-2'>Callback Log</h3>
						<div className='p-4 bg-gray-50 rounded-md border'>
							{modalContent.callbacks && modalContent.callbacks.length > 0 ? (
								modalContent.callbacks.map((callback, index) => {
									const statusText =
										typeof callback.status === "object"
											? callback.status.label
											: callback.status;
									const iconColor =
										statusText === "Success"
											? "text-green-600"
											: statusText === "Failed"
											? "text-red-500"
											: "text-yellow-600";

									return (
										<div key={index} className='mb-2'>
											<p className='text-gray-700 text-sm flex space-x-1'>
												<TbAlertCircleFilled className={iconColor} size={20} />
												<span className='text-medium'>{statusText}</span>
												<span className='pt-1'>
													<TbAlertCircleFilled
														className='text-gray-900'
														size={12}
													/>
												</span>
												<span>
													{moment(callback.createdAt).format(
														"D MMM, YYYY h:mm A"
													)}
												</span>
											</p>
											{callback.event && callback.event.message && (
												<p className='text-gray-600 text-xs pl-8'>
													{callback.event.message}
												</p>
											)}
											{index !== modalContent.callbacks.length - 1 && (
												<Dottedline />
											)}
										</div>
									);
								})
							) : (
								<p className='text-gray-700 text-sm'>
									No callback events found.
								</p>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TransactionModal;
