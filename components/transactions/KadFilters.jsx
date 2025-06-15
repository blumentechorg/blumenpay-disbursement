// KadFilters.jsx
"use client";
import React, { useState } from "react";

const KadFilters = ({ onFilterChange }) => {
	const [filters, setFilters] = useState({
		meterNumber: "",
		telephoneNumber: "",
		transactionRef: "",
		provider: "",
		status: "",
		startDate: "",
		endDate: "",
		type: "",
		business: "",
		canRetry: "",
		canRefund: "",
		canSendToken: "",
		withError: "",
		UnprocessedVendingRequests: "", // new boolean filter
	});

	// Options for dropdowns
	const statuses = ["Success", "Pending", "Failed"];
	const providers = ["Cash", "BankTransfer"];
	const types = ["KadElectric", "Payment"];

	const handleFilterChange = (field, value) => {
		const updated = { ...filters, [field]: value };
		setFilters(updated);
		onFilterChange(updated);
	};

	const clearAll = () => {
		const cleared = Object.fromEntries(
			Object.keys(filters).map((k) => [k, ""])
		);
		setFilters(cleared);
		onFilterChange(cleared);
	};

	return (
		<div className='p-6 rounded-lg max-w-md mx-auto text-sm'>
			<h2 className='font-semibold mb-4'>Filters</h2>

			{/* Meter Number */}
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Meter Number'
					value={filters.meterNumber}
					onChange={(e) => handleFilterChange("meterNumber", e.target.value)}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				/>
			</div>

			{/* Telephone Number */}
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Telephone Number'
					value={filters.telephoneNumber}
					onChange={(e) =>
						handleFilterChange("telephoneNumber", e.target.value)
					}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				/>
			</div>

			{/* Transaction Reference */}
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Transaction Ref'
					value={filters.transactionRef}
					onChange={(e) => handleFilterChange("transactionRef", e.target.value)}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				/>
			</div>

			{/* Provider
			<div className='mb-4'>
				<select
					value={filters.provider}
					onChange={(e) => handleFilterChange("provider", e.target.value)}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				>
					<option value=''>Payment Method</option>
					{providers.map((prov) => (
						<option key={prov} value={prov}>
							{prov}
						</option>
					))}
				</select>
			</div> */}

			{/* Status */}
			{/* <div className='mb-4'>
				<select
					value={filters.status}
					onChange={(e) => handleFilterChange("status", e.target.value)}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				>
					<option value=''>Status</option>
					{statuses.map((s) => (
						<option key={s} value={s}>
							{s}
						</option>
					))}
				</select>
			</div> */}

			{/* Date Range */}
			<div className='mb-4'>
				<label className='block text-xs font-semibold mb-1'>Start Date</label>
				<input
					type='date'
					value={filters.startDate}
					onChange={(e) => handleFilterChange("startDate", e.target.value)}
					className='w-[200px] h-[32px] border-gray-300 rounded-sm bg-[#DADDE1] text-xs p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-xs font-semibold mb-1'>End Date</label>
				<input
					type='date'
					value={filters.endDate}
					onChange={(e) => handleFilterChange("endDate", e.target.value)}
					className='w-[200px] h-[32px] border-gray-300 rounded-sm bg-[#DADDE1] text-xs p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				/>
			</div>

			{/* Type */}
			{/* <div className='mb-4'>
				<select
					value={filters.type}
					onChange={(e) => handleFilterChange("type", e.target.value)}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				>
					<option value=''>Type</option>
					{types.map((t) => (
						<option key={t} value={t}>
							{t}
						</option>
					))}
				</select>
			</div> */}

			{/* Business */}
			{/* <div className='mb-4'>
				<input
					type='text'
					placeholder='Business'
					value={filters.business}
					onChange={(e) => handleFilterChange("business", e.target.value)}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				/>
			</div> */}

			{/* With Error */}
			<div className='mb-4'>
				<select
					value={filters.withError}
					onChange={(e) => handleFilterChange("withError", e.target.value)}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				>
					<option value=''>With Error (All)</option>
					<option value='true'>True</option>
					<option value='false'>False</option>
				</select>
			</div>

			{/* Unprocessed Vending Requests */}
			<div className='mb-4'>
				<select
					value={filters.UnprocessedVendingRequests}
					onChange={(e) =>
						handleFilterChange("UnprocessedVendingRequests", e.target.value)
					}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				>
					<option value=''>Unprocessed Vending Requests</option>
					<option value='true'>True</option>
					<option value='false'>False</option>
				</select>
			</div>

			{/* Clear All */}
			<div className='mt-4'>
				<button
					onClick={clearAll}
					className='w-[200px] h-[32px] bg-blue-700 text-white text-xs rounded-sm p-1.5 hover:bg-blue-800 focus:outline-none'
				>
					Clear All
				</button>
			</div>
		</div>
	);
};

export default KadFilters;
