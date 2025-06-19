"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";
// import TransactionModal from "../Modal";
import axiosInstance from "@/lib/axiosInstance";
import moment from "moment";

const DTransactionsAppId = ({ searchQuery = "", appId }) => {
  const [modalContent, setModalContent] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination states (1‑indexed)
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Only fetch once we have an appId
  useEffect(() => {
    if (!appId) return;

    setIsLoading(true);
    const query = [
      `/Transaction?pageNumber=${pageNumber}`,
      `pageSize=${pageSize}`,
      `appId=${encodeURIComponent(appId)}`,
      searchQuery && `search=${encodeURIComponent(searchQuery)}`,
    ]
      .filter(Boolean)
      .join("&");

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
  }, [pageNumber, pageSize, searchQuery, appId]);

  const columns = useMemo(
    () => [
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
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => {
          const now = moment();
          const createdAt = moment(value);
          const mins = now.diff(createdAt, "minutes");
          const hrs = now.diff(createdAt, "hours");
          const days = now.diff(createdAt, "days");
          if (mins < 60) return `${mins} mins ago`;
          if (hrs < 24) return `${hrs} hrs ago`;
          if (days < 7) return `${days} days ago`;
          return createdAt.format("YYYY-MM-DD");
        },
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <button
            onClick={() => setModalContent(row.original)}
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
    gotoPage,
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

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPageNumber(newPage);
    gotoPage(newPage - 1);
  };

  const getPaginationItems = () => {
    if (totalPages <= 8)
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    const right = [totalPages - 2, totalPages - 1, totalPages];
    let left = [];
    if (pageNumber <= 5) left = [1, 2, 3, 4, 5];
    else if (pageNumber > totalPages - 7) {
      for (let i = totalPages - 7; i <= totalPages - 3; i++) left.push(i);
    } else {
      for (let i = pageNumber - 4; i <= pageNumber; i++) left.push(i);
    }
    return left[left.length - 1] + 1 === right[0]
      ? [...left, ...right]
      : [...left, "ellipsis", ...right];
  };

  const paginationItems = useMemo(getPaginationItems, [pageNumber, totalPages]);

  return (
    <div className="space-y-5">
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
        <table
          {...getTableProps()}
          className="min-w-full text-xs border border-gray-300 table-auto"
        >
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            {headerGroups.map((hg) => (
              <tr
                {...hg.getHeaderGroupProps()}
                key={hg.id}
                className="table-row"
              >
                {hg.headers.map((col) => (
                  <th
                    {...col.getHeaderProps()}
                    key={col.id}
                    className="border border-gray-300 px-4 py-2 text-left"
                  >
                    {col.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {isLoading
              ? Array.from({ length: 5 }).map((_, idx) => (
                  <tr key={idx} className="animate-pulse">
                    {headerGroups[0].headers.map((_, ci) => (
                      <td key={ci} className="border border-gray-300 px-4 py-2">
                        <div className="h-4 bg-gray-300 rounded" />
                      </td>
                    ))}
                  </tr>
                ))
              : page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={row.id}
                      className="hover:bg-gray-50 hover:font-semibold table-row"
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          key={cell.column.id}
                          className="border border-gray-300 px-4 py-2 table-cell"
                          data-label={cell.column.Header}
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center text-xs p-4 bg-gray-50 border-t border-gray-300">
          <div className="flex items-center space-x-2">
            <span>Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="border rounded px-1 py-1"
            >
              {[5, 10, 15].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePageChange(pageNumber - 1)}
              disabled={!canPreviousPage || pageNumber <= 1}
              className="px-1 py-1 border rounded"
            >
              <IoMdArrowDropleft size={15} />
            </button>
            {paginationItems.map((item, i) =>
              item === "ellipsis" ? (
                <span key={i}>…</span>
              ) : (
                <button
                  key={i}
                  onClick={() => handlePageChange(item)}
                  className={`px-2 py-1 border rounded ${
                    pageNumber === item
                      ? "bg-black text-white"
                      : "bg-white text-gray-700"
                  }`}
                >
                  {item}
                </button>
              )
            )}
            <button
              onClick={() => handlePageChange(pageNumber + 1)}
              disabled={!canNextPage || pageNumber >= totalPages}
              className="px-1 py-1 border rounded"
            >
              <IoMdArrowDropright size={15} />
            </button>
          </div>
          <div>
            Showing {(pageNumber - 1) * pageSize + 1}–
            {Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
          </div>
        </div>
      </div>

      {/* <TransactionModal
        modalContent={modalContent}
        onClose={() => setModalContent(null)}
        appId={appId}
      /> */}
    </div>
  );
};

export default DTransactionsAppId;
