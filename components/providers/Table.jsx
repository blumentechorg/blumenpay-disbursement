"use client";

import React, { useState } from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";
import TransactionModal from "./Modal";

const TransactionTable = () => {
  const [modalContent, setModalContent] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (row) => {
    setModalContent(row);
  };

  const closeModal = () => {
    setModalContent(null);
  };

  const toggleRowSelection = (id) => {
    setSelectedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

  const columns = React.useMemo(
    () => [
      {
        Header: "",
        accessor: "checkbox",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            checked={selectedRows[row.original.id] || false}
            onChange={() => toggleRowSelection(row.original.id)}
          />
        ),
      },
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
        Cell: ({ row }) => (
          <button
            onClick={() => openModal(row.original)}
            className="text-[#343A40] text-xs underline hover:text-blue-700"
          >
            {row.original.action}
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
    nextPage,
    previousPage,
    setPageSize,
    gotoPage,
    pageOptions,
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
    <div>
      {/* Table */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <table
          {...getTableProps()}
          className="w-full text-xs border-collapse border border-gray-300 rounded-lg"
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
                  onClick={() => openModal(row.original)}
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
          <div className="text-gray-600">
            Showing {pageIndex * pageSize + 1}-
            {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length}
          </div>
        </div>
      </div>

      {/* Modal */}
      <TransactionModal modalContent={modalContent} onClose={closeModal} />
    </div>
  );
};

export default TransactionTable;
