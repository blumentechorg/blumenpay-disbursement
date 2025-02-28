"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";
import TransactionModal from "./Modal";
import FloatingSearchContainer from "./Tsearch";
import axiosInstance from "@/lib/axiosInstance"; // Import your configured axios instance

const TransactionTable = ({ filters }) => {
  const [modalContent, setModalContent] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch transactions from the API
  useEffect(() => {
    axiosInstance
      .get("/Transaction?pageNumber=1&pageSize=50")
      .then((response) => {
        // The response body includes a key "data" which is an array of transactions
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  }, []);

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

  const handleSelectAll = (isSelected) => {
    const newSelections = {};
    data.forEach((row) => {
      newSelections[row.id] = isSelected;
    });
    setSelectedRows(newSelections);
  };

  // Updated filter logic to match the response structure

  // const filteredData = useMemo(() => {
  //   return data.filter((row) => {
  //     const matchesSearch = row.referenceNumber
  //       .toLowerCase()
  //       .includes(searchQuery.toLowerCase());
  //     return (
  //       (!filters.status || row.status.label === filters.status) &&
  //       (!filters.serviceProvider ||
  //         row.provider === filters.serviceProvider) &&
  //       (!filters.paymentMethod || row.type.label === filters.paymentMethod) &&
  //       (!filters.date || row.createdAt.includes(filters.date)) &&
  //       matchesSearch
  //     );
  //   });
  // }, [data, filters, searchQuery]);

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      // Check reference number filter (from FilterComponent)
      const matchesReferenceNumber = filters.referenceNumber
        ? row.referenceNumber
            .toLowerCase()
            .includes(filters.referenceNumber.toLowerCase())
        : true;

      // Check provider filter (from FilterComponent)
      const matchesProvider = filters.provider
        ? row.provider === filters.provider
        : true;

      // Check type filter (from FilterComponent)
      const matchesType = filters.type ? row.type.label === filters.type : true;

      // Check status filter (already connected)
      const matchesStatus = filters.status
        ? row.status.label === filters.status
        : true;

      // Check date filter (already connected)
      const matchesDate = filters.date
        ? row.createdAt.includes(filters.date)
        : true;

      // Additional search from FloatingSearchContainer
      const matchesSearch = searchQuery
        ? row.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      return (
        matchesReferenceNumber &&
        matchesProvider &&
        matchesType &&
        matchesStatus &&
        matchesDate &&
        matchesSearch
      );
    });
  }, [data, filters, searchQuery]);

  // Updated column definitions to match the API response keys
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "checkbox",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            onClick={(e) => e.stopPropagation()}
            checked={selectedRows[row.original.id] || false}
            onChange={() => toggleRowSelection(row.original.id)}
          />
        ),
      },
      { Header: "ID", accessor: "id" },
      { Header: "Reference Number", accessor: "referenceNumber" },
      { Header: "Provider", accessor: "provider" },
      { Header: "Amount", accessor: "amount" },
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
              icon = <FaCheckCircle className="text-green-500" size={14} />;
              break;
            case "Pending":
              icon = (
                <TbAlertCircleFilled className="text-yellow-600" size={14} />
              );
              break;
            case "Failed":
              icon = <TbAlertCircleFilled className="text-red-500" size={14} />;
              break;
            default:
              icon = null;
          }
          return (
            <div className="flex items-center space-x-2">
              {icon}
              <span>{value.label}</span>
            </div>
          );
        },
      },

      { Header: "Created At", accessor: "createdAt" },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <button
            onClick={() => openModal(row.original)}
            className="text-[#343A40] text-xs underline hover:text-blue-700"
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
    nextPage,
    previousPage,
    setPageSize,
    gotoPage,
    pageOptions,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  return (
    <div className="space-y-5">
      <div>
        <FloatingSearchContainer
          onSelectAll={handleSelectAll}
          onSearchChange={setSearchQuery}
        />
      </div>
      {/* Table */}
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto cursor-pointer">
        <table
          {...getTableProps()}
          className="min-w-full text-xs border-collapse border border-gray-300 rounded-lg table-auto"
        >
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            {headerGroups.map((headerGroup) => {
              const { key, ...rest } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...rest} className="block sm:table-row">
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
            {page.map((row) => {
              prepareRow(row);
              const { key, ...rowProps } = row.getRowProps();
              return (
                <tr
                  key={key}
                  {...rowProps}
                  className="hover:bg-gray-50 hover:font-semibold block sm:table-row"
                >
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps();
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

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300 space-y-2 sm:space-y-0">
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
