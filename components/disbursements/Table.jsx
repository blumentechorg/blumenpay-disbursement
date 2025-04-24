// "use client";

// import React, { useMemo, useState, useEffect } from "react";
// import { useTable, usePagination } from "react-table";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaCheckCircle } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import FloatingSearchContainer from "./Dsearch";
// import disbursementData from "@/lib/disbursementData.json";
// import DisbursementModal from "./Modal";

// function DisbursementTable({ filters }) {
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Load data from data.json
//     setData(disbursementData);
//   }, []);

//   const openModal = (row) => {
//     setModalContent(row);
//   };

//   const closeModal = () => {
//     setModalContent(null);
//   };

//   const toggleRowSelection = (id) => {
//     setSelectedRows((prev) => ({
//       ...prev,
//       [id]: !prev[id],
//     }));
//   };

//   const handleSelectAll = (isSelected) => {
//     const newSelections = {};
//     data.forEach((row) => {
//       newSelections[row.id] = isSelected;
//     });
//     setSelectedRows(newSelections);
//   };

//   const columns = React.useMemo(
//     () => [
//       {
//         Header: "",
//         accessor: "checkbox",
//         Cell: ({ row }) => (
//           <input
//             type="checkbox"
//             checked={selectedRows[row.original.id] || false}
//             onChange={() => toggleRowSelection(row.original.id)}
//           />
//         ),
//       },
//       { Header: "ID", accessor: "id" },
//       { Header: "Service Provider", accessor: "serviceProvider" },
//       { Header: "Percentage", accessor: "percentage" },
//       { Header: "Amount", accessor: "amount" },
//       { Header: "Account", accessor: "account" },
//       { Header: "Frequency", accessor: "frequency" },
//       // {
//       //   Header: "Payment Method",
//       //   accessor: "paymentMethod",
//       //   Cell: ({ value }) => (
//       //     <a href="#" className="text-blue-600 hover:underline">
//       //       {value}
//       //     </a>
//       //   ),
//       // },
//       // { Header: "Schedule Date", accessor: "scheduleDate" },
//       {
//         Header: "Status Last Disb.",
//         accessor: "status",
//         Cell: ({ value }) => (
//           <div className="flex items-center text-xs space-x-2 ">
//             {value === "Successful" ? (
//               <FaCheckCircle className="text-green-700" size={13} />
//             ) : (
//               <TbAlertCircleFilled className="text-red-600 " size={16} />
//             )}
//             <span>{value}</span>
//           </div>
//         ),
//       },
//       { Header: "Next Disbursement", accessor: "nextDisbursement" },
//       {
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => {
//           const [isOpen, setIsOpen] = useState(false);
//           const dropdownRef = React.useRef(null);

//           const toggleDropdown = () => {
//             setIsOpen((prev) => !prev);
//           };

//           const closeDropdown = () => {
//             setIsOpen(false);
//           };

//           // Close the dropdown when clicking outside
//           useEffect(() => {
//             const handleClickOutside = (event) => {
//               if (
//                 dropdownRef.current &&
//                 !dropdownRef.current.contains(event.target)
//               ) {
//                 closeDropdown();
//               }
//             };

//             document.addEventListener("mousedown", handleClickOutside);

//             return () => {
//               document.removeEventListener("mousedown", handleClickOutside);
//             };
//           }, []);

//           return (
//             <div ref={dropdownRef} className="">
//               <button
//                 className="text-gray-500 hover:text-gray-800"
//                 onClick={toggleDropdown}
//               >
//                 <BsThreeDotsVertical size={15} />
//               </button>
//               {isOpen && (
//                 <div className="fixed right-0 flex-none mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
//                   <ul className="py-1 text-xs text-gray-700">
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
//                       onClick={() => openModal(row.original)}
//                     >
//                       View Details
//                     </li>
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
//                       onClick={() => {
//                         alert(`Edit ${row.original.id}`);
//                         closeDropdown();
//                       }}
//                     >
//                       Edit Disburse
//                     </li>
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => {
//                         alert(`Reschedule ${row.original.id}`);
//                         closeDropdown();
//                       }}
//                     >
//                       Reschedule Disburse
//                     </li>
//                   </ul>
//                 </div>
//               )}
//             </div>
//           );
//         },
//       },
//     ],
//     [selectedRows]
//   );

//   // const data = useMemo(
//   //   () => [
//   //     {
//   //       id: "DISB-20241224-001234",
//   //       serviceProvider: "KAEDC",
//   //       percentage: "2.5%",
//   //       amount: "$20,000",
//   //       account: "KADC Bank Acct.",
//   //       frequency: "Monthly",
//   //       status: "Successful",
//   //       nextDisbursement: "12:00 AM, Feb 29",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001234",
//   //       serviceProvider: "KAEDC",
//   //       percentage: "2.5%",
//   //       amount: "$20,000",
//   //       account: "KADC Bank Acct.",
//   //       frequency: "Monthly",
//   //       status: "Successful",
//   //       nextDisbursement: "12:00 AM, Feb 29",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001234",
//   //       serviceProvider: "Gro Solar",
//   //       percentage: "1.0%",
//   //       amount: "$20,000",
//   //       account: "KADC Bank Acct.",
//   //       frequency: "Monthly",
//   //       status: "Failed",
//   //       nextDisbursement: "12:00 AM, Feb 29",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001236",
//   //       serviceProvider: "Gro Solar",
//   //       percentage: "1.0%",
//   //       amount: "$25,000",
//   //       account: "Solar Bank Acct.",
//   //       frequency: "Monthly",
//   //       status: "Failed",
//   //       nextDisbursement: "12:00 AM, Feb 29",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001237",
//   //       serviceProvider: "NEPA",
//   //       percentage: "3.0%",
//   //       amount: "$15,000",
//   //       account: "Electricity Acct.",
//   //       frequency: "Bi-Annual",
//   //       status: "Successful",
//   //       nextDisbursement: "12:00 AM, Jul 01",
//   //     },

//   //     {
//   //       id: "DISB-20241224-001239",
//   //       serviceProvider: "KAEDC",
//   //       percentage: "2.5%",
//   //       amount: "$20,000",
//   //       account: "KADC Bank Acct.",
//   //       frequency: "Monthly",
//   //       status: "Successful",
//   //       nextDisbursement: "12:00 AM, Feb 29",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001240",
//   //       serviceProvider: "Gro Solar",
//   //       percentage: "1.0%",
//   //       amount: "$20,000",
//   //       account: "KADC Bank Acct.",
//   //       frequency: "Monthly",
//   //       status: "Failed",
//   //       nextDisbursement: "12:00 AM, Feb 29",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001241",
//   //       serviceProvider: "SolarEdge",
//   //       percentage: "3.2%",
//   //       amount: "$50,000",
//   //       account: "SolarEdge Acct.",
//   //       frequency: "Quarterly",
//   //       status: "Successful",
//   //       nextDisbursement: "12:00 AM, Mar 31",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001242",
//   //       serviceProvider: "KAEDC",
//   //       percentage: "2.8%",
//   //       amount: "$22,000",
//   //       account: "KAEDC Savings Acct.",
//   //       frequency: "Monthly",
//   //       status: "Pending",
//   //       nextDisbursement: "12:00 AM, Feb 29",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001243",
//   //       serviceProvider: "NEPA",
//   //       percentage: "5.0%",
//   //       amount: "$12,000",
//   //       account: "Electricity Savings",
//   //       frequency: "Annual",
//   //       status: "Successful",
//   //       nextDisbursement: "12:00 AM, Dec 31",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001244",
//   //       serviceProvider: "PowerGrid",
//   //       percentage: "4.0%",
//   //       amount: "$40,000",
//   //       account: "PowerGrid Acct.",
//   //       frequency: "Bi-Monthly",
//   //       status: "Failed",
//   //       nextDisbursement: "12:00 AM, Apr 01",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001245",
//   //       serviceProvider: "Gro Solar",
//   //       percentage: "2.0%",
//   //       amount: "$45,000",
//   //       account: "Gro Solar Bank Acct.",
//   //       frequency: "Bi-Annual",
//   //       status: "Successful",
//   //       nextDisbursement: "12:00 AM, Aug 01",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001246",
//   //       serviceProvider: "KAEDC",
//   //       percentage: "3.0%",
//   //       amount: "$19,500",
//   //       account: "KADC Bank Acct.",
//   //       frequency: "Monthly",
//   //       status: "Pending",
//   //       nextDisbursement: "12:00 AM, Feb 29",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001247",
//   //       serviceProvider: "SolarEdge",
//   //       percentage: "3.5%",
//   //       amount: "$60,000",
//   //       account: "SolarEdge Business Acct.",
//   //       frequency: "Quarterly",
//   //       status: "Successful",
//   //       nextDisbursement: "12:00 AM, Mar 31",
//   //     },
//   //     {
//   //       id: "DISB-20241224-001248",
//   //       serviceProvider: "PowerGrid",
//   //       percentage: "4.2%",
//   //       amount: "$33,000",
//   //       account: "Grid Savings Acct.",
//   //       frequency: "Monthly",
//   //       status: "Failed",
//   //       nextDisbursement: "12:00 AM, Feb 29",
//   //     },
//   //     // Add more rows as needed
//   //   ],
//   //   []
//   // );

//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       return (
//         (!filters.paymentMethod ||
//           row.paymentMethod === filters.paymentMethod) &&
//         (!filters.status || row.status === filters.status) &&
//         (!filters.serviceProvider ||
//           row.serviceProvider === filters.serviceProvider) &&
//         (!filters.date || row.scheduleDate.includes(filters.date)) // Match date substring
//       );
//     });
//   }, [data, filters]);

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     pageOptions,
//     nextPage,
//     previousPage,
//     setPageSize,
//     gotoPage,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data: filteredData,
//       initialState: { pageIndex: 0, pageSize: 7 },
//     },
//     usePagination
//   );

//   return (
//     <div className="text-xs  space-y-5">
//       <div>
//         <FloatingSearchContainer onSelectAll={handleSelectAll} />
//       </div>
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-300px)]">
//         <table
//           {...getTableProps()}
//           className="min-w-full table-auto border-collapse border border-gray-200"
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold text-xs">
//             {headerGroups.map((headerGroup) => {
//               const { key, ...rest } = headerGroup.getHeaderGroupProps(); // Separate key
//               return (
//                 <tr key={key} {...rest}>
//                   {headerGroup.headers.map((column) => {
//                     const { key: columnKey, ...columnRest } =
//                       column.getHeaderProps(); // Separate key for <th>
//                     return (
//                       <th
//                         key={columnKey}
//                         {...columnRest}
//                         className="border border-gray-300 px-2 py-2 text-left text-xs"
//                       >
//                         {column.render("Header")}
//                       </th>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </thead>

