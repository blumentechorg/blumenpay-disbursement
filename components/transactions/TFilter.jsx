"use client";

import React, { useState } from "react";

const FilterComponent = ({ onFilterChange }) => {
	const [filters, setFilters] = useState({
		referenceNumber: "",
		provider: "",
		status: "",
		startDate: "",
		endDate: "",
		type: "",
		business: "", // Business filter field
	});

	// Options for dropdowns
	const statuses = ["Success", "Pending", "Failed"];
	const providers = ["card", "Paystack"];
	const types = ["KadElectric", "Payment"];

	// Handle change in filters
	const handleFilterChange = (field, value) => {
		const updatedFilters = { ...filters, [field]: value };
		setFilters(updatedFilters);
		onFilterChange(updatedFilters); // Pass updated filters to parent
	};

	// Clear all filters
	const clearAllFilters = () => {
		const clearedFilters = {
			referenceNumber: "",
			provider: "",
			status: "",
			startDate: "",
			endDate: "",
			type: "",
			business: "",
		};
		setFilters(clearedFilters);
		onFilterChange(clearedFilters);
	};

	return (
		<div className='p-6 rounded-lg max-w-md mx-auto text-sm'>
			<h2 className='font-semibold mb-4'>Filter</h2>

			{/* Reference Number */}
			<div className='mb-4'>
				<input
					type='text'
					placeholder='Reference Number'
					value={filters.referenceNumber}
					onChange={(e) =>
						handleFilterChange("referenceNumber", e.target.value)
					}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				/>
			</div>

			{/* Provider */}
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
			</div>

			{/* Status */}
			<div className='mb-4'>
				<select
					value={filters.status}
					onChange={(e) => handleFilterChange("status", e.target.value)}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				>
					<option value=''>Status</option>
					{statuses.map((status) => (
						<option key={status} value={status}>
							{status}
						</option>
					))}
				</select>
			</div>

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

			{/* Business as Dropdown */}
			<div className='mb-4'>
				<select
					value={filters.business}
					onChange={(e) => handleFilterChange("business", e.target.value)}
					className='w-[200px] h-[32px] border-gray-300 bg-[#DADDE1] text-xs rounded-sm p-1.5 focus:outline-none focus:ring-1 focus:ring-gray-500'
				>
					<option value=''>Select Business</option>
					<option value='AMD'>AMD</option>
					<option value='AmaltechStore'>AmaltechStore</option>
					<option value='Gro Solar'>Gro Solar</option>
					<option value='KadElectric'>Kaduna Electric</option>
				</select>
			</div>

			{/* Clear All */}
			<div className='mt-4'>
				<button
					onClick={clearAllFilters}
					className='w-[200px] h-[32px] bg-blue-700 text-white text-xs rounded-sm p-1.5 hover:bg-blue-800 focus:outline-none'
				>
					Clear All
				</button>
			</div>
		</div>
	);
};

export default FilterComponent;
