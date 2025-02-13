// "use client";

// import React, { useMemo, useState, useEffect } from "react";
// import { useTable, usePagination } from "react-table";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaCheckCircle } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import FloatingSearchContainer from "./ASearch";
// import axios from "@/lib/axiosInstance"; // Updated axios instance

// function AdminTable({ filters = {} }) {
//   // Local component states
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = useState([]);

//   // Fetch data from the /Team endpoint on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/Team?pageNumber=1&pageSize=20", {
//           timeout: 10000,
//         });
//         const teamData = response.data.data || [];

//         // Format data for the table
//         const formattedData = teamData.map((item) => ({
//           id: item.user?.id || "N/A",
//           fullName: item.user?.fullName || "N/A",
//           role: item.title || "N/A",
//           status: item.active ? "Active" : "Inactive",
//           workplaces: [
//             item.teamMgt && "Admin",
//             item.transactionMgt && "Overview | Transactions",
//             item.settlementnMgt && "Disbursements",
//             item.appMgt && "Service Providers",
//             item.customerMgt && "Complain Tickets",
//           ]
//             .filter(Boolean)
//             .join(" | "),
//         }));

//         setData(formattedData);
//       } catch (error) {
//         console.error("Error fetching team data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handler functions
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

//   // Define table columns using useMemo.
//   const columns = useMemo(
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
//       { Header: "Admin ID", accessor: "id" },
//       {
//         Header: "Full Name",
//         // Use the computed fullName (derived from user.fullName)
//         accessor: "fullName",
//       },
//       // { Header: "Email", accessor: "email" },
//       { Header: "Role", accessor: "role" },
//       {
//         Header: "Access (pages)",
//         accessor: "workplaces",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => (
//           <div className="flex items-center text-xs space-x-2">
//             {value === "Active" ? (
//               <FaCheckCircle className="text-green-700" size={13} />
//             ) : (
//               <TbAlertCircleFilled className="text-red-600" size={16} />
//             )}
//             <span>{value}</span>
//           </div>
//         ),
//       },
//       // { Header: "Last Login", accessor: "login" },
//       {
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => {
//           const [dropdownOpen, setDropdownOpen] = useState(false);
//           const dropdownRef = React.useRef(null);

//           const toggleDropdown = () => setDropdownOpen((prev) => !prev);
//           const closeDropdown = () => setDropdownOpen(false);

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
//             <div ref={dropdownRef}>
//               <button
//                 className="text-gray-500 hover:text-gray-800"
//                 onClick={toggleDropdown}
//               >
//                 <BsThreeDotsVertical size={15} />
//               </button>
//               {dropdownOpen && (
//                 <div className="fixed right-0 flex-none mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
//                   <ul className="py-1 text-xs text-gray-700">
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
//                       onClick={() => {
//                         setIsModalOpen(true); // Show modal
//                         closeDropdown(); // Close dropdown
//                       }}
//                     >
//                       Edit Admin
//                     </li>
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={() => {
//                         alert(`Deactivate admin with ID ${row.original.id}`);
//                         closeDropdown();
//                       }}
//                     >
//                       Deactivate
//                     </li>
//                   </ul>
//                 </div>
//               )}
//               {isModalOpen && (
//                 <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//                   <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//                     <header className="flex justify-between items-center">
//                       <h3 className="text-lg font-bold">Edit Admin</h3>
//                       <button
//                         className="text-gray-600"
//                         onClick={() => setIsModalOpen(false)}
//                       >
//                         ✕
//                       </button>
//                     </header>
//                     <form className="mt-4">
//                       {/* Full Name Input */}
//                       <input
//                         type="text"
//                         placeholder="Full Name"
//                         className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
//                       />
//                       {/* Email Input */}
//                       <input
//                         type="email"
//                         placeholder="Email"
//                         className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
//                       />
//                       {/* Role Selection Dropdown */}
//                       <select className="w-full mb-4 px-5 py-2 border rounded-md bg-gray-200">
//                         <option value="" disabled>
//                           Role
//                         </option>
//                         <option value="super_admin">Super Admin</option>
//                         <option value="admin">Admin</option>
//                         <option value="user">User</option>
//                       </select>
//                       {/* Pages to Access Checkboxes */}
//                       <div className="mb-4 bg-gray-200 rounded-md p-3">
//                         <div className="font-bold mb-2">Pages to Access</div>
//                         {[
//                           "Overview",
//                           "Transactions",
//                           "Disbursements",
//                           "Service Providers",
//                           "Support Tickets",
//                           "Admin Management",
//                         ].map((page) => (
//                           <div className="flex items-center mb-2" key={page}>
//                             <input
//                               type="checkbox"
//                               id={`access-${page
//                                 .toLowerCase()
//                                 .replace(/\s+/g, "-")}`}
//                               className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                             />
//                             <label
//                               htmlFor={`access-${page
//                                 .toLowerCase()
//                                 .replace(/\s+/g, "-")}`}
//                               className="ml-2 text-gray-700"
//                             >
//                               {page}
//                             </label>
//                           </div>
//                         ))}
//                       </div>
//                       {/* Buttons */}
//                       <div className="flex space-x-2 text-sm">
//                         <button
//                           className="bg-gray-200 text-gray-600 px-6 py-2 rounded-sm w-full text-[10px]"
//                           type="button"
//                           onClick={() => setIsModalOpen(false)}
//                         >
//                           CANCEL
//                         </button>
//                         <button
//                           className="bg-[#0052CC] text-white px-6 py-2 rounded-sm w-full text-[10px]"
//                           type="button"
//                         >
//                           SUBMIT
//                         </button>
//                       </div>
//                     </form>
//                   </div>
//                 </div>
//               )}
//             </div>
//           );
//         },
//       },
//     ],
//     [selectedRows, isModalOpen]
//   );

//   // (Optional) Filter data based on incoming filters.
//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       // Adjust these filters based on the actual fields you wish to filter by.
//       return (
//         (!filters.status || row.status === filters.status) &&
//         (!filters.role || row.role === filters.role)
//       );
//     });
//   }, [data, filters]);

//   // Setup react-table with pagination.
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
//       initialState: { pageIndex: 0, pageSize: 5 },
//     },
//     usePagination
//   );

//   return (
//     <div className="text-xs space-y-5">
//       <div>
//         <FloatingSearchContainer onSelectAll={handleSelectAll} />
//       </div>
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-300px)]">
//         <table
//           {...getTableProps()}
//           className="min-w-full table-auto border-collapse border border-gray-200"
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold">
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
//                         className="border border-gray-300 px-2 py-2 text-left"
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
//                   className="hover:bg-gray-50 hover:font-semibold"
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
//             {[5, 10].map((size) => (
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
//           {Math.min((pageIndex + 1) * pageSize, filteredData.length)} of{" "}
//           {filteredData.length}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminTable;

// "use client";

// import React, { useMemo, useState, useEffect } from "react";
// import { useTable, usePagination } from "react-table";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaCheckCircle } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import FloatingSearchContainer from "./ASearch";
// import axios from "@/lib/axiosInstance"; // Updated axios instance

// function AdminTable({ filters = {} }) {
//   // Local component states
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = useState([]);
//   // New states for editing user
//   const [currentEditingUser, setCurrentEditingUser] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     fullName: "",
//     email: "",
//     role: "",
//     pages: [],
//   });

//   // Fetch data from the /Team endpoint on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/Team?pageNumber=1&pageSize=20", {
//           timeout: 10000,
//         });
//         const teamData = response.data.data || [];

//         // Format data for the table
//         const formattedData = teamData.map((item) => ({
//           id: item.user?.id || "N/A",
//           fullName: item.user?.fullName || "N/A",
//           role: item.title || "N/A",
//           status: item.active ? "Active" : "Inactive",
//           workplaces: [
//             item.teamMgt && "Admin",
//             item.transactionMgt && "Overview | Transactions",
//             item.settlementnMgt && "Disbursements",
//             item.appMgt && "Service Providers",
//             item.customerMgt && "Complain Tickets",
//           ]
//             .filter(Boolean)
//             .join(" | "),
//         }));

//         setData(formattedData);
//       } catch (error) {
//         console.error("Error fetching team data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handler functions
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

//   // New function to open the edit modal with pre-filled data
//   const openEditModal = (user) => {
//     setCurrentEditingUser(user);
//     setEditFormData({
//       fullName: user.fullName || "",
//       email: "", // Email not available in table data
//       role: user.role || "",
//       pages: user.workplaces ? user.workplaces.split(" | ") : [],
//     });
//     setIsModalOpen(true);
//   };

//   // Define table columns using useMemo.
//   const columns = useMemo(
//     () => [
//       {
//         Header: "",
//         accessor: "checkbox",
//         Cell: ({ row }) => (
//           <input
//             type="checkbox"
//             onClick={(e) => e.stopPropagation()}
//             checked={selectedRows[row.original.id] || false}
//             onChange={() => toggleRowSelection(row.original.id)}
//           />
//         ),
//       },
//       { Header: "Admin ID", accessor: "id" },
//       {
//         Header: "Full Name",
//         // Use the computed fullName (derived from user.fullName)
//         accessor: "fullName",
//       },
//       // { Header: "Email", accessor: "email" },
//       { Header: "Role", accessor: "role" },
//       {
//         Header: "Access (pages)",
//         accessor: "workplaces",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => (
//           <div className="flex items-center text-xs space-x-2">
//             {value === "Active" ? (
//               <FaCheckCircle className="text-green-700" size={13} />
//             ) : (
//               <TbAlertCircleFilled className="text-red-600" size={16} />
//             )}
//             <span>{value}</span>
//           </div>
//         ),
//       },
//       // { Header: "Last Login", accessor: "login" },
//       {
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => {
//           const [dropdownOpen, setDropdownOpen] = useState(false);
//           const dropdownRef = React.useRef(null);

//           const toggleDropdown = () => setDropdownOpen((prev) => !prev);
//           const closeDropdown = () => setDropdownOpen(false);

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
//             <div ref={dropdownRef}>
//               <button
//                 className="text-gray-500 hover:text-gray-800"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   toggleDropdown();
//                 }}
//               >
//                 <BsThreeDotsVertical size={15} />
//               </button>
//               {dropdownOpen && (
//                 <div className="absolute  right-0 flex-none mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
//                   <ul className="py-1 text-xs text-gray-700">
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         openEditModal(row.original);
//                         closeDropdown();
//                       }}
//                     >
//                       Edit Admin
//                     </li>
//                     <li
//                       className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         alert(`Deactivate admin with ID ${row.original.id}`);
//                         closeDropdown();
//                       }}
//                     >
//                       Deactivate
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

//   // (Optional) Filter data based on incoming filters.
//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       // Adjust these filters based on the actual fields you wish to filter by.
//       return (
//         (!filters.status || row.status === filters.status) &&
//         (!filters.role || row.role === filters.role)
//       );
//     });
//   }, [data, filters]);

//   // Setup react-table with pagination.
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
//       initialState: { pageIndex: 0, pageSize: 5 },
//     },
//     usePagination
//   );

//   return (
//     <div className="text-xs space-y-5 ">
//       <div>
//         <FloatingSearchContainer onSelectAll={handleSelectAll} />
//       </div>
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-300px)]">
//         <table
//           {...getTableProps()}
//           className="min-w-full table-auto border-collapse border border-gray-200 cursor-pointer "
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold">
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
//                         className="border border-gray-300 px-2 py-2 text-left"
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
//                   onClick={() => openEditModal(row.original)}
//                   className="hover:bg-gray-50 hover:font-semibold"
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
//             {[5, 10].map((size) => (
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
//           {Math.min((pageIndex + 1) * pageSize, filteredData.length)} of{" "}
//           {filteredData.length}
//         </div>
//       </div>

