import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";
import TransactionModal from "./Modal";
import FloatingSearchContainer from "./Tsearch";
import axiosInstance from "@/lib/axiosInstance";
import moment from "moment";

const TransactionTable = ({ filters }) => {
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

	// Reset page when filters change
	useEffect(() => {
		setPageNumber(1);
	}, [filters]);

	const shouldFetchAllPages =
		filters.business || filters.startDate || filters.endDate;

	useEffect(() => {
		setIsLoading(true);
		if (shouldFetchAllPages) {
			async function fetchAllPages() {
				try {
					let combinedData = [];
					const queryParams = [];
					if (filters.referenceNumber)
						queryParams.push(
							`referenceNumber=${encodeURIComponent(filters.referenceNumber)}`
						);
					if (filters.provider)
						queryParams.push(
							`provider=${encodeURIComponent(filters.provider)}`
						);
					if (filters.status)
						queryParams.push(`status=${encodeURIComponent(filters.status)}`);
					if (filters.type)
						queryParams.push(`type=${encodeURIComponent(filters.type)}`);
					const baseQuery = `/Transaction?pageSize=${pageSize}${
						queryParams.length ? `&${queryParams.join("&")}` : ""
					}`;
					const firstResponse = await axiosInstance.get(
						`${baseQuery}&pageNumber=1`
					);
					let totalPagesAll =
						firstResponse.data.totalPages ||
						Math.ceil(firstResponse.data.totalCount / pageSize);
					combinedData = firstResponse.data.data;
					for (let i = 2; i <= totalPagesAll; i++) {
						const res = await axiosInstance.get(`${baseQuery}&pageNumber=${i}`);
						combinedData = combinedData.concat(res.data.data);
					}
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
								matchesDate &&
								new Date(row.createdAt) <= new Date(filters.endDate);
						}
						return matchesBusiness && matchesDate;
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
			}
			fetchAllPages();
		} else {
			let query = `/Transaction?pageNumber=${pageNumber}&pageSize=${pageSize}`;
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
	}, [
		pageNumber,
		pageSize,
		filters.referenceNumber,
		filters.provider,
		filters.status,
		filters.startDate,
		filters.endDate,
		filters.type,
		filters.business,
		shouldFetchAllPages,
	]);

	// Additional client‑side filtering
	const filteredData = useMemo(() => {
		return data.filter((row) => {
			const matchesReferenceNumber = filters.referenceNumber
				? row.referenceNumber
						.toLowerCase()
						.includes(filters.referenceNumber.toLowerCase())
				: true;
			const matchesProvider = filters.provider
				? row.provider === filters.provider
				: true;
			const matchesType = filters.type ? row.type.label === filters.type : true;
			const matchesStatus = filters.status
				? row.status.label === filters.status
				: true;
			const matchesSearch = searchQuery
				? row.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
				: true;
			return (
				matchesReferenceNumber &&
				matchesProvider &&
				matchesType &&
				matchesStatus &&
				matchesSearch
			);
		});
	}, [data, filters, searchQuery]);

	const finalData = filteredData;
	const dynamicTotalCount = shouldFetchAllPages ? finalData.length : totalCount;
	const dynamicTotalPages = shouldFetchAllPages
		? Math.ceil(finalData.length / pageSize)
		: totalPages;

	// Column definitions (unchanged)
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
				Header: "Business",
				accessor: "app.name",
				Cell: ({ value }) => value || "N/A",
			},
			{ Header: "Reference Number", accessor: "referenceNumber" },
			{ Header: "Provider", accessor: "provider" },
			{
				Header: "Amount",
				accessor: "amount",
				Cell: ({ value }) => `₦${value.toLocaleString()}`,
			},
			{ Header: "Fee", accessor: "fee" },
			{
				Header: "Type",
				accessor: "type",
				Cell: ({ value }) => (value ? value.label : ""),
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
			data: finalData,
			initialState: { pageIndex: pageNumber - 1, pageSize },
			manualPagination: true,
			pageCount: dynamicTotalPages,
		},
		usePagination
	);

	useEffect(() => {
		gotoPage(0);
	}, [filters, gotoPage]);

	const handlePageChange = (newPageNumber) => {
		if (newPageNumber < 1 || newPageNumber > dynamicTotalPages) return;
		setPageNumber(newPageNumber);
		gotoPage(newPageNumber - 1);
	};

	// Optimized pagination: fixed two groups (5 pages then 3 pages)
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
		// If the last left page is immediately before the right group, no ellipsis needed.
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
							onChange={(e) => setPageSize(Number(e.target.value))}
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
			<TransactionModal
				modalContent={modalContent}
				onClose={() => setModalContent(null)}
			/>
		</div>
	);
};

export default TransactionTable;