//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               const { key, ...rowProps } = row.getRowProps(); // Separate key for <tr>
//               return (
//                 <tr
//                   key={key}
//                   {...rowProps}
//                   className="hover:bg-gray-50 hover:font-semibold text-xs"
//                 >
//                   {row.cells.map((cell) => {
//                     const { key: cellKey, ...cellProps } = cell.getCellProps(); // Separate key for <td>
//                     return (
//                       <td
//                         key={cellKey}
//                         {...cellProps}
//                         className="border border-gray-300 px-2 py-2"
//                       >
//                         {cell.render("Cell")}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="flex justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300">
//         {/* Rows per page */}
//         <div className="flex items-center space-x-2">
//           <span className="text-gray-700">Rows per page:</span>
//           <select
//             value={pageSize}
//             onChange={(e) => setPageSize(Number(e.target.value))}
//             className="px-1 py-1 border rounded-md bg-white text-gray-700"
//           >
//             {[4, 8, 10, 20].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Navigation */}
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={previousPage}
//             disabled={!canPreviousPage}
//             className={`px-1 py-1 border rounded-md ${
//               !canPreviousPage
//                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                 : "bg-black text-white hover:bg-gray-100"
//             }`}
//           >
//             <IoMdArrowDropleft size={15} />
//           </button>
//           {pageOptions.map((pageNum) => (
//             <button
//               key={pageNum}
//               onClick={() => gotoPage(pageNum)}
//               className={`px-2 py-1 border rounded-md ${
//                 pageIndex === pageNum
//                   ? "bg-black text-white"
//                   : "bg-white text-gray-700 hover:bg-gray-100"
//               }`}
//             >
//               {pageNum + 1}
//             </button>
//           ))}
//           <button
//             onClick={nextPage}
//             disabled={!canNextPage}
//             className={`px-1 py-1 border rounded-md ${
//               !canNextPage
//                 ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                 : "bg-black text-white hover:bg-gray-100"
//             }`}
//           >
//             <IoMdArrowDropright size={15} />
//           </button>
//         </div>