//       {/* Global Edit User Modal */}
//       {isModalOpen && currentEditingUser && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//             <header className="flex justify-between items-center">
//               <h3 className="text-lg font-bold">Edit Admin</h3>
//               <button
//                 className="text-gray-600"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 ✕
//               </button>
//             </header>
//             <form className="mt-4">
//               {/* Full Name Input */}
//               <input
//                 type="text"
//                 placeholder="Full Name"
//                 value={editFormData.fullName}
//                 onChange={(e) =>
//                   setEditFormData({
//                     ...editFormData,
//                     fullName: e.target.value,
//                   })
//                 }
//                 className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
//               />
//               {/* Email Input */}
//               {/* <input
//                 type="email"
//                 placeholder="Email"
//                 value={editFormData.email}
//                 onChange={(e) =>
//                   setEditFormData({
//                     ...editFormData,
//                     email: e.target.value,
//                   })
//                 }
//                 className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
//               /> */}
//               {/* Role Selection Dropdown */}
//               <select
//                 value={editFormData.role}
//                 onChange={(e) =>
//                   setEditFormData({
//                     ...editFormData,
//                     role: e.target.value,
//                   })
//                 }
//                 className="w-full mb-4 px-5 py-2 border rounded-md bg-gray-200"
//               >
//                 <option value="" disabled>
//                   Role
//                 </option>
//                 <option value="super_admin">Super Admin</option>
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//               </select>
//               {/* Pages to Access Checkboxes */}
//               <div className="mb-4 bg-gray-200 rounded-md p-3">
//                 <div className="font-bold mb-2">Pages to Access</div>
//                 {[
//                   "Overview",
//                   "Transactions",
//                   "Disbursements",
//                   "Service Providers",
//                   "Support Tickets",
//                   "Admin Management",
//                 ].map((page) => (
//                   <div className="flex items-center mb-2" key={page}>
//                     <input
//                       type="checkbox"
//                       id={`access-${page.toLowerCase().replace(/\s+/g, "-")}`}
//                       checked={editFormData.pages.includes(page)}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setEditFormData({
//                             ...editFormData,
//                             pages: [...editFormData.pages, page],
//                           });
//                         } else {
//                           setEditFormData({
//                             ...editFormData,
//                             pages: editFormData.pages.filter((p) => p !== page),
//                           });
//                         }
//                       }}
//                       className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                     />
//                     <label
//                       htmlFor={`access-${page
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}`}
//                       className="ml-2 text-gray-700"
//                     >
//                       {page}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               {/* Buttons */}
//               <div className="flex space-x-2 text-sm">
//                 <button
//                   type="button"
//                   className="bg-gray-200 text-gray-600 px-6 py-2 rounded-sm w-full text-[10px]"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   CANCEL
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-[#0052CC] text-white px-6 py-2 rounded-sm w-full text-[10px]"
//                   onClick={() => {
//                     // Submit logic here (e.g., API call with editFormData)
//                     console.log("Submitting", editFormData);
//                     setIsModalOpen(false);
//                   }}
//                 >
//                   SUBMIT
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminTable;

// "use client";

// import React, { useMemo, useState, useEffect } from "react";
// import { useTable, usePagination } from "react-table";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaCheckCircle } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import FloatingSearchContainer from "./ASearch";
// import axios from "@/lib/axiosInstance"; // Updated axios instance

// function AdminTable({ filters = {} }) {
//   // Local component states
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = useState([]);
//   // New states for editing user
//   const [currentEditingUser, setCurrentEditingUser] = useState(null);
//   const [editFormData, setEditFormData] = useState({
//     id: "",
//     fullName: "",
//     role: "",
//     pages: [],
//     status: "Active",
//   });

//   // Fetch data from the /Team endpoint on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/Team?pageNumber=1&pageSize=20", {
//           timeout: 10000,
//         });
//         const teamData = response.data.data || [];

//         // Format data for the table
//         const formattedData = teamData.map((item) => ({
//           id: item.user?.id || "N/A",
//           fullName: item.user?.fullName || "N/A",
//           role: item.title || "N/A",
//           status: item.active ? "Active" : "Inactive",
//           workplaces: [
//             item.teamMgt && "Admin",
//             item.transactionMgt && "Overview | Transactions",
//             item.settlementnMgt && "Disbursements",
//             item.appMgt && "Service Providers",
//             item.customerMgt && "Complain Tickets",
//           ]
//             .filter(Boolean)
//             .join(" | "),
//         }));

//         setData(formattedData);
//       } catch (error) {
//         console.error("Error fetching team data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // Handler functions
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

//   // Open edit modal using the table row headers to drive the form fields.
//   const openEditModal = (user) => {
//     setCurrentEditingUser(user);
//     setEditFormData({
//       id: user.id,
//       fullName: user.fullName || "",
//       role: user.role || "",
//       pages: user.workplaces ? user.workplaces.split(" | ") : [],
//       status: user.status || "Inactive",
//     });
//     setIsModalOpen(true);
//   };

//   // Define table columns using useMemo.
//   const columns = useMemo(
//     () => [
//       {
//         Header: "",
//         accessor: "checkbox",
//         Cell: ({ row }) => (
//           <input
//             type="checkbox"
//             onClick={(e) => e.stopPropagation()}
//             checked={selectedRows[row.original.id] || false}
//             onChange={() => toggleRowSelection(row.original.id)}
//           />
//         ),
//       },
//       { Header: "Admin ID", accessor: "id" },
//       {
//         Header: "Full Name",
//         accessor: "fullName",
//       },
//       { Header: "Role", accessor: "role" },
//       {
//         Header: "Access (pages)",
//         accessor: "workplaces",
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => (
//           <div className="flex items-center text-xs space-x-2">
//             {value === "Active" ? (
//               <FaCheckCircle className="text-green-700" size={13} />
//             ) : (
//               <TbAlertCircleFilled className="text-red-600" size={16} />
//             )}
//             <span>{value}</span>
//           </div>
//         ),
//       },
//       // {
//       //   Header: "Action",
//       //   accessor: "action",
//       //   Cell: ({ row }) => {
//       //     const [dropdownOpen, setDropdownOpen] = useState(false);
//       //     const dropdownRef = React.useRef(null);

//       //     const toggleDropdown = () => setDropdownOpen((prev) => !prev);
//       //     const closeDropdown = () => setDropdownOpen(false);

//       //     useEffect(() => {
//       //       const handleClickOutside = (event) => {
//       //         if (
//       //           dropdownRef.current &&
//       //           !dropdownRef.current.contains(event.target)
//       //         ) {
//       //           closeDropdown();
//       //         }
//       //       };
//       //       document.addEventListener("mousedown", handleClickOutside);
//       //       return () => {
//       //         document.removeEventListener("mousedown", handleClickOutside);
//       //       };
//       //     }, []);

//       //     return (
//       //       <div ref={dropdownRef}>
//       //         <button
//       //           className="text-gray-500 hover:text-gray-800"
//       //           onClick={(e) => {
//       //             e.stopPropagation();
//       //             toggleDropdown();
//       //           }}
//       //         >
//       //           <BsThreeDotsVertical size={15} />
//       //         </button>
//       //         {dropdownOpen && (
//       //           <div className="fixed right-0 flex-none mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
//       //             <ul className="py-1 text-xs text-gray-700">
//       //               <li
//       //                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b"
//       //                 onClick={(e) => {
//       //                   e.stopPropagation();
//       //                   openEditModal(row.original);
//       //                   closeDropdown();
//       //                 }}
//       //               >
//       //                 Edit Admin
//       //               </li>
//       //               <li
//       //                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//       //                 onClick={(e) => {
//       //                   e.stopPropagation();
//       //                   alert(`Deactivate admin with ID ${row.original.id}`);
//       //                   closeDropdown();
//       //                 }}
//       //               >
//       //                 Deactivate
//       //               </li>
//       //             </ul>
//       //           </div>
//       //         )}
//       //       </div>
//       //     );
//       //   },
//       // },
//     ],
//     [selectedRows]
//   );

//   // (Optional) Filter data based on incoming filters.
//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       return (
//         (!filters.status || row.status === filters.status) &&
//         (!filters.role || row.role === filters.role)
//       );
//     });
//   }, [data, filters]);

//   // Setup react-table with pagination.
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
//       initialState: { pageIndex: 0, pageSize: 5 },
//     },
//     usePagination
//   );

//   return (
//     <div className="text-xs space-y-5">
//       <div>
//         <FloatingSearchContainer onSelectAll={handleSelectAll} />
//       </div>
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-300px)]">
//         <table
//           {...getTableProps()}
//           className="min-w-full table-auto border-collapse border border-gray-200"
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold">
//             {headerGroups.map((headerGroup) => {
//               const { key, ...rest } = headerGroup.getHeaderGroupProps();
//               return (
//                 <tr key={key} {...rest}>
//                   {headerGroup.headers.map((column) => {
//                     const { key: columnKey, ...columnRest } =
//                       column.getHeaderProps();
//                     return (
//                       <th
//                         key={columnKey}
//                         {...columnRest}
//                         className="border border-gray-300 px-2 py-2 text-left"
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
//               const { key, ...rowProps } = row.getRowProps();
//               return (
//                 <tr
//                   key={key}
//                   {...rowProps}
//                   onClick={() => openEditModal(row.original)}
//                   className="hover:bg-gray-50 hover:font-semibold"
//                 >
//                   {row.cells.map((cell) => {
//                     const { key: cellKey, ...cellProps } = cell.getCellProps();
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
//         <div className="flex items-center space-x-2">
//           <span className="text-gray-700">Rows per page:</span>
//           <select
//             value={pageSize}
//             onChange={(e) => setPageSize(Number(e.target.value))}
//             className="px-1 py-1 border rounded-md bg-white text-gray-700"
//           >
//             {[5, 10].map((size) => (
//               <option key={size} value={size}>
//                 {size}
//               </option>
//             ))}
//           </select>
//         </div>
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
//         <div className="text-gray-600">
//           Showing {pageIndex * pageSize + 1}-
//           {Math.min((pageIndex + 1) * pageSize, filteredData.length)} of{" "}
//           {filteredData.length}
//         </div>
//       </div>

//       {/* Global Edit User Modal */}
//       {isModalOpen && currentEditingUser && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
//             <header className="flex justify-between items-center">
//               <h3 className="text-lg font-bold">Edit Admin</h3>
//               <button
//                 className="text-gray-600"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 ✕
//               </button>
//             </header>
//             <form className="mt-4">
//               {/* Admin ID (Read-Only) */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs mb-1">
//                   Admin ID
//                 </label>
//                 <input
//                   type="text"
//                   value={editFormData.id}
//                   disabled
//                   className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
//                 />
//               </div>
//               {/* Full Name Input */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs mb-1">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Full Name"
//                   value={editFormData.fullName}
//                   onChange={(e) =>
//                     setEditFormData({
//                       ...editFormData,
//                       fullName: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-2 border rounded-md bg-gray-200"
//                 />
//               </div>
//               {/* Role Selection Dropdown */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs mb-1">Role</label>
//                 <select
//                   value={editFormData.role}
//                   onChange={(e) =>
//                     setEditFormData({
//                       ...editFormData,
//                       role: e.target.value,
//                     })
//                   }
//                   className="w-full px-5 py-2 border rounded-md bg-gray-200"
//                 >
//                   <option value="" disabled>
//                     Select Role
//                   </option>
//                   <option value="super_admin">Super Admin</option>
//                   <option value="admin">Admin</option>
//                   <option value="user">User</option>
//                 </select>
//               </div>
//               {/* Access (pages) Checkboxes */}
//               <div className="mb-4 bg-gray-200 rounded-md p-3">
//                 <div className="font-bold mb-2">Access (pages)</div>
//                 {[
//                   "Overview",
//                   "Transactions",
//                   "Disbursements",
//                   "Service Providers",
//                   "Support Tickets",
//                   "Admin Management",
//                 ].map((page) => (
//                   <div className="flex items-center mb-2" key={page}>
//                     <input
//                       type="checkbox"
//                       id={`access-${page.toLowerCase().replace(/\s+/g, "-")}`}
//                       checked={editFormData.pages.includes(page)}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setEditFormData({
//                             ...editFormData,
//                             pages: [...editFormData.pages, page],
//                           });
//                         } else {
//                           setEditFormData({
//                             ...editFormData,
//                             pages: editFormData.pages.filter((p) => p !== page),
//                           });
//                         }
//                       }}
//                       className="h-4 w-4 text-blue-600 border-gray-300 rounded"
//                     />
//                     <label
//                       htmlFor={`access-${page
//                         .toLowerCase()
//                         .replace(/\s+/g, "-")}`}
//                       className="ml-2 text-gray-700 text-xs"
//                     >
//                       {page}
//                     </label>
//                   </div>
//                 ))}
//               </div>
//               {/* Status Selection Dropdown */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs mb-1">
//                   Status
//                 </label>
//                 <select
//                   value={editFormData.status}
//                   onChange={(e) =>
//                     setEditFormData({
//                       ...editFormData,
//                       status: e.target.value,
//                     })
//                   }
//                   className="w-full px-5 py-2 border rounded-md bg-gray-200"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
//               {/* Buttons */}
//               <div className="flex space-x-2 text-sm">
//                 <button
//                   type="button"
//                   className="bg-gray-200 text-gray-600 px-6 py-2 rounded-sm w-full text-[10px]"
//                   onClick={() => setIsModalOpen(false)}
//                 >
//                   CANCEL
//                 </button>
//                 <button
//                   type="button"
//                   className="bg-[#0052CC] text-white px-6 py-2 rounded-sm w-full text-[10px]"
//                   onClick={() => {
//                     // Submit logic here (e.g., API call with editFormData)
//                     console.log("Submitting", editFormData);
//                     setIsModalOpen(false);
//                   }}
//                 >
//                   SUBMIT
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminTable;

"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import FloatingSearchContainer from "./ASearch";
import axios from "@/lib/axiosInstance"; // Updated axios instance

function AdminTable({ filters = {} }) {
  // Local component states
  const [modalContent, setModalContent] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  // New states for editing user
  const [currentEditingUser, setCurrentEditingUser] = useState(null);
  const [editFormData, setEditFormData] = useState({
    id: "",
    fullName: "",
    role: "",
    pages: [],
    status: "Active",
  });

  // Fetch data from the /Team endpoint on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/Team?pageNumber=1&pageSize=20", {
          timeout: 10000,
        });
        const teamData = response.data.data || [];

        // Format data for the table
        const formattedData = teamData.map((item) => ({
          id: item.user?.id || "N/A",
          fullName: item.user?.fullName || "N/A",
          role: item.title || "N/A",
          status: item.active ? "Active" : "Inactive",
          workplaces: [
            item.teamMgt && "Admin",
            item.transactionMgt && "Overview | Transactions",
            item.settlementnMgt && "Disbursements",
            item.appMgt && "Service Providers",
            item.customerMgt && "Complain Tickets",
          ]
            .filter(Boolean)
            .join(" | "),
        }));

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    fetchData();
  }, []);

  // Handler functions
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

  // Open edit modal using the table row headers to drive the form fields.
  const openEditModal = (user) => {
    setCurrentEditingUser(user);
    setEditFormData({
      id: user.id,
      fullName: user.fullName || "",
      role: user.role || "",
      pages: user.workplaces ? user.workplaces.split(" | ") : [],
      status: user.status || "Inactive",
    });
    setIsModalOpen(true);
  };

  // Define table columns using useMemo.
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
      { Header: "Admin ID", accessor: "id" },
      {
        Header: "Full Name",
        accessor: "fullName",
      },
      { Header: "Role", accessor: "role" },
      {
        Header: "Access (pages)",
        accessor: "workplaces",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => (
          <div className="flex items-center text-xs space-x-2">
            {value === "Active" ? (
              <FaCheckCircle className="text-green-700" size={13} />
            ) : (
              <TbAlertCircleFilled className="text-red-600" size={16} />
            )}
            <span>{value}</span>
          </div>
        ),
      },
    ],
    [selectedRows]
  );

  // (Optional) Filter data based on incoming filters.
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return (
        (!filters.status || row.status === filters.status) &&
        (!filters.role || row.role === filters.role)
      );
    });
  }, [data, filters]);

  // Setup react-table with pagination.
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
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    usePagination
  );

  return (
    <div className="text-xs space-y-5">
      <div>
        <FloatingSearchContainer onSelectAll={handleSelectAll} />
      </div>
      <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-300px)]">
        <table
          {...getTableProps()}
          className="min-w-full table-auto border-collapse border border-gray-200"
        >
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            {headerGroups.map((headerGroup) => {
              const { key, ...rest } = headerGroup.getHeaderGroupProps();
              return (
                <tr key={key} {...rest}>
                  {headerGroup.headers.map((column) => {
                    const { key: columnKey, ...columnRest } =
                      column.getHeaderProps();
                    return (
                      <th
                        key={columnKey}
                        {...columnRest}
                        className="border border-gray-300 px-2 py-2 text-left"
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
                  onClick={() => openEditModal(row.original)}
                  className="hover:bg-gray-50 hover:font-semibold"
                >
                  {row.cells.map((cell) => {
                    const { key: cellKey, ...cellProps } = cell.getCellProps();
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
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="px-1 py-1 border rounded-md bg-white text-gray-700"
          >
            {[5, 10].map((size) => (
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
          {Math.min((pageIndex + 1) * pageSize, filteredData.length)} of{" "}
          {filteredData.length}
        </div>
      </div>

      {/* Global Edit User Modal */}
      {isModalOpen && currentEditingUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
            <header className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Edit Admin</h3>
              <button
                className="text-gray-600"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </header>
            <form className="mt-4">
              {/* Admin ID (Read-Only) */}
              <div className="mb-4">
                <label className="block text-gray-700 text-xs mb-1">
                  Admin ID
                </label>
                <input
                  type="text"
                  value={editFormData.id}
                  disabled
                  className="w-full px-4 py-2 border rounded-md bg-gray-100 text-gray-600"
                />
              </div>
              {/* Full Name Input */}
              <div className="mb-4">
                <label className="block text-gray-700 text-xs mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={editFormData.fullName}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      fullName: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-md bg-gray-200"
                />
              </div>
              {/* Title Input (for Role) */}
              <div className="mb-4">
                <label className="block text-gray-700 text-xs mb-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Title"
                  value={editFormData.role}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      role: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-md bg-gray-200"
                />
              </div>
              {/* Access (pages) Checkboxes */}
              <div className="mb-4 bg-gray-200 rounded-md p-3">
                <div className="font-bold mb-2">Access (pages)</div>
                {[
                  "Overview",
                  "Transactions",
                  "Disbursements",
                  "Service Providers",
                  "Support Tickets",
                  "Admin Management",
                ].map((page) => (
                  <div className="flex items-center mb-2" key={page}>
                    <input
                      type="checkbox"
                      id={`access-${page.toLowerCase().replace(/\s+/g, "-")}`}
                      checked={editFormData.pages.includes(page)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setEditFormData({
                            ...editFormData,
                            pages: [...editFormData.pages, page],
                          });
                        } else {
                          setEditFormData({
                            ...editFormData,
                            pages: editFormData.pages.filter((p) => p !== page),
                          });
                        }
                      }}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={`access-${page
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="ml-2 text-gray-700 text-xs"
                    >
                      {page}
                    </label>
                  </div>
                ))}
              </div>
              {/* Status Selection Dropdown */}
              <div className="mb-4">
                <label className="block text-gray-700 text-xs mb-1">
                  Status
                </label>
                <select
                  value={editFormData.status}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      status: e.target.value,
                    })
                  }
                  className="w-full px-5 py-2 border rounded-md bg-gray-200"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              {/* Buttons */}
              <div className="flex space-x-2 text-sm">
                <button
                  type="button"
                  className="bg-gray-200 text-gray-600 px-6 py-2 rounded-sm w-full text-[10px]"
                  onClick={() => setIsModalOpen(false)}
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  className="bg-[#0052CC] text-white px-6 py-2 rounded-sm w-full text-[10px]"
                  onClick={() => {
                    // Submit logic here (e.g., API call with editFormData)
                    console.log("Submitting", editFormData);
                    setIsModalOpen(false);
                  }}
                >
                  SUBMIT
                </button>
              </div>
              {/* Deactivate Account Button */}
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-red-600 text-white px-6 py-2 rounded-sm w-full text-[10px]"
                  onClick={() => {
                    // Deactivate account logic here
                    console.log("Deactivating account", editFormData.id);
                    setIsModalOpen(false);
                  }}
                >
                  DEACTIVATE ACCOUNT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminTable;
