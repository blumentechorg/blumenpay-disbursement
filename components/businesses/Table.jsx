// "use client";

// import React, { useState, useEffect, useCallback, useMemo } from "react";
// import { useTable, usePagination } from "react-table";
// import { FaCheckCircle } from "react-icons/fa";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import ProvidersModal from "./Modal";
// import FloatingSearchContainer from "./PSearch";
// import providersData from "@/lib/providersData.json";

// const TransactionTable = ({ filters }) => {
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // Load data from data.json
//     setData(providersData);
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

//   const filteredData = React.useMemo(() => {
//     if (!filters) return data; // If filters are undefined, return the unfiltered data.

//     return data.filter((row) => {
//       return (
//         (!filters.status || row.status === filters.status) &&
//         (!filters.serviceProvider ||
//           row.provider === filters.serviceProvider) &&
//         (!filters.paymentMethod || row.method === filters.paymentMethod)
//       );
//     });
//   }, [data, filters]);

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
//       { Header: "Service Provider", accessor: "provider" },
//       { Header: "Amount", accessor: "amount" },
//       {
//         Header: "Payment Method",
//         accessor: "method",
//         className: "hidden md:table-cell",
//       },
//       {
//         Header: "Schedule Date",
//         accessor: "schedule",
//         className: "hidden lg:table-cell",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => (
//           <div className="flex items-center space-x-2">
//             {value === "Successful" ? (
//               <FaCheckCircle className="text-green-500" size={14} />
//             ) : (
//               <TbAlertCircleFilled className="text-red-500" size={16} />
//             )}
//             <span>{value}</span>
//           </div>
//         ),
//       },
//       {
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => (
//           <button
//             onClick={() => openModal(row.original)}
//             className="text-[#343A40] text-xs underline hover:text-blue-700"
//           >
//             {row.original.action}
//           </button>
//         ),
//       },
//     ],
//     [selectedRows]
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     gotoPage,
//     pageOptions,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data: filteredData,
//       initialState: { pageIndex: 0, pageSize: 10 },
//     },
//     usePagination
//   );

//   return (
//     <div className="space-y-5">
//       <div>
//         <FloatingSearchContainer onSelectAll={handleSelectAll} />
//       </div>
//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
//         <table
//           {...getTableProps()}
//           className="min-w-full text-xs border-collapse border border-gray-300 rounded-lg table-auto"
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold">
//             {headerGroups.map((headerGroup) => {
//               const { key, ...rest } = headerGroup.getHeaderGroupProps(); // Separate key
//               return (
//                 <tr key={key} {...rest} className="block sm:table-row">
//                   {headerGroup.headers.map((column) => {
//                     const { key: columnKey, ...columnRest } =
//                       column.getHeaderProps(); // Separate key for <th>
//                     return (
//                       <th
//                         key={columnKey}
//                         {...columnRest}
//                         className={`border border-gray-300 px-4 py-2 text-left ${
//                           column.className || ""
//                         }`}
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
//                   className="hover:bg-gray-50 hover:font-semibold block sm:table-row"
//                 >
//                   {row.cells.map((cell) => {
//                     const { key: cellKey, ...cellProps } = cell.getCellProps(); // Separate key for <td>
//                     return (
//                       <td
//                         key={cellKey}
//                         {...cellProps}
//                         className={`border border-gray-300 px-4 py-2 block sm:table-cell ${
//                           cell.column.className || ""
//                         }`}
//                         data-label={cell.column.Header} // For pseudo-labels on small screens
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

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300 space-y-2 sm:space-y-0">
//           <div className="flex items-center space-x-2">
//             <span className="text-gray-700">Rows per page:</span>
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               className="px-1 py-1 border rounded-md bg-white text-gray-700"
//             >
//               {[4, 8, 10, 20].map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={previousPage}
//               disabled={!canPreviousPage}
//               className={`px-1 py-1 border rounded-md ${
//                 !canPreviousPage
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropleft size={15} />
//             </button>
//             {pageOptions.map((pageNum) => (
//               <button
//                 key={pageNum}
//                 onClick={() => gotoPage(pageNum)}
//                 className={`px-2 py-1 border rounded-md ${
//                   pageIndex === pageNum
//                     ? "bg-black text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 {pageNum + 1}
//               </button>
//             ))}
//             <button
//               onClick={nextPage}
//               disabled={!canNextPage}
//               className={`px-1 py-1 border rounded-md ${
//                 !canNextPage
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropright size={15} />
//             </button>
//           </div>
//           <div className="text-gray-600">
//             Showing {pageIndex * pageSize + 1}-
//             {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length}
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <ProvidersModal modalContent={modalContent} onClose={closeModal} />
//     </div>
//   );
// };

// export default TransactionTable;

// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { useTable, usePagination } from "react-table";
// import { FaCheckCircle } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import ProvidersModal from "./Modal";
// import FloatingSearchContainer from "./PSearch";
// import axiosInstance from "@/lib/axiosInstance"; // Using your axios instance

// const BusinessTable = ({ filters }) => {
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [data, setData] = useState([]);

//   // Fetch data from the API endpoint using axiosInstance
//   useEffect(() => {
//     axiosInstance
//       .get("Apps?pageNumber=1&pageSize=50")
//       .then((response) => {
//         // Set data to the array from response.data.data
//         setData(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data", error);
//       });
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
//       newSelections[row.appId] = isSelected;
//     });
//     setSelectedRows(newSelections);
//   };

//   // Filtering logic remains unchanged
//   const filteredData = useMemo(() => {
//     if (!filters) return data;

//     return data.filter((row) => {
//       return (
//         (!filters.status || row.status?.label === filters.status) &&
//         (!filters.defaultProvider ||
//           row.defaultProvider === filters.defaultProvider)
//       );
//     });
//   }, [data, filters]);

//   // Update columns to use the new data fields
//   const columns = useMemo(
//     () => [
//       {
//         Header: "",
//         accessor: "checkbox",
//         Cell: ({ row }) => (
//           <input
//             type="checkbox"
//             checked={selectedRows[row.original.appId] || false}
//             onChange={() => toggleRowSelection(row.original.appId)}
//           />
//         ),
//       },
//       { Header: "App ID", accessor: "appId" },
//       { Header: "Business Name ", accessor: "name" },
//       { Header: "Amount", accessor: "totalBalance" },
//       { Header: "Default Provider", accessor: "defaultProvider" },
//       {
//         Header: "Creation Date",
//         accessor: "apiKeyCreationDate",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => (
//           <div className="flex items-center space-x-2">
//             {value?.label === "Active" ? (
//               <FaCheckCircle className="text-green-500" size={14} />
//             ) : (
//               <TbAlertCircleFilled className="text-red-500" size={16} />
//             )}
//             <span>{value?.label}</span>
//           </div>
//         ),
//       },
//       {
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => (
//           <button
//             onClick={() => openModal(row.original)}
//             className="text-[#343A40] text-xs underline hover:text-blue-700"
//           >
//             View Details
//           </button>
//         ),
//       },
//     ],
//     [selectedRows]
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     gotoPage,
//     pageOptions,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data: filteredData,
//       initialState: { pageIndex: 0, pageSize: 10 },
//     },
//     usePagination
//   );

//   return (
//     <div className="space-y-5">
//       <div>
//         <FloatingSearchContainer onSelectAll={handleSelectAll} />
//       </div>
//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
//         <table
//           {...getTableProps()}
//           className="min-w-full text-xs border-collapse border border-gray-300 rounded-lg table-auto"
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold">
//             {headerGroups.map((headerGroup) => {
//               const { key, ...rest } = headerGroup.getHeaderGroupProps(); // Separate key
//               return (
//                 <tr key={key} {...rest} className="block sm:table-row">
//                   {headerGroup.headers.map((column) => {
//                     const { key: columnKey, ...columnRest } =
//                       column.getHeaderProps(); // Separate key for <th>
//                     return (
//                       <th
//                         key={columnKey}
//                         {...columnRest}
//                         className={`border border-gray-300 px-4 py-2 text-left ${
//                           column.className || ""
//                         }`}
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
//                   className="hover:bg-gray-50 hover:font-semibold block sm:table-row"
//                 >
//                   {row.cells.map((cell) => {
//                     const { key: cellKey, ...cellProps } = cell.getCellProps(); // Separate key for <td>
//                     return (
//                       <td
//                         key={cellKey}
//                         {...cellProps}
//                         className={`border border-gray-300 px-4 py-2 block sm:table-cell ${
//                           cell.column.className || ""
//                         }`}
//                         data-label={cell.column.Header} // For pseudo-labels on small screens
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

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300 space-y-2 sm:space-y-0">
//           <div className="flex items-center space-x-2">
//             <span className="text-gray-700">Rows per page:</span>
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               className="px-1 py-1 border rounded-md bg-white text-gray-700"
//             >
//               {[4, 8, 10, 20].map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={previousPage}
//               disabled={!canPreviousPage}
//               className={`px-1 py-1 border rounded-md ${
//                 !canPreviousPage
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropleft size={15} />
//             </button>
//             {pageOptions.map((pageNum) => (
//               <button
//                 key={pageNum}
//                 onClick={() => gotoPage(pageNum)}
//                 className={`px-2 py-1 border rounded-md ${
//                   pageIndex === pageNum
//                     ? "bg-black text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 {pageNum + 1}
//               </button>
//             ))}
//             <button
//               onClick={nextPage}
//               disabled={!canNextPage}
//               className={`px-1 py-1 border rounded-md ${
//                 !canNextPage
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropright size={15} />
//             </button>
//           </div>
//           <div className="text-gray-600">
//             Showing {pageIndex * pageSize + 1}-
//             {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length}
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <ProvidersModal modalContent={modalContent} onClose={closeModal} />
//     </div>
//   );
// };

// export default BusinessTable;

// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { useTable, usePagination } from "react-table";
// import { FaCheckCircle } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import BusinessModal from "./Modal";
// import FloatingSearchContainer from "./PSearch";
// import axiosInstance from "@/lib/axiosInstance"; // Using your axios instance
// import moment from "moment";

// const BusinessTable = ({ filters }) => {
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [data, setData] = useState([]);

//   // Fetch data from the API endpoint using axiosInstance
//   useEffect(() => {
//     axiosInstance
//       .get("Apps?pageNumber=1&pageSize=50")
//       .then((response) => {
//         // Set data to the array from response.data.data
//         setData(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data", error);
//       });
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
//       newSelections[row.appId] = isSelected;
//     });
//     setSelectedRows(newSelections);
//   };

//   // Filtering logic remains unchanged
//   const filteredData = useMemo(() => {
//     if (!filters) return data;

//     return data.filter((row) => {
//       return (
//         (!filters.status || row.status?.label === filters.status) &&
//         (!filters.defaultProvider ||
//           row.defaultProvider === filters.defaultProvider)
//       );
//     });
//   }, [data, filters]);

//   // Update columns to use the new data fields
//   const columns = useMemo(
//     () => [
//       {
//         Header: "",
//         accessor: "checkbox",
//         Cell: ({ row }) => (
//           <input
//             type="checkbox"
//             checked={selectedRows[row.original.appId] || false}
//             onChange={() => toggleRowSelection(row.original.appId)}
//           />
//         ),
//       },
//       { Header: "App ID", accessor: "appId" },
//       { Header: "Business", accessor: "name" },
//       { Header: "Total Balance", accessor: "totalBalance" },
//       { Header: " Provider", accessor: "defaultProvider" },
//       {
//         Header: "Creation Date",
//         accessor: "apiKeyCreationDate",
//         Cell: ({ value }) => {
//           const now = moment();
//           const createdAt = moment(value);
//           const diffInMinutes = now.diff(createdAt, "minutes");
//           const diffInHours = now.diff(createdAt, "hours");
//           const diffInDays = now.diff(createdAt, "days");
//           if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
//           else if (diffInHours < 24) return `${diffInHours} hrs ago`;
//           else if (diffInDays < 7) return `${diffInDays} days ago`;
//           else return createdAt.format("YYYY-MM-DD");
//         },
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => (
//           <div className="flex items-center space-x-2">
//             {value?.label === "Active" ? (
//               <FaCheckCircle className="text-green-500" size={14} />
//             ) : (
//               <TbAlertCircleFilled className="text-red-500" size={16} />
//             )}
//             <span>{value?.label}</span>
//           </div>
//         ),
//       },
//       {
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => (
//           <button
//             onClick={() => openModal(row.original)}
//             className="text-[#343A40] text-xs underline hover:text-blue-700"
//           >
//             View
//           </button>
//         ),
//       },
//     ],
//     [selectedRows]
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     nextPage,
//     previousPage,
//     setPageSize,
//     gotoPage,
//     pageOptions,
//     state: { pageIndex, pageSize },
//   } = useTable(
//     {
//       columns,
//       data: filteredData,
//       initialState: { pageIndex: 0, pageSize: 10 },
//     },
//     usePagination
//   );

//   return (
//     <div className="space-y-5">
//       <div>
//         <FloatingSearchContainer onSelectAll={handleSelectAll} />
//       </div>
//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
//         <table
//           {...getTableProps()}
//           className="min-w-full text-xs border-collapse border border-gray-300 rounded-lg table-auto"
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold">
//             {headerGroups.map((headerGroup) => (
//               <tr
//                 key={headerGroup.getHeaderGroupProps().key}
//                 {...headerGroup.getHeaderGroupProps()}
//                 className="block sm:table-row"
//               >
//                 {headerGroup.headers.map((column) => (
//                   <th
//                     key={column.getHeaderProps().key}
//                     {...column.getHeaderProps()}
//                     className={`border border-gray-300 px-4 py-2 text-left ${
//                       column.className || ""
//                     }`}
//                   >
//                     {column.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {page.map((row) => {
//               prepareRow(row);
//               return (
//                 <tr
//                   key={row.getRowProps().key}
//                   {...row.getRowProps()}
//                   className="hover:bg-gray-50 hover:font-semibold block sm:table-row"
//                 >
//                   {row.cells.map((cell) => (
//                     <td
//                       key={cell.getCellProps().key}
//                       {...cell.getCellProps()}
//                       className={`border border-gray-300 px-4 py-2 block sm:table-cell ${
//                         cell.column.className || ""
//                       }`}
//                       data-label={cell.column.Header}
//                     >
//                       {cell.render("Cell")}
//                     </td>
//                   ))}
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300 space-y-2 sm:space-y-0">
//           <div className="flex items-center space-x-2">
//             <span className="text-gray-700">Rows per page:</span>
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               className="px-1 py-1 border rounded-md bg-white text-gray-700"
//             >
//               {[4, 8, 10, 20].map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={previousPage}
//               disabled={!canPreviousPage}
//               className={`px-1 py-1 border rounded-md ${
//                 !canPreviousPage
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropleft size={15} />
//             </button>
//             {pageOptions.map((pageNum) => (
//               <button
//                 key={pageNum}
//                 onClick={() => gotoPage(pageNum)}
//                 className={`px-2 py-1 border rounded-md ${
//                   pageIndex === pageNum
//                     ? "bg-black text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 {pageNum + 1}
//               </button>
//             ))}
//             <button
//               onClick={nextPage}
//               disabled={!canNextPage}
//               className={`px-1 py-1 border rounded-md ${
//                 !canNextPage
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropright size={15} />
//             </button>
//           </div>
//           <div className="text-gray-600">
//             Showing {pageIndex * pageSize + 1}-
//             {Math.min((pageIndex + 1) * pageSize, data.length)} of {data.length}
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       <BusinessModal
//         modalContent={modalContent}
//         onClose={() => setModalContent(null)}
//       />
//     </div>
//   );
// };

// export default BusinessTable;

// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { useTable, usePagination } from "react-table";
// import { FaCheckCircle } from "react-icons/fa";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import BusinessModal from "./Modal"; // Modal component defined below
// import FloatingSearchContainer from "./PSearch";
// import axiosInstance from "@/lib/axiosInstance";
// import moment from "moment";

// const BusinessTable = ({ filters }) => {
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Pagination states (1-indexed)
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(50);
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   // Reset page when filters change
//   useEffect(() => {
//     setPageNumber(1);
//   }, [filters]);

//   // For this example, assume we are not doing multi‑page fetching (adjust as needed)
//   useEffect(() => {
//     setIsLoading(true);
//     let query = `/Apps?pageNumber=${pageNumber}&pageSize=${pageSize}`;
//     if (filters.name) query += `&name=${encodeURIComponent(filters.name)}`;
//     if (filters.status)
//       query += `&status=${encodeURIComponent(filters.status)}`;
//     // Add other filter parameters as needed

//     axiosInstance
//       .get(query)
//       .then((response) => {
//         // Assuming response.data.data is an array of business objects
//         setData(response.data.data);
//         setTotalCount(response.data.totalCount);
//         setTotalPages(
//           response.data.totalPages ||
//             Math.ceil(response.data.totalCount / pageSize)
//         );
//       })
//       .catch((error) => {
//         console.error("Error fetching business data:", error);
//       })
//       .finally(() => setIsLoading(false));
//   }, [
//     pageNumber,
//     pageSize,
//     filters.name,
//     filters.status,
//     // include other filter dependencies
//   ]);

//   // Additional client‑side filtering
//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       const matchesName = filters.name
//         ? row.name.toLowerCase().includes(filters.name.toLowerCase())
//         : true;
//       const matchesStatus = filters.status
//         ? row.status === filters.status
//         : true;
//       const matchesSearch = searchQuery
//         ? row.name.toLowerCase().includes(searchQuery.toLowerCase())
//         : true;
//       return matchesName && matchesStatus && matchesSearch;
//     });
//   }, [data, filters, searchQuery]);

//   const finalData = filteredData;

//   // Column definitions
//   const columns = useMemo(
//     () => [
//       {
//         Header: "",
//         accessor: "checkbox",
//         Cell: ({ row }) => (
//           <input
//             type="checkbox"
//             onClick={(e) => e.stopPropagation()}
//             checked={selectedRows[row.original.appId] || false}
//             onChange={() =>
//               setSelectedRows((prev) => ({
//                 ...prev,
//                 [row.original.appId]: !prev[row.original.appId],
//               }))
//             }
//           />
//         ),
//       },
//       {
//         Header: "Business",
//         accessor: "name",
//         Cell: ({ value }) => value || "N/A",
//       },
//       { Header: "App ID", accessor: "appId" },
//       {
//         Header: "Total Balance",
//         accessor: "totalBalance",
//         Cell: ({ value }) => `₦${value.toLocaleString()}`,
//       },
//       { Header: "Default Provider", accessor: "defaultProvider" },
//       {
//         Header: "Created At",
//         accessor: "apiKeyCreationDate",
//         Cell: ({ value }) => {
//           const now = moment();
//           const createdAt = moment(value);
//           const diffInMinutes = now.diff(createdAt, "minutes");
//           const diffInHours = now.diff(createdAt, "hours");
//           const diffInDays = now.diff(createdAt, "days");
//           if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
//           else if (diffInHours < 24) return `${diffInHours} hrs ago`;
//           else if (diffInDays < 7) return `${diffInDays} days ago`;
//           else return createdAt.format("YYYY-MM-DD");
//         },
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => {
//           const statusLabel = value?.label || value; // Handle both object and string cases
//           return (
//             <div className="flex items-center space-x-2">
//               {value?.label === "Active" ? (
//                 <FaCheckCircle className="text-green-500" size={14} />
//               ) : (
//                 <TbAlertCircleFilled className="text-red-500" size={16} />
//               )}
//               <span>{statusLabel}</span>
//             </div>
//           );
//         },
//       },
//       {
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => (
//           <button
//             onClick={() => setModalContent(row.original)}
//             className="text-[#343A40] text-xs underline hover:text-blue-700"
//           >
//             View
//           </button>
//         ),
//       },
//     ],
//     [selectedRows]
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     gotoPage,
//     state: { pageIndex },
//   } = useTable(
//     {
//       columns,
//       data: finalData,
//       initialState: { pageIndex: pageNumber - 1, pageSize },
//       manualPagination: true,
//       pageCount: totalPages,
//     },
//     usePagination
//   );

//   const handlePageChange = (newPageNumber) => {
//     if (newPageNumber < 1 || newPageNumber > totalPages) return;
//     setPageNumber(newPageNumber);
//     gotoPage(newPageNumber - 1);
//   };

//   // For pagination items (simple example)
//   const paginationItems = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="space-y-5">
//       <div>
//         <FloatingSearchContainer
//           onSelectAll={(isSelected) => {
//             const newSelections = {};
//             data.forEach((row) => (newSelections[row.appId] = isSelected));
//             setSelectedRows(newSelections);
//           }}
//           onSearchChange={setSearchQuery}
//         />
//       </div>
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto cursor-pointer">
//         <table
//           {...getTableProps()}
//           className="min-w-full text-xs border-collapse border border-gray-300 rounded-lg table-auto"
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold">
//             {headerGroups.map((headerGroup) => {
//               const { key, ...rest } = headerGroup.getHeaderGroupProps();
//               return (
//                 <tr key={key} {...rest} className="block sm:table-row">
//                   {headerGroup.headers.map((column) => {
//                     const { key: columnKey, ...columnRest } =
//                       column.getHeaderProps();
//                     return (
//                       <th
//                         key={columnKey}
//                         {...columnRest}
//                         className={`border border-gray-300 px-4 py-2 text-left ${
//                           column.className || ""
//                         }`}
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
//             {isLoading
//               ? Array.from({ length: 5 }).map((_, index) => (
//                   <tr key={index} className="animate-pulse">
//                     {headerGroups[0].headers.map((_, colIndex) => (
//                       <td
//                         key={colIndex}
//                         className="border border-gray-300 px-4 py-2"
//                       >
//                         <div className="h-4 bg-gray-300 rounded"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               : page.map((row) => {
//                   prepareRow(row);
//                   const { key, ...rowProps } = row.getRowProps();
//                   return (
//                     <tr
//                       key={key}
//                       {...rowProps}
//                       className="hover:bg-gray-50 hover:font-semibold block sm:table-row"
//                     >
//                       {row.cells.map((cell) => {
//                         const { key: cellKey, ...cellProps } =
//                           cell.getCellProps();
//                         return (
//                           <td
//                             key={cellKey}
//                             {...cellProps}
//                             className={`border border-gray-300 px-4 py-2 block sm:table-cell ${
//                               cell.column.className || ""
//                             }`}
//                             data-label={cell.column.Header}
//                           >
//                             {cell.render("Cell")}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   );
//                 })}
//           </tbody>
//         </table>
//         <div className="flex flex-col sm:flex-row justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300 space-y-2 sm:space-y-0">
//           <div className="flex items-center space-x-2">
//             <span className="text-gray-700">Rows per page:</span>
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               className="px-1 py-1 border rounded-md bg-white text-gray-700"
//             >
//               {[4, 8, 10, 20, 50].map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(pageNumber - 1)}
//               disabled={!canPreviousPage || pageNumber <= 1}
//               className={`px-1 py-1 border rounded-md ${
//                 !canPreviousPage || pageNumber <= 1
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropleft size={15} />
//             </button>
//             {paginationItems.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => handlePageChange(item)}
//                 className={`px-2 py-1 border rounded-md ${
//                   pageNumber === item
//                     ? "bg-black text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(pageNumber + 1)}
//               disabled={!canNextPage || pageNumber >= totalPages}
//               className={`px-1 py-1 border rounded-md ${
//                 !canNextPage || pageNumber >= totalPages
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropright size={15} />
//             </button>
//           </div>
//           <div className="text-gray-600">
//             Showing {(pageNumber - 1) * pageSize + 1}-
//             {Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
//           </div>
//         </div>
//       </div>
//       <BusinessModal
//         modalContent={modalContent}
//         onClose={() => setModalContent(null)}
//       />
//     </div>
//   );
// };

// export default BusinessTable;

// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { useTable, usePagination } from "react-table";
// import { FaCheckCircle } from "react-icons/fa";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import BusinessModal from "./Modal"; // Modal component defined elsewhere
// import FloatingSearchContainer from "./PSearch";
// import axiosInstance from "@/lib/axiosInstance";
// import moment from "moment";

// const BusinessTable = ({ filters }) => {
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Pagination states (1-indexed)
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(50);
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   // Reset page when filters change
//   useEffect(() => {
//     setPageNumber(1);
//   }, [filters]);

//   // Build the query string based on filters and fetch data
//   useEffect(() => {
//     setIsLoading(true);
//     let query = `/Apps?pageNumber=${pageNumber}&pageSize=${pageSize}`;
//     if (filters.businessName)
//       query += `&name=${encodeURIComponent(filters.businessName)}`;
//     if (filters.status)
//       query += `&status=${encodeURIComponent(filters.status)}`;
//     if (filters.serviceProvider)
//       query += `&serviceProvider=${encodeURIComponent(
//         filters.serviceProvider
//       )}`;
//     if (filters.paymentMethod)
//       query += `&paymentMethod=${encodeURIComponent(filters.paymentMethod)}`;
//     if (filters.date) query += `&date=${encodeURIComponent(filters.date)}`;

//     axiosInstance
//       .get(query)
//       .then((response) => {
//         // Assuming response.data.data is an array of business objects
//         setData(response.data.data);
//         setTotalCount(response.data.totalCount);
//         setTotalPages(
//           response.data.totalPages ||
//             Math.ceil(response.data.totalCount / pageSize)
//         );
//       })
//       .catch((error) => {
//         console.error("Error fetching business data:", error);
//       })
//       .finally(() => setIsLoading(false));
//   }, [
//     pageNumber,
//     pageSize,
//     filters.businessName,
//     filters.status,
//     filters.serviceProvider,
//     filters.paymentMethod,
//     filters.date,
//   ]);

//   // Client‑side filtering based on table header fields
//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       const matchesBusinessName = filters.businessName
//         ? row.name.toLowerCase().includes(filters.businessName.toLowerCase())
//         : true;
//       const rowStatus =
//         typeof row.status === "object" ? row.status.label : row.status;
//       const matchesStatus = filters.status
//         ? rowStatus === filters.status
//         : true;
//       const matchesServiceProvider = filters.serviceProvider
//         ? row.defaultProvider === filters.serviceProvider
//         : true;
//       const matchesPaymentMethod = filters.paymentMethod
//         ? row.paymentMethod === filters.paymentMethod
//         : true;
//       const matchesDate = filters.date
//         ? moment(row.apiKeyCreationDate).format("YYYY-MM-DD") === filters.date
//         : true;
//       const matchesSearch = searchQuery
//         ? row.name.toLowerCase().includes(searchQuery.toLowerCase())
//         : true;
//       return (
//         matchesBusinessName &&
//         matchesStatus &&
//         matchesServiceProvider &&
//         matchesPaymentMethod &&
//         matchesDate &&
//         matchesSearch
//       );
//     });
//   }, [data, filters, searchQuery]);

//   const finalData = filteredData;

//   // Column definitions
//   const columns = useMemo(
//     () => [
//       {
//         Header: "",
//         accessor: "checkbox",
//         Cell: ({ row }) => (
//           <input
//             type="checkbox"
//             onClick={(e) => e.stopPropagation()}
//             checked={selectedRows[row.original.appId] || false}
//             onChange={() =>
//               setSelectedRows((prev) => ({
//                 ...prev,
//                 [row.original.appId]: !prev[row.original.appId],
//               }))
//             }
//           />
//         ),
//       },
//       {
//         Header: "Business",
//         accessor: "name",
//         Cell: ({ value }) => value || "N/A",
//       },
//       { Header: "App ID", accessor: "appId" },
//       {
//         Header: "Total Balance",
//         accessor: "totalBalance",
//         Cell: ({ value }) => `₦${value.toLocaleString()}`,
//       },
//       { Header: "Default Provider", accessor: "defaultProvider" },
//       {
//         Header: "Created At",
//         accessor: "apiKeyCreationDate",
//         Cell: ({ value }) => {
//           const now = moment();
//           const createdAt = moment(value);
//           const diffInMinutes = now.diff(createdAt, "minutes");
//           const diffInHours = now.diff(createdAt, "hours");
//           const diffInDays = now.diff(createdAt, "days");
//           if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
//           else if (diffInHours < 24) return `${diffInHours} hrs ago`;
//           else if (diffInDays < 7) return `${diffInDays} days ago`;
//           else return createdAt.format("YYYY-MM-DD");
//         },
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => {
//           const statusLabel = typeof value === "object" ? value.label : value;
//           return (
//             <div className="flex items-center space-x-2">
//               {statusLabel === "Active" ? (
//                 <FaCheckCircle className="text-green-500" size={14} />
//               ) : (
//                 <TbAlertCircleFilled className="text-red-500" size={16} />
//               )}
//               <span>{statusLabel}</span>
//             </div>
//           );
//         },
//       },
//       {
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => (
//           <button
//             onClick={() => setModalContent(row.original)}
//             className="text-[#343A40] text-xs underline hover:text-blue-700"
//           >
//             View
//           </button>
//         ),
//       },
//     ],
//     [selectedRows]
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     gotoPage,
//     state: { pageIndex },
//   } = useTable(
//     {
//       columns,
//       data: finalData,
//       initialState: { pageIndex: pageNumber - 1, pageSize },
//       manualPagination: true,
//       pageCount: totalPages,
//     },
//     usePagination
//   );

//   const handlePageChange = (newPageNumber) => {
//     if (newPageNumber < 1 || newPageNumber > totalPages) return;
//     setPageNumber(newPageNumber);
//     gotoPage(newPageNumber - 1);
//   };

//   // For pagination items (simple example)
//   const paginationItems = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="space-y-5">
//       <div>
//         <FloatingSearchContainer
//           onSelectAll={(isSelected) => {
//             const newSelections = {};
//             data.forEach((row) => (newSelections[row.appId] = isSelected));
//             setSelectedRows(newSelections);
//           }}
//           onSearchChange={setSearchQuery}
//         />
//       </div>
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto cursor-pointer">
//         <table
//           {...getTableProps()}
//           className="min-w-full text-xs border-collapse border border-gray-300 rounded-lg table-auto"
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold">
//             {headerGroups.map((headerGroup) => {
//               const { key, ...rest } = headerGroup.getHeaderGroupProps();
//               return (
//                 <tr key={key} {...rest} className="block sm:table-row">
//                   {headerGroup.headers.map((column) => {
//                     const { key: columnKey, ...columnRest } =
//                       column.getHeaderProps();
//                     return (
//                       <th
//                         key={columnKey}
//                         {...columnRest}
//                         className={`border border-gray-300 px-4 py-2 text-left ${
//                           column.className || ""
//                         }`}
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
//             {isLoading
//               ? Array.from({ length: 5 }).map((_, index) => (
//                   <tr key={index} className="animate-pulse">
//                     {headerGroups[0].headers.map((_, colIndex) => (
//                       <td
//                         key={colIndex}
//                         className="border border-gray-300 px-4 py-2"
//                       >
//                         <div className="h-4 bg-gray-300 rounded"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               : page.map((row) => {
//                   prepareRow(row);
//                   const { key, ...rowProps } = row.getRowProps();
//                   return (
//                     <tr
//                       key={key}
//                       {...rowProps}
//                       className="hover:bg-gray-50 hover:font-semibold block sm:table-row"
//                     >
//                       {row.cells.map((cell) => {
//                         const { key: cellKey, ...cellProps } =
//                           cell.getCellProps();
//                         return (
//                           <td
//                             key={cellKey}
//                             {...cellProps}
//                             className={`border border-gray-300 px-4 py-2 block sm:table-cell ${
//                               cell.column.className || ""
//                             }`}
//                             data-label={cell.column.Header}
//                           >
//                             {cell.render("Cell")}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   );
//                 })}
//           </tbody>
//         </table>
//         <div className="flex flex-col sm:flex-row justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300 space-y-2 sm:space-y-0">
//           <div className="flex items-center space-x-2">
//             <span className="text-gray-700">Rows per page:</span>
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               className="px-1 py-1 border rounded-md bg-white text-gray-700"
//             >
//               {[4, 8, 10, 20, 50].map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(pageNumber - 1)}
//               disabled={!canPreviousPage || pageNumber <= 1}
//               className={`px-1 py-1 border rounded-md ${
//                 !canPreviousPage || pageNumber <= 1
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropleft size={15} />
//             </button>
//             {paginationItems.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => handlePageChange(item)}
//                 className={`px-2 py-1 border rounded-md ${
//                   pageNumber === item
//                     ? "bg-black text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(pageNumber + 1)}
//               disabled={!canNextPage || pageNumber >= totalPages}
//               className={`px-1 py-1 border rounded-md ${
//                 !canNextPage || pageNumber >= totalPages
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropright size={15} />
//             </button>
//           </div>
//           <div className="text-gray-600">
//             Showing {(pageNumber - 1) * pageSize + 1}-
//             {Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
//           </div>
//         </div>
//       </div>
//       <BusinessModal
//         modalContent={modalContent}
//         onClose={() => setModalContent(null)}
//       />
//     </div>
//   );
// };

// export default BusinessTable;

// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { useTable, usePagination } from "react-table";
// import { FaCheckCircle } from "react-icons/fa";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import BusinessModal from "./Modal";
// import FloatingSearchContainer from "./PSearch";
// import axiosInstance from "@/lib/axiosInstance";
// import moment from "moment";

// const BusinessTable = ({ filters }) => {
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Pagination states (1-indexed)
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(50);
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   // Reset page when filters change
//   useEffect(() => {
//     setPageNumber(1);
//   }, [filters]);

//   // Build the query string based on filters and fetch data
//   useEffect(() => {
//     setIsLoading(true);
//     let query = `/Apps?pageNumber=${pageNumber}&pageSize=${pageSize}`;
//     if (filters.businessName)
//       query += `&name=${encodeURIComponent(filters.businessName)}`;
//     if (filters.appId) query += `&appId=${encodeURIComponent(filters.appId)}`;
//     if (filters.status)
//       query += `&status=${encodeURIComponent(filters.status)}`;
//     if (filters.serviceProvider)
//       query += `&serviceProvider=${encodeURIComponent(
//         filters.serviceProvider
//       )}`;
//     if (filters.date) query += `&date=${encodeURIComponent(filters.date)}`;

//     axiosInstance
//       .get(query)
//       .then((response) => {
//         // Assuming response.data.data is an array of business objects
//         setData(response.data.data);
//         setTotalCount(response.data.totalCount);
//         setTotalPages(
//           response.data.totalPages ||
//             Math.ceil(response.data.totalCount / pageSize)
//         );
//       })
//       .catch((error) => {
//         console.error("Error fetching business data:", error);
//       })
//       .finally(() => setIsLoading(false));
//   }, [
//     pageNumber,
//     pageSize,
//     filters.businessName,
//     filters.appId,
//     filters.status,
//     filters.serviceProvider,
//     filters.date,
//   ]);

//   // Client‑side filtering based on table header fields
//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       const matchesBusinessName = filters.businessName
//         ? row.name.toLowerCase().includes(filters.businessName.toLowerCase())
//         : true;
//       const matchesAppId = filters.appId
//         ? row.appId
//             .toString()
//             .toLowerCase()
//             .includes(filters.appId.toLowerCase())
//         : true;
//       const rowStatus =
//         typeof row.status === "object" ? row.status.label : row.status;
//       const matchesStatus = filters.status
//         ? rowStatus === filters.status
//         : true;
//       const matchesServiceProvider = filters.serviceProvider
//         ? row.defaultProvider === filters.serviceProvider
//         : true;
//       const matchesDate = filters.date
//         ? moment(row.apiKeyCreationDate).format("YYYY-MM-DD") === filters.date
//         : true;
//       const matchesSearch = searchQuery
//         ? row.name.toLowerCase().includes(searchQuery.toLowerCase())
//         : true;
//       return (
//         matchesBusinessName &&
//         matchesAppId &&
//         matchesStatus &&
//         matchesServiceProvider &&
//         matchesDate &&
//         matchesSearch
//       );
//     });
//   }, [data, filters, searchQuery]);

//   const finalData = filteredData;

//   // Column definitions
//   const columns = useMemo(
//     () => [
//       {
//         Header: "",
//         accessor: "checkbox",
//         Cell: ({ row }) => (
//           <input
//             type="checkbox"
//             onClick={(e) => e.stopPropagation()}
//             checked={selectedRows[row.original.appId] || false}
//             onChange={() =>
//               setSelectedRows((prev) => ({
//                 ...prev,
//                 [row.original.appId]: !prev[row.original.appId],
//               }))
//             }
//           />
//         ),
//       },
//       {
//         Header: "Business",
//         accessor: "name",
//         Cell: ({ value }) => value || "N/A",
//       },
//       { Header: "App ID", accessor: "appId" },
//       {
//         Header: "Total Balance",
//         accessor: "totalBalance",
//         Cell: ({ value }) => `₦${value.toLocaleString()}`,
//       },
//       { Header: "Default Provider", accessor: "defaultProvider" },
//       {
//         Header: "Created At",
//         accessor: "apiKeyCreationDate",
//         Cell: ({ value }) => {
//           const now = moment();
//           const createdAt = moment(value);
//           const diffInMinutes = now.diff(createdAt, "minutes");
//           const diffInHours = now.diff(createdAt, "hours");
//           const diffInDays = now.diff(createdAt, "days");
//           if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
//           else if (diffInHours < 24) return `${diffInHours} hrs ago`;
//           else if (diffInDays < 7) return `${diffInDays} days ago`;
//           else return createdAt.format("YYYY-MM-DD");
//         },
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => {
//           const statusLabel = typeof value === "object" ? value.label : value;
//           return (
//             <div className="flex items-center space-x-2">
//               {statusLabel === "Active" ? (
//                 <FaCheckCircle className="text-green-500" size={14} />
//               ) : (
//                 <TbAlertCircleFilled className="text-red-500" size={16} />
//               )}
//               <span>{statusLabel}</span>
//             </div>
//           );
//         },
//       },
//       {
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => (
//           <button
//             onClick={() => setModalContent(row.original)}
//             className="text-[#343A40] text-xs underline hover:text-blue-700"
//           >
//             View
//           </button>
//         ),
//       },
//     ],
//     [selectedRows]
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     gotoPage,
//     state: { pageIndex },
//   } = useTable(
//     {
//       columns,
//       data: finalData,
//       initialState: { pageIndex: pageNumber - 1, pageSize },
//       manualPagination: true,
//       pageCount: totalPages,
//     },
//     usePagination
//   );

//   const handlePageChange = (newPageNumber) => {
//     if (newPageNumber < 1 || newPageNumber > totalPages) return;
//     setPageNumber(newPageNumber);
//     gotoPage(newPageNumber - 1);
//   };

//   // For pagination items (simple example)
//   const paginationItems = Array.from({ length: totalPages }, (_, i) => i + 1);

//   return (
//     <div className="space-y-5">
//       <div>
//         <FloatingSearchContainer
//           onSelectAll={(isSelected) => {
//             const newSelections = {};
//             data.forEach((row) => (newSelections[row.appId] = isSelected));
//             setSelectedRows(newSelections);
//           }}
//           onSearchChange={setSearchQuery}
//         />
//       </div>
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto cursor-pointer">
//         <table
//           {...getTableProps()}
//           className="min-w-full text-xs border-collapse border border-gray-300 rounded-lg table-auto"
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold">
//             {headerGroups.map((headerGroup) => {
//               const { key, ...rest } = headerGroup.getHeaderGroupProps();
//               return (
//                 <tr key={key} {...rest} className="block sm:table-row">
//                   {headerGroup.headers.map((column) => {
//                     const { key: columnKey, ...columnRest } =
//                       column.getHeaderProps();
//                     return (
//                       <th
//                         key={columnKey}
//                         {...columnRest}
//                         className={`border border-gray-300 px-4 py-2 text-left ${
//                           column.className || ""
//                         }`}
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
//             {isLoading
//               ? Array.from({ length: 5 }).map((_, index) => (
//                   <tr key={index} className="animate-pulse">
//                     {headerGroups[0].headers.map((_, colIndex) => (
//                       <td
//                         key={colIndex}
//                         className="border border-gray-300 px-4 py-2"
//                       >
//                         <div className="h-4 bg-gray-300 rounded"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               : page.map((row) => {
//                   prepareRow(row);
//                   const { key, ...rowProps } = row.getRowProps();
//                   return (
//                     <tr
//                       key={key}
//                       {...rowProps}
//                       className="hover:bg-gray-50 hover:font-semibold block sm:table-row"
//                     >
//                       {row.cells.map((cell) => {
//                         const { key: cellKey, ...cellProps } =
//                           cell.getCellProps();
//                         return (
//                           <td
//                             key={cellKey}
//                             {...cellProps}
//                             className={`border border-gray-300 px-4 py-2 block sm:table-cell ${
//                               cell.column.className || ""
//                             }`}
//                             data-label={cell.column.Header}
//                           >
//                             {cell.render("Cell")}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   );
//                 })}
//           </tbody>
//         </table>
//         <div className="flex flex-col sm:flex-row justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300 space-y-2 sm:space-y-0">
//           <div className="flex items-center space-x-2">
//             <span className="text-gray-700">Rows per page:</span>
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               className="px-1 py-1 border rounded-md bg-white text-gray-700"
//             >
//               {[4, 8, 10, 20, 50].map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(pageNumber - 1)}
//               disabled={!canPreviousPage || pageNumber <= 1}
//               className={`px-1 py-1 border rounded-md ${
//                 !canPreviousPage || pageNumber <= 1
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropleft size={15} />
//             </button>
//             {paginationItems.map((item, index) => (
//               <button
//                 key={index}
//                 onClick={() => handlePageChange(item)}
//                 className={`px-2 py-1 border rounded-md ${
//                   pageNumber === item
//                     ? "bg-black text-white"
//                     : "bg-white text-gray-700 hover:bg-gray-100"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(pageNumber + 1)}
//               disabled={!canNextPage || pageNumber >= totalPages}
//               className={`px-1 py-1 border rounded-md ${
//                 !canNextPage || pageNumber >= totalPages
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropright size={15} />
//             </button>
//           </div>
//           <div className="text-gray-600">
//             Showing {(pageNumber - 1) * pageSize + 1}-
//             {Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
//           </div>
//         </div>
//       </div>
//       <BusinessModal
//         modalContent={modalContent}
//         onClose={() => setModalContent(null)}
//       />
//     </div>
//   );
// };

// export default BusinessTable;

// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { useTable, usePagination } from "react-table";
// import { FaCheckCircle } from "react-icons/fa";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import BusinessModal from "./Modal";
// import FloatingSearchContainer from "./PSearch";
// import axiosInstance from "@/lib/axiosInstance";
// import moment from "moment";

// const BusinessTable = ({ filters }) => {
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   // Pagination states (1-indexed)
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(50);
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   // Reset page when filters change
//   useEffect(() => {
//     setPageNumber(1);
//   }, [filters]);

//   // Build the query string based on filters and fetch data
//   useEffect(() => {
//     setIsLoading(true);
//     let query = `/Apps?pageNumber=${pageNumber}&pageSize=${pageSize}`;
//     if (filters.businessName)
//       query += `&name=${encodeURIComponent(filters.businessName)}`;
//     if (filters.appId) query += `&appId=${encodeURIComponent(filters.appId)}`;
//     if (filters.status)
//       query += `&status=${encodeURIComponent(filters.status)}`;
//     if (filters.serviceProvider)
//       query += `&serviceProvider=${encodeURIComponent(
//         filters.serviceProvider
//       )}`;
//     if (filters.date) query += `&date=${encodeURIComponent(filters.date)}`;

//     axiosInstance
//       .get(query)
//       .then((response) => {
//         // Assuming response.data.data is an array of business objects
//         setData(response.data.data);
//         setTotalCount(response.data.totalCount);
//         setTotalPages(
//           response.data.totalPages ||
//             Math.ceil(response.data.totalCount / pageSize)
//         );
//       })
//       .catch((error) => {
//         console.error("Error fetching business data:", error);
//       })
//       .finally(() => setIsLoading(false));
//   }, [
//     pageNumber,
//     pageSize,
//     filters.businessName,
//     filters.appId,
//     filters.status,
//     filters.serviceProvider,
//     filters.date,
//   ]);

//   // Client‑side filtering based on table header fields
//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       const matchesBusinessName = filters.businessName
//         ? row.name.toLowerCase().includes(filters.businessName.toLowerCase())
//         : true;
//       const matchesAppId = filters.appId
//         ? row.appId
//             .toString()
//             .toLowerCase()
//             .includes(filters.appId.toLowerCase())
//         : true;
//       const rowStatus =
//         typeof row.status === "object" ? row.status.label : row.status;
//       const matchesStatus = filters.status
//         ? rowStatus === filters.status
//         : true;
//       const matchesServiceProvider = filters.serviceProvider
//         ? row.defaultProvider === filters.serviceProvider
//         : true;
//       const matchesDate = filters.date
//         ? moment(row.apiKeyCreationDate).format("YYYY-MM-DD") === filters.date
//         : true;
//       const matchesSearch = searchQuery
//         ? row.name.toLowerCase().includes(searchQuery.toLowerCase())
//         : true;
//       return (
//         matchesBusinessName &&
//         matchesAppId &&
//         matchesStatus &&
//         matchesServiceProvider &&
//         matchesDate &&
//         matchesSearch
//       );
//     });
//   }, [data, filters, searchQuery]);

//   const finalData = filteredData;

//   // ---- CUSTOM PAGINATION LOGIC (from TransactionTable) ----
//   const getPaginationItems = () => {
//     if (totalPages <= 8) {
//       return Array.from({ length: totalPages }, (_, i) => i + 1);
//     }
//     const rightGroup = [totalPages - 2, totalPages - 1, totalPages];
//     let leftGroup = [];
//     if (pageNumber <= 5) {
//       leftGroup = [1, 2, 3, 4, 5];
//     } else if (pageNumber > totalPages - 7) {
//       leftGroup = [];
//       for (let i = totalPages - 7; i <= totalPages - 3; i++) {
//         leftGroup.push(i);
//       }
//     } else {
//       leftGroup = [];
//       for (let i = pageNumber - 4; i <= pageNumber; i++) {
//         leftGroup.push(i);
//       }
//     }
//     if (leftGroup[leftGroup.length - 1] + 1 === rightGroup[0]) {
//       return [...leftGroup, ...rightGroup];
//     } else {
//       return [...leftGroup, "ellipsis", ...rightGroup];
//     }
//   };

//   const paginationItems = getPaginationItems();
//   // --------------------------------------------------------

//   // Column definitions
//   const columns = useMemo(
//     () => [
//       {
//         Header: "",
//         accessor: "checkbox",
//         Cell: ({ row }) => (
//           <input
//             type="checkbox"
//             onClick={(e) => e.stopPropagation()}
//             checked={selectedRows[row.original.appId] || false}
//             onChange={() =>
//               setSelectedRows((prev) => ({
//                 ...prev,
//                 [row.original.appId]: !prev[row.original.appId],
//               }))
//             }
//           />
//         ),
//       },
//       {
//         Header: "Business",
//         accessor: "name",
//         Cell: ({ value }) => value || "N/A",
//       },
//       { Header: "App ID", accessor: "appId" },
//       {
//         Header: "Total Balance",
//         accessor: "totalBalance",
//         Cell: ({ value }) => `₦${value.toLocaleString()}`,
//       },
//       { Header: "Default Provider", accessor: "defaultProvider" },
//       {
//         Header: "Created At",
//         accessor: "apiKeyCreationDate",
//         Cell: ({ value }) => {
//           const now = moment();
//           const createdAt = moment(value);
//           const diffInMinutes = now.diff(createdAt, "minutes");
//           const diffInHours = now.diff(createdAt, "hours");
//           const diffInDays = now.diff(createdAt, "days");
//           if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
//           else if (diffInHours < 24) return `${diffInHours} hrs ago`;
//           else if (diffInDays < 7) return `${diffInDays} days ago`;
//           else return createdAt.format("YYYY-MM-DD");
//         },
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => {
//           const statusLabel = typeof value === "object" ? value.label : value;
//           return (
//             <div className="flex items-center space-x-2">
//               {statusLabel === "Active" ? (
//                 <FaCheckCircle className="text-green-500" size={14} />
//               ) : (
//                 <TbAlertCircleFilled className="text-red-500" size={16} />
//               )}
//               <span>{statusLabel}</span>
//             </div>
//           );
//         },
//       },
//       {
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => (
//           <button
//             onClick={() => setModalContent(row.original)}
//             className="text-[#343A40] text-xs underline hover:text-blue-700"
//           >
//             View
//           </button>
//         ),
//       },
//     ],
//     [selectedRows]
//   );

//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     page,
//     prepareRow,
//     canPreviousPage,
//     canNextPage,
//     gotoPage,
//     state: { pageIndex },
//   } = useTable(
//     {
//       columns,
//       data: finalData,
//       initialState: { pageIndex: pageNumber - 1, pageSize },
//       manualPagination: true,
//       pageCount: totalPages,
//     },
//     usePagination
//   );

//   const handlePageChange = (newPageNumber) => {
//     if (newPageNumber < 1 || newPageNumber > totalPages) return;
//     setPageNumber(newPageNumber);
//     gotoPage(newPageNumber - 1);
//   };

//   return (
//     <div className="space-y-5">
//       <div>
//         <FloatingSearchContainer
//           onSelectAll={(isSelected) => {
//             const newSelections = {};
//             data.forEach((row) => (newSelections[row.appId] = isSelected));
//             setSelectedRows(newSelections);
//           }}
//           onSearchChange={setSearchQuery}
//         />
//       </div>
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto cursor-pointer">
//         <table
//           {...getTableProps()}
//           className="min-w-full text-xs border-collapse border border-gray-300 rounded-lg table-auto"
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold">
//             {headerGroups.map((headerGroup) => {
//               const { key, ...rest } = headerGroup.getHeaderGroupProps();
//               return (
//                 <tr key={key} {...rest} className="block sm:table-row">
//                   {headerGroup.headers.map((column) => {
//                     const { key: columnKey, ...columnRest } =
//                       column.getHeaderProps();
//                     return (
//                       <th
//                         key={columnKey}
//                         {...columnRest}
//                         className={`border border-gray-300 px-4 py-2 text-left ${
//                           column.className || ""
//                         }`}
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
//             {isLoading
//               ? Array.from({ length: 5 }).map((_, index) => (
//                   <tr key={index} className="animate-pulse">
//                     {headerGroups[0].headers.map((_, colIndex) => (
//                       <td
//                         key={colIndex}
//                         className="border border-gray-300 px-4 py-2"
//                       >
//                         <div className="h-4 bg-gray-300 rounded"></div>
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               : page.map((row) => {
//                   prepareRow(row);
//                   const { key, ...rowProps } = row.getRowProps();
//                   return (
//                     <tr
//                       key={key}
//                       {...rowProps}
//                       className="hover:bg-gray-50 hover:font-semibold block sm:table-row"
//                     >
//                       {row.cells.map((cell) => {
//                         const { key: cellKey, ...cellProps } =
//                           cell.getCellProps();
//                         return (
//                           <td
//                             key={cellKey}
//                             {...cellProps}
//                             className={`border border-gray-300 px-4 py-2 block sm:table-cell ${
//                               cell.column.className || ""
//                             }`}
//                             data-label={cell.column.Header}
//                           >
//                             {cell.render("Cell")}
//                           </td>
//                         );
//                       })}
//                     </tr>
//                   );
//                 })}
//           </tbody>
//         </table>
//         <div className="flex flex-col sm:flex-row justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300 space-y-2 sm:space-y-0">
//           <div className="flex items-center space-x-2">
//             <span className="text-gray-700">Rows per page:</span>
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               className="px-1 py-1 border rounded-md bg-white text-gray-700"
//             >
//               {[4, 8, 10, 20, 50].map((size) => (
//                 <option key={size} value={size}>
//                   {size}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(pageNumber - 1)}
//               disabled={!canPreviousPage || pageNumber <= 1}
//               className={`px-1 py-1 border rounded-md ${
//                 !canPreviousPage || pageNumber <= 1
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropleft size={15} />
//             </button>
//             {paginationItems.map((item, index) =>
//               item === "ellipsis" ? (
//                 <span key={index} className="px-2 py-1">
//                   ...
//                 </span>
//               ) : (
//                 <button
//                   key={index}
//                   onClick={() => handlePageChange(item)}
//                   className={`px-2 py-1 border rounded-md ${
//                     pageNumber === item
//                       ? "bg-black text-white"
//                       : "bg-white text-gray-700 hover:bg-gray-100"
//                   }`}
//                 >
//                   {item}
//                 </button>
//               )
//             )}
//             <button
//               onClick={() => handlePageChange(pageNumber + 1)}
//               disabled={!canNextPage || pageNumber >= totalPages}
//               className={`px-1 py-1 border rounded-md ${
//                 !canNextPage || pageNumber >= totalPages
//                   ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                   : "bg-black text-white hover:bg-gray-100"
//               }`}
//             >
//               <IoMdArrowDropright size={15} />
//             </button>
//           </div>
//           <div className="text-gray-600">
//             Showing {(pageNumber - 1) * pageSize + 1}-
//             {Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
//           </div>
//         </div>
//       </div>
//       <BusinessModal
//         modalContent={modalContent}
//         onClose={() => setModalContent(null)}
//       />
//     </div>
//   );
// };

// export default BusinessTable;

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";
import BusinessModal from "./Modal";
import FloatingSearchContainer from "./PSearch";
import axiosInstance from "@/lib/axiosInstance";
import moment from "moment";

const BusinessTable = ({ filters }) => {
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

  // Build the query string based on filters and fetch data
  useEffect(() => {
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

  // ---- Custom Pagination Method (Copied from TransactionTable) ----
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
      <BusinessModal
        modalContent={modalContent}
        onClose={() => setModalContent(null)}
      />
    </div>
  );
};

export default BusinessTable;
