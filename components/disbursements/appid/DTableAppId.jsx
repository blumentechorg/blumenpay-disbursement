"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";

import axiosInstance from "@/lib/axiosInstance";
import moment from "moment";

const FundsweepTable = ({ appId }) => {
  // modal & data state
  const [modalContent, setModalContent] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // pagination state
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // fetch fundsweep data
  useEffect(() => {
    if (!appId) return;
    setIsLoading(true);

    axiosInstance
      .get(`/Apps/Fundsweep/${appId}`, {
        params: { pageNumber, pageSize },
      })
      .then((resp) => {
        if (resp.data.isSuccess) {
          setData(resp.data.data);
          setTotalCount(resp.data.totalCount);
          setTotalPages(resp.data.totalPages);
        }
      })
      .catch((err) => {
        console.error("Error fetching fundsweep:", err);
      })
      .finally(() => setIsLoading(false));
  }, [appId, pageNumber, pageSize]);

  // table columns — adjust accessor names to your Fundsweep record shape
  const columns = useMemo(
    () => [
      {
        Header: "Sweep ID",
        accessor: "id",
      },
      {
        Header: "Amount",
        accessor: "totalAmount",
        Cell: ({ value }) => {
          // default to 0 if value is null/undefined
          const num = value ?? 0;
          return `₦${num.toLocaleString()}`;
        },
      },
      {
        Header: "Commission",
        accessor: "blumenPayCommission",
      },
      {
        Header: "Profit",
        accessor: "profit",
      },
      {
        Header: "Fee Incurred",
        accessor: "feeIncured",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => {
          // unwrap the label if it's an object, otherwise use the primitive
          const label =
            value && typeof value === "object" ? value.label : value;

          let icon;
          switch (label) {
            case "Completed":
              icon = <FaCheckCircle className="text-green-500" size={14} />;
              break;
            case "Pending":
              icon = (
                <TbAlertCircleFilled className="text-yellow-600" size={14} />
              );
              break;
            default:
              icon = <TbAlertCircleFilled className="text-red-500" size={14} />;
          }

          return (
            <div className="flex items-center space-x-1">
              {icon}
              <span>{label}</span> {/* now always a string */}
            </div>
          );
        },
      },
      {
        Header: "Created",
        accessor: "createdAt",
        Cell: ({ value }) => {
          const now = moment();
          const then = moment(value);
          const mins = now.diff(then, "minutes");
          if (mins < 60) return `${mins} mins ago`;
          const hrs = now.diff(then, "hours");
          if (hrs < 24) return `${hrs} hrs ago`;
          return then.format("YYYY-MM-DD");
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
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // current page rows
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

  // build pagination buttons (same logic you had)
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
              <tr {...hg.getHeaderGroupProps()} key={hg.id}>
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
              ? // skeleton rows
                Array.from({ length: 5 }).map((_, idx) => (
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
                      className="hover:bg-gray-50 hover:font-semibold"
                    >
                      {row.cells.map((cell) => (
                        <td
                          {...cell.getCellProps()}
                          key={cell.column.id}
                          className="border border-gray-300 px-4 py-2"
                        >
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
          </tbody>
        </table>

        {/* Pagination Controls */}
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

      {/*  */}
    </div>
  );
};

export default FundsweepTable;
