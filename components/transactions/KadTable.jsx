import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";
import FloatingSearchContainer from "./Tsearch";
import axiosInstance from "@/lib/axiosInstance";
import moment from "moment";
import KadElectricModal from "./KadElectricModal";

const KadTransactionTable = ({ filters }) => {
	const [modalContent, setModalContent] = useState(null);
	const [selectedRows, setSelectedRows] = useState({});
	const [data, setData] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	// Pagination states (1-indexed)
	const [pageNumber, setPageNumber] = useState(1);
	const [pageSize, setPageSize] = useState(50);
	const [totalCount, setTotalCount] = useState(0);
	const [totalPages, setTotalPages] = useState(0);

	// Reset to first page when filters change
	useEffect(() => {
		setPageNumber(1);
	}, [filters, searchQuery]);

	// Fetch data with debouncing
	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			setIsLoading(true);

			const queryParams = [];

			// Add all filter parameters
			Object.entries(filters).forEach(([key, value]) => {
				if (value !== "" && value !== undefined) {
					// Use meterNumber as the API parameter
					const apiParam = key === "meterNumber" ? "meterNumber" : key;
					queryParams.push(`${apiParam}=${encodeURIComponent(value)}`);
				}
			});

			// Add search query if exists
			if (searchQuery) {
				queryParams.push(`search=${encodeURIComponent(searchQuery)}`);
			}

			const query = `/KadElectric/Purchase?pageNumber=${pageNumber}&pageSize=${pageSize}${
				queryParams.length ? `&${queryParams.join("&")}` : ""
			}`;

			axiosInstance
				.get(query)
				.then((response) => {
					setData(response.data.data);
					setTotalCount(response.data.totalCount);
					setTotalPages(
						response.data.totalPages ||
							Math.ceil(response.data.totalCount / pageSize)
					);
				})
				.catch((error) => {
					console.error("Error fetching transactions:", error);
				})
				.finally(() => setIsLoading(false));
		}, 500);

		return () => clearTimeout(debounceTimer);
	}, [pageNumber, pageSize, filters, searchQuery]);

	const columns = useMemo(
		() => [
			{
				Header: "",
				accessor: "checkbox",
				Cell: ({ row }) => (
					<input
						type='checkbox'
						onClick={(e) => e.stopPropagation()}
						checked={selectedRows[row.original.id] || false}
						onChange={() =>
							setSelectedRows((prev) => ({
								...prev,
								[row.original.id]: !prev[row.original.id],
							}))
						}
					/>
				),
			},
			{
				Header: "Customer Name",
				accessor: "kadCustomer.customerName",
				Cell: ({ value }) => value || "N/A",
			},
			{
				Header: "Meter/Account No",
				accessor: (row) => {
					if (row.prepaidRequest) return row.prepaidRequest.meterNumber;
					else if (row.postpaidRequest)
						return row.postpaidRequest.customerAccountNo;
					return "N/A";
				},
				Cell: ({ value }) => value || "N/A",
			},
			{
				Header: "Payment Method",
				accessor: "paymentMethod.label",
				Cell: ({ value }) => value || "N/A",
			},
			{
				Header: "Amount",
				accessor: (row) => {
					if (row.prepaidRequest) return row.prepaidRequest.amount;
					else if (row.postpaidRequest)
						return row.postpaidRequest.paymentChannelAmount;
					return null;
				},
				Cell: ({ value }) => (value ? `₦${value.toLocaleString()}` : "N/A"),
			},
			{
				Header: "Purchase Type",
				accessor: (row) => {
					// Use the paymentType field directly from the API response
					if (row.paymentType) {
						return row.paymentType;
					}
					// Fallback to kadCustomer data if paymentType is not available
					if (row.kadCustomer) {
						return row.kadCustomer.isPPM ? "Prepaid" : "Postpaid";
					}
					return "N/A";
				},
				Cell: ({ value }) => value || "N/A",
			},
			{
				Header: "Payment Location",
				accessor: "prepaidRequest.locationOfPayment",
				Cell: ({ value }) => value || "N/A",
			},
			{
				Header: "Telephone No",
				accessor: (row) => {
					if (row.prepaidRequest) return row.prepaidRequest.telephoneNumber;
					else if (row.postpaidRequest)
						return row.postpaidRequest.telephoneNumber;
					return "N/A";
				},
				Cell: ({ value }) => value || "N/A",
			},
			{
				Header: "Status",
				accessor: "status",
				Cell: ({ value }) => {
					let icon;
					switch (value.label) {
						case "Success":
							icon = <FaCheckCircle className='text-green-500' size={14} />;
							break;
						case "Pending":
							icon = (
								<TbAlertCircleFilled className='text-yellow-600' size={14} />
							);
							break;
						case "Failed":
							icon = <TbAlertCircleFilled className='text-red-500' size={14} />;
							break;
						default:
							icon = null;
					}
					return (
						<div className='flex items-center space-x-2'>
							{icon}
							<span>{value.label}</span>
						</div>
					);
				},
			},
			{
				Header: "Created At",
				accessor: "createdAt",
				Cell: ({ value }) => {
					const now = moment();
					const createdAt = moment(value);
					const diffInMinutes = now.diff(createdAt, "minutes");
					const diffInHours = now.diff(createdAt, "hours");
					const diffInDays = now.diff(createdAt, "days");
					if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
					else if (diffInHours < 24) return `${diffInHours} hrs ago`;
					else if (diffInDays < 7) return `${diffInDays} days ago`;
					else return createdAt.format("YYYY-MM-DD");
				},
			},
			{
				Header: "Action",
				accessor: "action",
				Cell: ({ row }) => (
					<button
						onClick={() => setModalContent(row.original)}
						className='text-[#343A40] text-xs underline hover:text-blue-700'
					>
						View
					</button>
				),
			},
		],
		[selectedRows]
	);

	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		canPreviousPage,
		canNextPage,
		gotoPage,
		state: { pageIndex },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: pageNumber - 1, pageSize },
			manualPagination: true,
			pageCount: totalPages,
		},
		usePagination
	);

	const handlePageChange = (newPageNumber) => {
		if (newPageNumber < 1 || newPageNumber > totalPages) return;
		setPageNumber(newPageNumber);
		gotoPage(newPageNumber - 1);
	};

	const getPaginationItems = () => {
		if (totalPages <= 8) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const rightGroup = [totalPages - 2, totalPages - 1, totalPages];

		let leftGroup = [];
		if (pageNumber <= 5) {
			leftGroup = [1, 2, 3, 4, 5];
		} else if (pageNumber > totalPages - 7) {
			leftGroup = [];
			for (let i = totalPages - 7; i <= totalPages - 3; i++) {
				leftGroup.push(i);
			}
		} else {
			leftGroup = [];
			for (let i = pageNumber - 4; i <= pageNumber; i++) {
				leftGroup.push(i);
			}
		}

		if (leftGroup[leftGroup.length - 1] + 1 === rightGroup[0]) {
			return [...leftGroup, ...rightGroup];
		} else {
			return [...leftGroup, "ellipsis", ...rightGroup];
		}
	};

	const paginationItems = getPaginationItems();

	return (
		<div className='w-full max-w-[95vw] sm:max-w-[600px] md:max-w-[790px] lg:max-w-full'>
			<div className='space-y-5'>
				<div>
					<FloatingSearchContainer
						onSelectAll={(isSelected) => {
							const newSelections = {};
							data.forEach((row) => (newSelections[row.id] = isSelected));
							setSelectedRows(newSelections);
						}}
						onSearchChange={setSearchQuery}
					/>
				</div>
				<div className='bg-white rounded-lg shadow-md p-4 overflow-x-auto cursor-pointer'>
					<table
						{...getTableProps()}
						className='min-w-full text-xs border-collapse border border-gray-300 rounded-lg table-auto'
					>
						<thead className='bg-gray-100 text-gray-700 font-semibold'>
							{headerGroups.map((headerGroup) => {
								const { key, ...rest } = headerGroup.getHeaderGroupProps();
								return (
									<tr key={key} {...rest} className='table-row'>
										{headerGroup.headers.map((column) => {
											const { key: columnKey, ...columnRest } =
												column.getHeaderProps();
											return (
												<th
													key={columnKey}
													{...columnRest}
													className={`border border-gray-300 px-4 py-2 text-left ${
														column.className || ""
													}`}
												>
													{column.render("Header")}
												</th>
											);
										})}
									</tr>
								);
							})}
						</thead>
						<tbody {...getTableBodyProps()}>
							{isLoading
								? Array.from({ length: 5 }).map((_, index) => (
										<tr key={index} className='animate-pulse'>
											{headerGroups[0].headers.map((_, colIndex) => (
												<td
													key={colIndex}
													className='border border-gray-300 px-4 py-2'
												>
													<div className='h-4 bg-gray-300 rounded'></div>
												</td>
											))}
										</tr>
								  ))
								: page.map((row) => {
										prepareRow(row);
										const { key, ...rowProps } = row.getRowProps();
										return (
											<tr
												key={key}
												{...rowProps}
												className='hover:bg-gray-50 hover:font-semibold table-row'
											>
												{row.cells.map((cell) => {
													const { key: cellKey, ...cellProps } =
														cell.getCellProps();
													return (
														<td
															key={cellKey}
															{...cellProps}
															className={`border border-gray-300 px-4 py-2 table-cell ${
																cell.column.className || ""
															}`}
															data-label={cell.column.Header}
														>
															{cell.render("Cell")}
														</td>
													);
												})}
											</tr>
										);
								  })}
						</tbody>
					</table>
					<div className='flex flex-col sm:flex-row justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300 space-y-2 sm:space-y-0'>
						<div className='flex items-center space-x-2'>
							<span className='text-gray-700'>Rows per page:</span>
							<select
								value={pageSize}
								onChange={(e) => {
									setPageSize(Number(e.target.value));
									setPageNumber(1);
									gotoPage(0);
								}}
								className='px-1 py-1 border rounded-md bg-white text-gray-700'
							>
								{[4, 8, 10, 20, 50].map((size) => (
									<option key={size} value={size}>
										{size}
									</option>
								))}
							</select>
						</div>
						<div className='flex items-center space-x-2'>
							<button
								onClick={() => handlePageChange(pageNumber - 1)}
								disabled={!canPreviousPage || pageNumber <= 1}
								className={`px-1 py-1 border rounded-md ${
									!canPreviousPage || pageNumber <= 1
										? "bg-gray-200 text-gray-400 cursor-not-allowed"
										: "bg-black text-white hover:bg-gray-100"
								}`}
							>
								<IoMdArrowDropleft size={15} />
							</button>
							{paginationItems.map((item, index) =>
								item === "ellipsis" ? (
									<span key={index} className='px-2 py-1'>
										...
									</span>
								) : (
									<button
										key={index}
										onClick={() => handlePageChange(item)}
										className={`px-2 py-1 border rounded-md ${
											pageNumber === item
												? "bg-black text-white"
												: "bg-white text-gray-700 hover:bg-gray-100"
										}`}
									>
										{item}
									</button>
								)
							)}
							<button
								onClick={() => handlePageChange(pageNumber + 1)}
								disabled={!canNextPage || pageNumber >= totalPages}
								className={`px-1 py-1 border rounded-md ${
									!canNextPage || pageNumber >= totalPages
										? "bg-gray-200 text-gray-400 cursor-not-allowed"
										: "bg-black text-white hover:bg-gray-100"
								}`}
							>
								<IoMdArrowDropright size={15} />
							</button>
						</div>
						<div className='text-gray-600'>
							Showing {(pageNumber - 1) * pageSize + 1}-
							{Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
						</div>
					</div>
				</div>
				<KadElectricModal
					modalContent={modalContent}
					onClose={() => setModalContent(null)}
				/>
			</div>
		</div>
	);
};

export default KadTransactionTable;
