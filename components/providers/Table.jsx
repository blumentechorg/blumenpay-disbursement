"use client";

import React from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";

const TransactionTable = () => {
  // Data for the table
  const data = React.useMemo(
    () =>
      Array.from({ length: 20 }, (_, index) => ({
        id: `123456789${index + 1}`,
        provider: index % 2 === 0 ? "KAEDC" : "AEDC",
        amount: "$20,000",
        method: "Bank Transfer",
        schedule: "11:15 AM, Nov 7",
        status: index % 3 === 0 ? "Failed" : "Successful",
        action: index % 3 === 0 ? "Retry" : "View Details",
      })),
    []
  );

  // Columns for the table
  const columns = React.useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Service Provider", accessor: "provider" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Payment Method", accessor: "method" },
      { Header: "Schedule Date", accessor: "schedule" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <div className="flex items-center space-x-2">
            {value === "Successful" ? (
              <FaCheckCircle className="text-green-500" size={14} />
            ) : (
              <TbAlertCircleFilled className="text-red-500" size={16} />
            )}
            <span>{value}</span>
          </div>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ value }) => (
          <button
            className="text-[#343A40] text-xs underline hover:text-blue-700"
            title={value === "Retry" ? "Retry Payment" : "View Details"}
          >
            {value}
          </button>
        ),
      },
    ],
    []
  );

  // React Table hook
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <table
        {...getTableProps()}
        className="w-full text-xs border-collapse border border-gray-300 rounded-lg"
      >
        <thead className="bg-gray-100 text-gray-700 font-semibold">
          {headerGroups.map((headerGroup) => {
            const { key: headerGroupKey, ...headerGroupProps } =
              headerGroup.getHeaderGroupProps();
            return (
              <tr key={headerGroupKey} {...headerGroupProps}>
                {headerGroup.headers.map((column) => {
                  const { key: columnKey, ...columnProps } =
                    column.getHeaderProps();
                  return (
                    <th
                      key={columnKey}
                      {...columnProps}
                      className="border border-gray-300 px-4 py-2 text-left"
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
          {page.map((row) => {
            prepareRow(row);
            const { key: rowKey, ...rowProps } = row.getRowProps(); // Extract key explicitly for <tr>
            return (
              <tr
                key={rowKey}
                {...rowProps}
                className="hover:bg-gray-50 hover:font-semibold"
              >
                {row.cells.map((cell) => {
                  const { key: cellKey, ...cellProps } = cell.getCellProps(); // Extract key explicitly for <td>
                  return (
                    <td
                      key={cellKey}
                      {...cellProps}
                      className="border border-gray-300 px-4 py-2"
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

      {/* Pagination */}
      <div className="flex justify-between items-center text-xs p-4 bg-gray-50 border-t border-gray-300">
        {/* Rows per page */}
        <div className="flex items-center space-x-2">
          <span>Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-2 py-1 border rounded-md"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Pagination controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={previousPage}
            disabled={!canPreviousPage}
            className={`px-2 py-1 border rounded-md ${
              !canPreviousPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <IoMdArrowDropleft />
          </button>
          <span>
            Page {pageIndex + 1} of {Math.ceil(data.length / pageSize)}
          </span>
          <button
            onClick={nextPage}
            disabled={!canNextPage}
            className={`px-2 py-1 border rounded-md ${
              !canNextPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <IoMdArrowDropright />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
