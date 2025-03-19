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

	// Reset page when specific filters change
	useEffect(() => {
		setPageNumber(1);
	}, [filters.referenceNumber]);

	// Only include boolean filters when defined and non-empty
	const shouldFetchAllPages =
		filters.business ||
		filters.startDate ||
		filters.endDate ||
		filters.referenceNumber ||
		(typeof filters.canRetry !== "undefined" && filters.canRetry !== "") ||
		(typeof filters.canRefund !== "undefined" && filters.canRefund !== "") ||
		(typeof filters.canSendToken !== "undefined" &&
			filters.canSendToken !== "") ||
		(typeof filters.canSendError !== "undefined" &&
			filters.canSendError !== "");

	// Fetch all pages in parallel when needed
	const fetchAllPages = useCallback(async () => {
		setIsLoading(true);
		try {
			const queryParams = [];
			if (filters.referenceNumber)
				queryParams.push(
					`referenceNumber=${encodeURIComponent(filters.referenceNumber)}`
				);
			if (filters.provider)
				queryParams.push(`provider=${encodeURIComponent(filters.provider)}`);
			if (filters.status)
				queryParams.push(`status=${encodeURIComponent(filters.status)}`);
			if (filters.type)
				queryParams.push(`type=${encodeURIComponent(filters.type)}`);
			if (typeof filters.canRetry !== "undefined" && filters.canRetry !== "")
				queryParams.push(`canRetry=${encodeURIComponent(filters.canRetry)}`);
			if (typeof filters.canRefund !== "undefined" && filters.canRefund !== "")
				queryParams.push(`canRefund=${encodeURIComponent(filters.canRefund)}`);
			if (
				typeof filters.canSendToken !== "undefined" &&
				filters.canSendToken !== ""
			)
				queryParams.push(
					`canSendToken=${encodeURIComponent(filters.canSendToken)}`
				);
			if (
				typeof filters.canSendError !== "undefined" &&
				filters.canSendError !== ""
			)
				queryParams.push(
					`canSendError=${encodeURIComponent(filters.canSendError)}`
				);

			const baseQuery = `/KadElectric/Purchase?pageSize=${pageSize}${
				queryParams.length ? `&${queryParams.join("&")}` : ""
			}`;

			const firstResponse = await axiosInstance.get(
				`${baseQuery}&pageNumber=1`
			);
			const totalPagesAll =
				firstResponse.data.totalPages ||
				Math.ceil(firstResponse.data.totalCount / pageSize);

			// Fetch remaining pages in parallel
			const pagePromises = [];
			for (let i = 2; i <= totalPagesAll; i++) {
				pagePromises.push(axiosInstance.get(`${baseQuery}&pageNumber=${i}`));
			}
			const responses = await Promise.all(pagePromises);
			const combinedData = firstResponse.data.data.concat(
				responses.flatMap((res) => res.data.data)
			);

			// Client‑side filtering
			const clientFiltered = combinedData.filter((row) => {
				let matchesBusiness = true;
				if (filters.business) {
					matchesBusiness = row.app?.name
						?.toLowerCase()
						.includes(filters.business.toLowerCase());
				}
				let matchesDate = true;
				if (filters.startDate) {
					matchesDate =
						matchesDate &&
						new Date(row.createdAt) >= new Date(filters.startDate);
				}
				if (filters.endDate) {
					matchesDate =
						matchesDate && new Date(row.createdAt) <= new Date(filters.endDate);
				}
				let matchesReferenceNumber = true;
				if (filters.referenceNumber) {
					matchesReferenceNumber =
						row.prepaidRequest?.meterNumber
							?.toLowerCase()
							.includes(filters.referenceNumber.toLowerCase()) ||
						row.postpaidRequest?.customerAccountNo
							?.toLowerCase()
							.includes(filters.referenceNumber.toLowerCase());
				}
				return matchesBusiness && matchesDate && matchesReferenceNumber;
			});

			setData(clientFiltered);
			setTotalCount(clientFiltered.length);
			setTotalPages(Math.ceil(clientFiltered.length / pageSize));
			setPageNumber(1);
		} catch (error) {
			console.error("Error fetching all pages for filters:", error);
		} finally {
			setIsLoading(false);
		}
	}, [filters, pageSize]);

	// Fetch data with debouncing when not fetching all pages
	useEffect(() => {
		const debounceTimer = setTimeout(() => {
			if (shouldFetchAllPages) {
				fetchAllPages();
			} else {
				let query = `/KadElectric/Purchase?pageNumber=${pageNumber}&pageSize=${pageSize}`;
				if (filters.referenceNumber)
					query += `&referenceNumber=${encodeURIComponent(
						filters.referenceNumber
					)}`;
				if (filters.provider)
					query += `&provider=${encodeURIComponent(filters.provider)}`;
				if (filters.status)
					query += `&status=${encodeURIComponent(filters.status)}`;
				if (filters.startDate)
					query += `&startDate=${encodeURIComponent(filters.startDate)}`;
				if (filters.endDate)
					query += `&endDate=${encodeURIComponent(filters.endDate)}`;
				if (filters.type) query += `&type=${encodeURIComponent(filters.type)}`;
				if (filters.business)
					query += `&business=${encodeURIComponent(filters.business)}`;
				if (typeof filters.canRetry !== "undefined" && filters.canRetry !== "")
					query += `&canRetry=${encodeURIComponent(filters.canRetry)}`;
				if (
					typeof filters.canRefund !== "undefined" &&
					filters.canRefund !== ""
				)
					query += `&canRefund=${encodeURIComponent(filters.canRefund)}`;
				if (
					typeof filters.canSendToken !== "undefined" &&
					filters.canSendToken !== ""
				)
					query += `&canSendToken=${encodeURIComponent(filters.canSendToken)}`;
				if (
					typeof filters.canSendError !== "undefined" &&
					filters.canSendError !== ""
				)
					query += `&canSendError=${encodeURIComponent(filters.canSendError)}`;

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
			}
		}, 500);

		return () => clearTimeout(debounceTimer);
	}, [pageNumber, pageSize, filters, shouldFetchAllPages, fetchAllPages]);

	// Additional client‑side filtering
	const filteredData = useMemo(() => {
		return data.filter((row) => {
			const matchesReferenceNumber = filters.referenceNumber
				? row.prepaidRequest?.meterNumber
						?.toLowerCase()
						.includes(filters.referenceNumber.toLowerCase()) ||
				  row.postpaidRequest?.customerAccountNo
						?.toLowerCase()
						.includes(filters.referenceNumber.toLowerCase())
				: true;
			const matchesProvider = filters.provider
				? row.paymentMethod.label === filters.provider
				: true;
			const matchesType = filters.type ? row.type === filters.type : true;
			const matchesStatus = filters.status
				? row.status.label === filters.status
				: true;
			const matchesSearch = searchQuery
				? row.prepaidRequest?.meterNumber
						?.toLowerCase()
						.includes(searchQuery.toLowerCase())
				: true;

			// Boolean filter checks
			const matchesCanRetry =
				typeof filters.canRetry !== "undefined" && filters.canRetry !== ""
					? row.canRetry === (filters.canRetry === "true")
					: true;
			const matchesCanRefund =
				typeof filters.canRefund !== "undefined" && filters.canRefund !== ""
					? row.canRefund === (filters.canRefund === "true")
					: true;
			const matchesCanSendToken =
				typeof filters.canSendToken !== "undefined" &&
				filters.canSendToken !== ""
					? row.canSendToken === (filters.canSendToken === "true")
					: true;
			const matchesCanSendError =
				typeof filters.canSendError !== "undefined" &&
				filters.canSendError !== ""
					? row.canSendError === (filters.canSendError === "true")
					: true;

			return (
				matchesReferenceNumber &&
				matchesProvider &&
				matchesType &&
				matchesStatus &&
				matchesSearch &&
				matchesCanRetry &&
				matchesCanRefund &&
				matchesCanSendToken &&
				matchesCanSendError
			);
		});
	}, [data, filters, searchQuery]);

	const finalData = filteredData;
	const dynamicTotalCount = shouldFetchAllPages ? finalData.length : totalCount;
	const dynamicTotalPages = shouldFetchAllPages
		? Math.ceil(finalData.length / pageSize)
		: totalPages;

	// Build react‑table instance using usePagination
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page, // current page rows
		prepareRow,
		canPreviousPage,
		canNextPage,
		gotoPage,
		state: { pageIndex },
	} = useTable(
		{
			columns: useMemo(
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
										<TbAlertCircleFilled
											className='text-yellow-600'
											size={14}
										/>
									);
									break;
								case "Failed":
									icon = (
										<TbAlertCircleFilled className='text-red-500' size={14} />
									);
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
			),
			data: finalData,
			initialState: { pageIndex: pageNumber - 1, pageSize },
			manualPagination: true,
			pageCount: dynamicTotalPages,
		},
		usePagination
	);

	// When filters change, reset pagination
	useEffect(() => {
		gotoPage(0);
	}, [filters, gotoPage]);

	const handlePageChange = (newPageNumber) => {
		if (newPageNumber < 1 || newPageNumber > dynamicTotalPages) return;
		setPageNumber(newPageNumber);
		gotoPage(newPageNumber - 1);
	};

	// Build pagination items with ellipsis as needed
	const getPaginationItems = () => {
		if (dynamicTotalPages <= 8) {
			return Array.from({ length: dynamicTotalPages }, (_, i) => i + 1);
		}
		const rightGroup = [
			dynamicTotalPages - 2,
			dynamicTotalPages - 1,
			dynamicTotalPages,
		];
		let leftGroup = [];
		if (pageNumber <= 5) {
			leftGroup = [1, 2, 3, 4, 5];
		} else if (pageNumber > dynamicTotalPages - 7) {
			leftGroup = [];
			for (let i = dynamicTotalPages - 7; i <= dynamicTotalPages - 3; i++) {
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
								<tr key={key} {...rest} className='block sm:table-row'>
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
											className='hover:bg-gray-50 hover:font-semibold block sm:table-row'
										>
											{row.cells.map((cell) => {
												const { key: cellKey, ...cellProps } =
													cell.getCellProps();
												return (
													<td
														key={cellKey}
														{...cellProps}
														className={`border border-gray-300 px-4 py-2 block sm:table-cell ${
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
							disabled={!canNextPage || pageNumber >= dynamicTotalPages}
							className={`px-1 py-1 border rounded-md ${
								!canNextPage || pageNumber >= dynamicTotalPages
									? "bg-gray-200 text-gray-400 cursor-not-allowed"
									: "bg-black text-white hover:bg-gray-100"
							}`}
						>
							<IoMdArrowDropright size={15} />
						</button>
					</div>
					<div className='text-gray-600'>
						Showing {(pageNumber - 1) * pageSize + 1}-
						{Math.min(pageNumber * pageSize, dynamicTotalCount)} of{" "}
						{dynamicTotalCount}
					</div>
				</div>
			</div>
			<KadElectricModal
				modalContent={modalContent}
				onClose={() => setModalContent(null)}
			/>
		</div>
	);
};

export default KadTransactionTable;
