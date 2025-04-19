"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import FloatingSearchContainer from "./Dsearch";
import disbursementData from "@/lib/disbursementData.json";
import DisbursementModal from "./Modal";

function DisbursementTable({ filters }) {
  const [modalContent, setModalContent] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [data, setData] = useState([]);

  useEffect(() => {
    // Load data from data.json
    setData(disbursementData);
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
      { Header: "Service Provider", accessor: "serviceProvider" },
      { Header: "Percentage", accessor: "percentage" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Account", accessor: "account" },
      { Header: "Frequency", accessor: "frequency" },
      // {
      //   Header: "Payment Method",
      //   accessor: "paymentMethod",
      //   Cell: ({ value }) => (
      //     <a href="#" className="text-blue-600 hover:underline">
      //       {value}
      //     </a>
      //   ),
      // },
      // { Header: "Schedule Date", accessor: "scheduleDate" },
      {
        Header: "Status Last Disb.",
        accessor: "status",
        Cell: ({ value }) => (
          <div className="flex items-center text-xs space-x-2 ">
            {value === "Successful" ? (
              <FaCheckCircle className="text-green-700" size={13} />
            ) : (
              <TbAlertCircleFilled className="text-red-600 " size={16} />
            )}
            <span>{value}</span>
          </div>
        ),
      },
      { Header: "Next Disbursement", accessor: "nextDisbursement" },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => {
          const [isOpen, setIsOpen] = useState(false);
          const dropdownRef = React.useRef(null);

          const toggleDropdown = () => {
            setIsOpen((prev) => !prev);
          };

          const closeDropdown = () => {
            setIsOpen(false);
          };

          // Close the dropdown when clicking outside
          useEffect(() => {
            const handleClickOutside = (event) => {
              if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
              ) {
                closeDropdown();
              }
            };

            document.addEventListener("mousedown", handleClickOutside);

            return () => {
              document.removeEventListener("mousedown", handleClickOutside);
            };
          }, []);

          return (
            <div ref={dropdownRef} className="">
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={toggleDropdown}
              >
                <BsThreeDotsVertical size={15} />
              </button>
              {isOpen && (
                <div className="fixed right-0 flex-none mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                  <ul className="py-1 text-xs text-gray-700">
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                      onClick={() => openModal(row.original)}
                    >
                      View Details
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
                      onClick={() => {
                        alert(`Edit ${row.original.id}`);
                        closeDropdown();
                      }}
                    >
                      Edit Disburse
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        alert(`Reschedule ${row.original.id}`);
                        closeDropdown();
                      }}
                    >
                      Reschedule Disburse
                    </li>
                  </ul>
                </div>
              )}
            </div>
          );
        },
      },
    ],
    [selectedRows]
  );

  // const data = useMemo(
  //   () => [
  //     {
  //       id: "DISB-20241224-001234",
  //       serviceProvider: "KAEDC",
  //       percentage: "2.5%",
  //       amount: "$20,000",
  //       account: "KADC Bank Acct.",
  //       frequency: "Monthly",
  //       status: "Successful",
  //       nextDisbursement: "12:00 AM, Feb 29",
  //     },
  //     {
  //       id: "DISB-20241224-001234",
  //       serviceProvider: "KAEDC",
  //       percentage: "2.5%",
  //       amount: "$20,000",
  //       account: "KADC Bank Acct.",
  //       frequency: "Monthly",
  //       status: "Successful",
  //       nextDisbursement: "12:00 AM, Feb 29",
  //     },
  //     {
  //       id: "DISB-20241224-001234",
  //       serviceProvider: "Gro Solar",
  //       percentage: "1.0%",
  //       amount: "$20,000",
  //       account: "KADC Bank Acct.",
  //       frequency: "Monthly",
  //       status: "Failed",
  //       nextDisbursement: "12:00 AM, Feb 29",
  //     },
  //     {
  //       id: "DISB-20241224-001236",
  //       serviceProvider: "Gro Solar",
  //       percentage: "1.0%",
  //       amount: "$25,000",
  //       account: "Solar Bank Acct.",
  //       frequency: "Monthly",
  //       status: "Failed",
  //       nextDisbursement: "12:00 AM, Feb 29",
  //     },
  //     {
  //       id: "DISB-20241224-001237",
  //       serviceProvider: "NEPA",
  //       percentage: "3.0%",
  //       amount: "$15,000",
  //       account: "Electricity Acct.",
  //       frequency: "Bi-Annual",
  //       status: "Successful",
  //       nextDisbursement: "12:00 AM, Jul 01",
  //     },

  //     {
  //       id: "DISB-20241224-001239",
  //       serviceProvider: "KAEDC",
  //       percentage: "2.5%",
  //       amount: "$20,000",
  //       account: "KADC Bank Acct.",
  //       frequency: "Monthly",
  //       status: "Successful",
  //       nextDisbursement: "12:00 AM, Feb 29",
  //     },
  //     {
  //       id: "DISB-20241224-001240",
  //       serviceProvider: "Gro Solar",
  //       percentage: "1.0%",
  //       amount: "$20,000",
  //       account: "KADC Bank Acct.",
  //       frequency: "Monthly",
  //       status: "Failed",
  //       nextDisbursement: "12:00 AM, Feb 29",
  //     },
  //     {
  //       id: "DISB-20241224-001241",
  //       serviceProvider: "SolarEdge",
  //       percentage: "3.2%",
  //       amount: "$50,000",
  //       account: "SolarEdge Acct.",
  //       frequency: "Quarterly",
  //       status: "Successful",
  //       nextDisbursement: "12:00 AM, Mar 31",
  //     },
  //     {
  //       id: "DISB-20241224-001242",
  //       serviceProvider: "KAEDC",
  //       percentage: "2.8%",
  //       amount: "$22,000",
  //       account: "KAEDC Savings Acct.",
  //       frequency: "Monthly",
  //       status: "Pending",
  //       nextDisbursement: "12:00 AM, Feb 29",
  //     },
  //     {
  //       id: "DISB-20241224-001243",
  //       serviceProvider: "NEPA",
  //       percentage: "5.0%",
  //       amount: "$12,000",
  //       account: "Electricity Savings",
  //       frequency: "Annual",
  //       status: "Successful",
  //       nextDisbursement: "12:00 AM, Dec 31",
  //     },
  //     {
  //       id: "DISB-20241224-001244",
  //       serviceProvider: "PowerGrid",
  //       percentage: "4.0%",
  //       amount: "$40,000",
  //       account: "PowerGrid Acct.",
  //       frequency: "Bi-Monthly",
  //       status: "Failed",
  //       nextDisbursement: "12:00 AM, Apr 01",
  //     },
  //     {
  //       id: "DISB-20241224-001245",
  //       serviceProvider: "Gro Solar",
  //       percentage: "2.0%",
  //       amount: "$45,000",
  //       account: "Gro Solar Bank Acct.",
  //       frequency: "Bi-Annual",
  //       status: "Successful",
  //       nextDisbursement: "12:00 AM, Aug 01",
  //     },
  //     {
  //       id: "DISB-20241224-001246",
  //       serviceProvider: "KAEDC",
  //       percentage: "3.0%",
  //       amount: "$19,500",
  //       account: "KADC Bank Acct.",
  //       frequency: "Monthly",
  //       status: "Pending",
  //       nextDisbursement: "12:00 AM, Feb 29",
  //     },
  //     {
  //       id: "DISB-20241224-001247",
  //       serviceProvider: "SolarEdge",
  //       percentage: "3.5%",
  //       amount: "$60,000",
  //       account: "SolarEdge Business Acct.",
  //       frequency: "Quarterly",
  //       status: "Successful",
  //       nextDisbursement: "12:00 AM, Mar 31",
  //     },
  //     {
  //       id: "DISB-20241224-001248",
  //       serviceProvider: "PowerGrid",
  //       percentage: "4.2%",
  //       amount: "$33,000",
  //       account: "Grid Savings Acct.",
  //       frequency: "Monthly",
  //       status: "Failed",
  //       nextDisbursement: "12:00 AM, Feb 29",
  //     },
  //     // Add more rows as needed
  //   ],
  //   []
  // );

  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return (
        (!filters.paymentMethod ||
          row.paymentMethod === filters.paymentMethod) &&
        (!filters.status || row.status === filters.status) &&
        (!filters.serviceProvider ||
          row.serviceProvider === filters.serviceProvider) &&
        (!filters.date || row.scheduleDate.includes(filters.date)) // Match date substring
      );
    });
  }, [data, filters]);

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
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 7 },
    },
    usePagination
  );

  return (
    <div className="text-xs  space-y-5">
      <div>
        <FloatingSearchContainer onSelectAll={handleSelectAll} />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-300px)]">
        <table
          {...getTableProps()}
          className="min-w-full table-auto border-collapse border border-gray-200"
        >
          <thead className="bg-gray-100 text-gray-700 font-semibold text-xs">
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
                        className="border border-gray-300 px-2 py-2 text-left text-xs"
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
                  className="hover:bg-gray-50 hover:font-semibold text-xs"
                >
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps(); // Separate key for <td>
                    return (
                      <td
                        key={cellKey}
                        {...cellProps}
                        className="border border-gray-300 px-2 py-2"
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

      {/* <DisbursementModal modalContent={modalContent} onClose={closeModal} /> */}
    </div>
  );
}

export default DisbursementTable;