//         {/* Showing text */}
//         <div className="text-gray-600">
//           Showing {pageIndex * pageSize + 1}-
//           {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length}
//         </div>
//       </div>

//       {/* <DisbursementModal modalContent={modalContent} onClose={closeModal} /> */}
//     </div>
//   );
// }

// export default DisbursementTable;

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";
import ViewModal from "./ViewModal";
// import EditModal from "./EditModal";
import FloatingSearchContainer from "./Dsearch";
import axiosInstance from "@/lib/axiosInstance";
import moment from "moment";

const DisbursementTable = ({ filters }) => {
  const [modalContent, setModalContent] = useState(null);
  const [editModalContent, setEditModalContent] = useState(null);
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

  // Function to fetch data from the API
  const fetchData = () => {
    setIsLoading(true);
    let query = `/Apps?pageNumber=${pageNumber}&pageSize=${pageSize}`;
    if (filters.businessName)
      query += `&name=${encodeURIComponent(filters.businessName)}`;
    if (filters.appId) query += `&appId=${encodeURIComponent(filters.appId)}`;
    if (filters.status)
      query += `&status=${encodeURIComponent(filters.status)}`;
    if (filters.serviceProvider)
      query += `&serviceProvider=${encodeURIComponent(
        filters.serviceProvider
      )}`;
    if (filters.date) query += `&date=${encodeURIComponent(filters.date)}`;

    axiosInstance
      .get(query)
      .then((response) => {
        // Assuming response.data.data is an array of business objects
        setData(response.data.data);
        setTotalCount(response.data.totalCount);
        setTotalPages(
          response.data.totalPages ||
            Math.ceil(response.data.totalCount / pageSize)
        );
      })
      .catch((error) => {
        console.error("Error fetching business data:", error);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pageNumber,
    pageSize,
    filters.businessName,
    filters.appId,
    filters.status,
    filters.serviceProvider,
    filters.date,
  ]);

  // Client‑side filtering based on table header fields
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      const matchesBusinessName = filters.businessName
        ? row.name.toLowerCase().includes(filters.businessName.toLowerCase())
        : true;
      const matchesAppId = filters.appId
        ? row.appId
            .toString()
            .toLowerCase()
            .includes(filters.appId.toLowerCase())
        : true;
      const rowStatus =
        typeof row.status === "object" ? row.status.label : row.status;
      const matchesStatus = filters.status
        ? rowStatus === filters.status
        : true;
      const matchesServiceProvider = filters.serviceProvider
        ? row.defaultProvider === filters.serviceProvider
        : true;
      const matchesDate = filters.date
        ? moment(row.apiKeyCreationDate).format("YYYY-MM-DD") === filters.date
        : true;
      const matchesSearch = searchQuery
        ? row.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return (
        matchesBusinessName &&
        matchesAppId &&
        matchesStatus &&
        matchesServiceProvider &&
        matchesDate &&
        matchesSearch
      );
    });
  }, [data, filters, searchQuery]);

  const finalData = filteredData;

  // ---- Custom Pagination Method ----
  const getPaginationItems = () => {
    if (totalPages <= 8) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const rightGroup = [totalPages - 2, totalPages - 1, totalPages];
    let leftGroup = [];
    if (pageNumber <= 5) {
      leftGroup = [1, 2, 3, 4, 5];
    } else if (pageNumber > totalPages - 7) {
      leftGroup = [];
      for (let i = totalPages - 7; i <= totalPages - 3; i++) {
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
  // ---------------------------------------------------------------

  // Column definitions
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "checkbox",
        Cell: ({ row }) => (
          <input
            type="checkbox"
            onClick={(e) => e.stopPropagation()}
            checked={selectedRows[row.original.appId] || false}
            onChange={() =>
              setSelectedRows((prev) => ({
                ...prev,
                [row.original.appId]: !prev[row.original.appId],
              }))
            }
          />
        ),
      },
      {
        Header: " ID",
        accessor: "id", // ← change this to your actual business‐ID field name
        Cell: ({ value }) => value || "N/A",
      },
      {
        Header: "Business",
        accessor: "name",
        Cell: ({ value }) => value || "N/A",
      },
      { Header: "App ID", accessor: "appId" },
      {
        Header: "Total Balance",
        accessor: "totalBalance",
        Cell: ({ value }) => `₦${value.toLocaleString()}`,
      },
      { Header: "Default Provider", accessor: "defaultProvider" },
      {
        Header: "Created At",
        accessor: "apiKeyCreationDate",
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
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => {
          const statusLabel = typeof value === "object" ? value.label : value;
          return (
            <div className="flex items-center space-x-2">
              {statusLabel === "Active" ? (
                <FaCheckCircle className="text-green-500" size={14} />
              ) : (
                <TbAlertCircleFilled className="text-red-500" size={16} />
              )}
              <span>{statusLabel}</span>
            </div>
          );
        },
      },
      {
        Header: "Actions",
        accessor: "action",
        Cell: ({ row }) => (
          <div className="space-x-2">
            <button
              onClick={() => setModalContent(row.original)}
              className="text-[#343A40] text-xs underline hover:text-blue-700"
            >
              View
            </button>
            <button
              onClick={() => setEditModalContent(row.original)}
              className="text-[#343A40] text-xs underline hover:text-blue-700"
            >
              Edit
            </button>
          </div>
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
      pageCount: totalPages,
    },
    usePagination
  );

  const handlePageChange = (newPageNumber) => {
    if (newPageNumber < 1 || newPageNumber > totalPages) return;
    setPageNumber(newPageNumber);
    gotoPage(newPageNumber - 1);
  };

  return (
    <div className="space-y-5">
      <div>
        <FloatingSearchContainer
          onSelectAll={(isSelected) => {
            const newSelections = {};
            data.forEach((row) => (newSelections[row.appId] = isSelected));
            setSelectedRows(newSelections);
          }}
          onSearchChange={setSearchQuery}
        />
      </div>
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
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    {headerGroups[0].headers.map((_, colIndex) => (
                      <td
                        key={colIndex}
                        className="border border-gray-300 px-4 py-2"
                      >
                        <div className="h-4 bg-gray-300 rounded"></div>
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
                      className="hover:bg-gray-50 hover:font-semibold block sm:table-row"
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
        <div className="flex flex-col sm:flex-row justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300 space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => setPageSize(Number(e.target.value))}
              className="px-1 py-1 border rounded-md bg-white text-gray-700"
            >
              {[4, 8, 10, 20, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
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
                <span key={index} className="px-2 py-1">
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
              disabled={!canNextPage || pageNumber >= totalPages}
              className={`px-1 py-1 border rounded-md ${
                !canNextPage || pageNumber >= totalPages
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-gray-100"
              }`}
            >
              <IoMdArrowDropright size={15} />
            </button>
          </div>
          <div className="text-gray-600">
            Showing {(pageNumber - 1) * pageSize + 1}-
            {Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
          </div>
        </div>
      </div>
      <ViewModal
        modalContent={modalContent}
        onClose={() => setModalContent(null)}
        appId={modalContent?.id}
      />
      {/* {editModalContent && (
        <EditModal
          modalContent={editModalContent}
          onClose={() => setEditModalContent(null)}
          onSuccess={() => {
            setEditModalContent(null);
            fetchData();
          }}
        />
      )} */}
    </div>
  );
};

export default DisbursementTable;
