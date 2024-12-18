"use client";

import React from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";

const ActivityTable = () => {
  const data = React.useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, index) => ({
          icon: index % 3 === 0 ? "Failed" : "Successful",
          activity:
            index % 3 === 0
              ? `Failed Transaction - Transaction ID #${
                  45100 + index
                } Failed For Provider Y`
              : `Disbursement Completed - $${
                  1_200 + index
                } successfully disbursed to Provider X`,
          timestamp: `11:${30 + (index % 30)} AM, Nov 7`,
          action: index % 3 === 0 ? "Retry" : "View Details",
        })),
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Icon",
        accessor: "icon",
        Cell: ({ value }) => (
          <div className="flex justify-center items-center">
            {value === "Successful" ? (
              <FaCheckCircle className="text-green-700" size={16} />
            ) : (
              <TbAlertCircleFilled className="text-red-500" size={18} />
            )}
          </div>
        ),
      },
      {
        Header: "Activity Description",
        accessor: "activity",
        Cell: ({ value }) => (
          <span className="text-gray-700 text-sm">{value}</span>
        ),
      },
      {
        Header: "Time Stamp",
        accessor: "timestamp",
        Cell: ({ value }) => (
          <span className="text-gray-500 text-sm">{value}</span>
        ),
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ value }) => (
          <button
            className=" text-sm underline hover:text-blue-700"
            title={value === "Retry" ? "Retry the action" : "View the details"}
          >
            {value}
          </button>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
    state: { pageIndex },
    pageOptions,
    nextPage,
    gotoPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 2 },
    },
    usePagination
  );

  return (
    <div className="bg-white rounded-lg shadow-md">
      <table
        {...getTableProps()}
        className="w-full text-sm border-collapse border border-gray-300 rounded-lg"
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

      {/* Pagination */}
      <div className="flex justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300">
        {/* Rows per page */}
        <div className="flex items-center space-x-2">
          <span className=" text-gray-700">Rows per page:</span>
          <select
            value={page.length}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-1 py-1 border rounded-md bg-white text-gray-700"
          >
            {[2, 4, 8, 10].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        {/* Navigation */}
        <div className="flex items-center space-x-2">
          {/* <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className={`px-1 py-1 border rounded-md ${
              !canPreviousPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <MdKeyboardDoubleArrowLeft />
          </button> */}
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
          {/* <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
            className={`px-3 py-1 border rounded-md ${
              !canNextPage
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Last
          </button> */}
        </div>

        {/* Showing text */}
        <div className=" text-gray-600  ">
          Showing {pageIndex * page.length + 1}-
          {Math.min((pageIndex + 1) * page.length, rows.length)} of{" "}
          {rows.length}
        </div>
      </div>
    </div>
  );
};

export default ActivityTable;
