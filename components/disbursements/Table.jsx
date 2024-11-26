"use client";

import React, { useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";

function CustomTable() {
  const columns = useMemo(
    () => [
      { Header: "ID", accessor: "id" },
      { Header: "Service Provider", accessor: "serviceProvider" },
      { Header: "Amount", accessor: "amount" },
      {
        Header: "Payment Method",
        accessor: "paymentMethod",
        Cell: ({ value }) => (
          <a href="#" className="text-blue-600 hover:underline">
            {value}
          </a>
        ),
      },
      { Header: "Schedule Date", accessor: "scheduleDate" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <div className="flex items-center text-sm space-x-2 ">
            {value === "Successful" ? (
              <FaCheckCircle className="text-green-700" size={13} />
            ) : (
              <TbAlertCircleFilled className="text-yellow-500 " size={16} />
            )}
            <span>{value}</span>
          </div>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: () => (
          <button className="text-gray-500  hover:text-gray-800">
            <BsThreeDotsVertical size={15} />
          </button>
        ),
      },
    ],
    []
  );

  const data = useMemo(
    () => [
      {
        id: "1234567890",
        serviceProvider: "KAEDC",
        amount: "$20,000",
        paymentMethod: "Bank Transfer",
        scheduleDate: "11:43 AM, Nov 7",
        status: "Pending",
      },
      {
        id: "1234567890",
        serviceProvider: "AEDC",
        amount: "$20,000",
        paymentMethod: "Bank Transfer",
        scheduleDate: "11:15 AM, Nov 7",
        status: "Scheduled",
      },
      {
        id: "1234567890",
        serviceProvider: "AEDC",
        amount: "$20,000",
        paymentMethod: "Bank Transfer",
        scheduleDate: "11:15 AM, Nov 7",
        status: "Scheduled",
      },
      {
        id: "1234567890",
        serviceProvider: "AEDC",
        amount: "$20,000",
        paymentMethod: "Bank Transfer",
        scheduleDate: "11:15 AM, Nov 7",
        status: "Scheduled",
      },
      {
        id: "1234567890",
        serviceProvider: "AEDC",
        amount: "$20,000",
        paymentMethod: "Bank Transfer",
        scheduleDate: "11:15 AM, Nov 7",
        status: "Scheduled",
      },
      {
        id: "1234567890",
        serviceProvider: "AEDC",
        amount: "$20,000",
        paymentMethod: "Bank Transfer",
        scheduleDate: "11:15 AM, Nov 7",
        status: "Scheduled",
      },
      {
        id: "1234567890",
        serviceProvider: "AEDC",
        amount: "$20,000",
        paymentMethod: "Bank Transfer",
        scheduleDate: "11:15 AM, Nov 7",
        status: "Scheduled",
      },
      {
        id: "1234567890",
        serviceProvider: "AEDC",
        amount: "$20,000",
        paymentMethod: "Bank Transfer",
        scheduleDate: "11:15 AM, Nov 7",
        status: "Scheduled",
      },
      // Add more rows as needed
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    setPageSize,
    gotoPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 4 },
    },
    usePagination
  );

  return (
    <div className="text-xs">
      <div className="overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full table-auto border-collapse border border-gray-200"
        >
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            {headerGroups.map((headerGroup) => {
              const { key, ...rest } = headerGroup.getHeaderGroupProps(); // Separate key
              return (
                <tr key={key} {...rest}>
                  {headerGroup.headers.map((column) => {
                    const { key: columnKey, ...columnRest } =
                      column.getHeaderProps(); // Separate key for <th>
                    return (
                      <th
                        key={columnKey}
                        {...columnRest}
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
              const { key, ...rowProps } = row.getRowProps(); // Separate key for <tr>
              return (
                <tr
                  key={key}
                  {...rowProps}
                  className="hover:bg-gray-50 hover:font-semibold"
                >
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps(); // Separate key for <td>
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
      </div>

      {/* Pagination */}
      <div className="flex justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300">
        {/* Rows per page */}
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-1 py-1 border rounded-md bg-white text-gray-700"
          >
            {[4, 8, 10, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-2">
          <button
            onClick={previousPage}
            disabled={!canPreviousPage}
            className={`px-1 py-1 border rounded-md ${
              !canPreviousPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-100"
            }`}
          >
            <IoMdArrowDropleft size={15} />
          </button>
          {pageOptions.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => gotoPage(pageNum)}
              className={`px-2 py-1 border rounded-md ${
                pageIndex === pageNum
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              }`}
            >
              {pageNum + 1}
            </button>
          ))}
          <button
            onClick={nextPage}
            disabled={!canNextPage}
            className={`px-1 py-1 border rounded-md ${
              !canNextPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-black text-white hover:bg-gray-100"
            }`}
          >
            <IoMdArrowDropright size={15} />
          </button>
        </div>

        {/* Showing text */}
        <div className="text-gray-600">
          Showing {pageIndex * pageSize + 1}-
          {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length}
        </div>
      </div>
    </div>
  );
}

export default CustomTable;
