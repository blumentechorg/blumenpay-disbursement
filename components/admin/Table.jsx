// "use client";

// import React, { useMemo, useState, useEffect } from "react";
// import { useTable, usePagination } from "react-table";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
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
//   const [searchQuery, setSearchQuery] = useState("");
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
//     ],
//     [selectedRows]
//   );

//   // (Optional) Filter data based on incoming filters.

//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       const matchesSearch =
//         row.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         row.role.toLowerCase().includes(searchQuery.toLowerCase());
//       return (
//         (!filters.status || row.status === filters.status) &&
//         (!filters.role || row.role === filters.role) &&
//         matchesSearch
//       );
//     });
//   }, [data, filters, searchQuery]);

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
//         <FloatingSearchContainer
//           onSelectAll={handleSelectAll}
//           onSearchChange={setSearchQuery}
//         />
//       </div>
//       <div className="bg-white rounded-lg cursor-pointer shadow-md p-4 overflow-x-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-300px)]">
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
//               {/* Title Input (for Role) */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs mb-1">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Title"
//                   value={editFormData.role}
//                   onChange={(e) =>
//                     setEditFormData({
//                       ...editFormData,
//                       role: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-2 border rounded-md bg-gray-200"
//                 />
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
//               {/* Deactivate Account Button */}
//               <div className="mt-4">
//                 <button
//                   type="button"
//                   className="bg-red-600 text-white px-6 py-2 rounded-sm w-full text-[10px]"
//                   onClick={() => {
//                     // Deactivate account logic here
//                     console.log("Deactivating account", editFormData.id);
//                     setIsModalOpen(false);
//                   }}
//                 >
//                   DELETE ACCOUNT
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
// import { FaCheckCircle } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import FloatingSearchContainer from "./ASearch";
// import axios from "@/lib/axiosInstance"; // Updated axios instance
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function AdminTable({ filters = {} }) {
//   // Local component states
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
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
//     ],
//     [selectedRows]
//   );

//   // (Optional) Filter data based on incoming filters.
//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       const matchesSearch =
//         row.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         row.role.toLowerCase().includes(searchQuery.toLowerCase());
//       return (
//         (!filters.status || row.status === filters.status) &&
//         (!filters.role || row.role === filters.role) &&
//         matchesSearch
//       );
//     });
//   }, [data, filters, searchQuery]);

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

//   // ----------- Edit User Form Functions (Only adjusting the edit user form) -----------
//   const handleUpdateUser = async () => {
//     // Build payload for PATCH /Team
//     const payload = {
//       id: editFormData.id,
//       title: editFormData.role,
//       teamMgt: editFormData.pages.includes("Admin Management"),
//       appMgt: editFormData.pages.includes("Service Providers"),
//       customerMgt: editFormData.pages.includes("Support Tickets"),
//       transactionMgt: editFormData.pages.includes("Transactions"),
//       settlementnMgt: editFormData.pages.includes("Disbursements"),
//     };
//     try {
//       const response = await axios.patch("/Team", payload);
//       if (response?.data) {
//         toast.success("User updated successfully!");
//       }
//     } catch (error) {
//       toast.error("Failed to update user.");
//     }
//     setIsModalOpen(false);
//   };

//   const handleToggleAccountStatus = async () => {
//     try {
//       if (editFormData.status === "Active") {
//         // Call disable endpoint
//         const response = await axios.patch(`/Team/Disable/${editFormData.id}`);
//         if (response?.data?.isSuccess) {
//           toast.success(response.data.message);
//         }
//       } else {
//         // Call enable endpoint
//         const response = await axios.patch(`/Team/Enable/${editFormData.id}`);
//         if (response?.data?.isSuccess) {
//           toast.success(response.data.message);
//         }
//       }
//     } catch (error) {
//       toast.error("Failed to update account status.");
//     }
//     setIsModalOpen(false);
//   };
//   // -------------------------------------------------------------------------------------

//   return (
//     <div className="text-xs space-y-5">
//       <div>
//         <FloatingSearchContainer
//           onSelectAll={handleSelectAll}
//           onSearchChange={setSearchQuery}
//         />
//       </div>
//       <div className="bg-white rounded-lg cursor-pointer shadow-md p-4 overflow-x-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-300px)]">
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
//               {/* Title Input (for Role) */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs mb-1">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Title"
//                   value={editFormData.role}
//                   onChange={(e) =>
//                     setEditFormData({
//                       ...editFormData,
//                       role: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-2 border rounded-md bg-gray-200"
//                 />
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
//                   onClick={handleUpdateUser}
//                 >
//                   SUBMIT
//                 </button>
//               </div>
//               {/* Disable/Enable Account Button */}
//               <div className="mt-4">
//                 <button
//                   type="button"
//                   className="bg-red-600 text-white px-6 py-2 rounded-sm w-full text-[10px]"
//                   onClick={handleToggleAccountStatus}
//                 >
//                   {editFormData.status === "Active"
//                     ? "DISABLE ACCOUNT"
//                     : "ENABLE ACCOUNT"}
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
// import { FaCheckCircle } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import FloatingSearchContainer from "./ASearch";
// import axios from "@/lib/axiosInstance"; // Updated axios instance
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function AdminTable({ filters = {} }) {
//   // Local component states
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [data, setData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
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
//     ],
//     [selectedRows]
//   );

//   // (Optional) Filter data based on incoming filters.
//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       const matchesSearch =
//         row.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         row.role.toLowerCase().includes(searchQuery.toLowerCase());
//       return (
//         (!filters.status || row.status === filters.status) &&
//         (!filters.role || row.role === filters.role) &&
//         matchesSearch
//       );
//     });
//   }, [data, filters, searchQuery]);

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

//   // ----------- Edit User Form Functions (Only adjusting the edit user form) -----------
//   const handleUpdateUser = async () => {
//     // Build payload for PATCH /Team
//     const payload = {
//       id: editFormData.id,
//       title: editFormData.role,
//       teamMgt: editFormData.pages.includes("Admin Management"),
//       appMgt: editFormData.pages.includes("Service Providers"),
//       customerMgt: editFormData.pages.includes("Support Tickets"),
//       transactionMgt: editFormData.pages.includes("Transactions"),
//       settlementnMgt: editFormData.pages.includes("Disbursements"),
//     };
//     try {
//       const response = await axios.patch("/Team", payload);
//       if (response?.data) {
//         toast.success("User updated successfully!");
//       }
//     } catch (error) {
//       toast.error("Failed to update user.");
//     }
//     setIsModalOpen(false);
//   };

//   const handleToggleAccountStatus = async () => {
//     try {
//       if (editFormData.status === "Active") {
//         // Call disable endpoint using PATCH
//         const response = await axios.patch(`/Team/Disable/${editFormData.id}`);
//         if (response?.data?.isSuccess) {
//           toast.success(response.data.message);
//         }
//       } else {
//         // Call enable endpoint using PATCH
//         const response = await axios.patch(`/Team/Enable/${editFormData.id}`);
//         if (response?.data?.isSuccess) {
//           toast.success(response.data.message);
//         }
//       }
//     } catch (error) {
//       toast.error("Failed to update account status.");
//     }
//     setIsModalOpen(false);
//   };

//   const handleRemoveAccount = async () => {
//     try {
//       // Call remove endpoint using DELETE
//       const response = await axios.delete(`/Team/Remove/${editFormData.id}`);
//       if (response?.data?.isSuccess) {
//         toast.success(response.data.message || "Account successfully removed.");
//       } else {
//         toast.error("Failed to remove account.");
//       }
//     } catch (error) {
//       toast.error("Failed to remove account.");
//     }
//     setIsModalOpen(false);
//   };
//   // -------------------------------------------------------------------------------------

//   return (
//     <div className="text-xs space-y-5">
//       <div>
//         <FloatingSearchContainer
//           onSelectAll={handleSelectAll}
//           onSearchChange={setSearchQuery}
//         />
//       </div>
//       <div className="bg-white rounded-lg cursor-pointer shadow-md p-4 overflow-x-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-300px)]">
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
//               {/* Title Input (for Role) */}
//               <div className="mb-4">
//                 <label className="block text-gray-700 text-xs mb-1">
//                   Title
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Title"
//                   value={editFormData.role}
//                   onChange={(e) =>
//                     setEditFormData({
//                       ...editFormData,
//                       role: e.target.value,
//                     })
//                   }
//                   className="w-full px-4 py-2 border rounded-md bg-gray-200"
//                 />
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
//                   onClick={handleUpdateUser}
//                 >
//                   SUBMIT
//                 </button>
//               </div>
//               {/* Disable/Enable Account Button */}
//               <div className="mt-4">
//                 <button
//                   type="button"
//                   className="bg-red-600 text-white px-6 py-2 rounded-sm w-full text-[10px]"
//                   onClick={handleToggleAccountStatus}
//                 >
//                   {editFormData.status === "Active"
//                     ? "DISABLE ACCOUNT"
//                     : "ENABLE ACCOUNT"}
//                 </button>
//               </div>
//               {/* Remove Account Button */}
//               <div className="mt-4">
//                 <button
//                   type="button"
//                   className="bg-red-600 text-white px-6 py-2 rounded-sm w-full text-[10px]"
//                   onClick={handleRemoveAccount}
//                 >
//                   DELETE ACCOUNT
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
import { FaCheckCircle } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import FloatingSearchContainer from "./ASearch";
import axios from "@/lib/axiosInstance"; // Updated axios instance
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AdminTable({ filters = {} }) {
  // Local component states
  const [modalContent, setModalContent] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
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
      const matchesSearch =
        row.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        row.role.toLowerCase().includes(searchQuery.toLowerCase());
      return (
        (!filters.status || row.status === filters.status) &&
        (!filters.role || row.role === filters.role) &&
        matchesSearch
      );
    });
  }, [data, filters, searchQuery]);

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

  // ----------- Edit User Form Functions (Only adjusting the edit user form) -----------
  const handleUpdateUser = async () => {
    // Build payload for PATCH /Team
    const payload = {
      id: editFormData.id,
      title: editFormData.role,
      teamMgt: editFormData.pages.includes("Admin Management"),
      appMgt: editFormData.pages.includes("Service Providers"),
      customerMgt: editFormData.pages.includes("Support Tickets"),
      transactionMgt: editFormData.pages.includes("Transactions"),
      settlementnMgt: editFormData.pages.includes("Disbursements"),
    };
    try {
      const response = await axios.patch("/Team", payload);
      if (response?.data) {
        toast.success("User updated successfully!");
        // Update the table data locally to reflect the changes
        const updatedWorkplaces = [
          editFormData.pages.includes("Admin Management") ? "Admin" : null,
          editFormData.pages.includes("Transactions")
            ? "Overview | Transactions"
            : null,
          editFormData.pages.includes("Disbursements") ? "Disbursements" : null,
          editFormData.pages.includes("Service Providers")
            ? "Service Providers"
            : null,
          editFormData.pages.includes("Support Tickets")
            ? "Complain Tickets"
            : null,
        ]
          .filter(Boolean)
          .join(" | ");
        setData((prevData) =>
          prevData.map((row) =>
            row.id === editFormData.id
              ? {
                  ...row,
                  fullName: editFormData.fullName,
                  role: editFormData.role,
                  workplaces: updatedWorkplaces,
                }
              : row
          )
        );
      }
    } catch (error) {
      toast.error("Failed to update user.");
    }
    setIsModalOpen(false);
  };

  const handleToggleAccountStatus = async () => {
    try {
      if (editFormData.status === "Active") {
        // Disable account using PATCH
        const response = await axios.patch(`/Team/Disable/${editFormData.id}`);
        if (response?.data?.isSuccess) {
          toast.success(response.data.message);
          // Update status locally to "Inactive"
          setData((prevData) =>
            prevData.map((row) =>
              row.id === editFormData.id ? { ...row, status: "Inactive" } : row
            )
          );
          setEditFormData((prev) => ({ ...prev, status: "Inactive" }));
        }
      } else {
        // Enable account using PATCH
        const response = await axios.patch(`/Team/Enable/${editFormData.id}`);
        if (response?.data?.isSuccess) {
          toast.success(response.data.message);
          // Update status locally to "Active"
          setData((prevData) =>
            prevData.map((row) =>
              row.id === editFormData.id ? { ...row, status: "Active" } : row
            )
          );
          setEditFormData((prev) => ({ ...prev, status: "Active" }));
        }
      }
    } catch (error) {
      toast.error("Failed to update account status.");
    }
    setIsModalOpen(false);
  };

  const handleRemoveAccount = async () => {
    try {
      // Remove account using DELETE
      const response = await axios.delete(`/Team/Remove/${editFormData.id}`);
      if (response?.data?.isSuccess) {
        toast.success(response.data.message || "Account successfully removed.");
        // Remove the deleted row from local state
        setData((prevData) =>
          prevData.filter((row) => row.id !== editFormData.id)
        );
      } else {
        toast.error("Failed to remove account.");
      }
    } catch (error) {
      toast.error("Failed to remove account.");
    }
    setIsModalOpen(false);
  };
  // -------------------------------------------------------------------------------------

  return (
    <div className="text-xs space-y-5">
      <div>
        <FloatingSearchContainer
          onSelectAll={handleSelectAll}
          onSearchChange={setSearchQuery}
        />
      </div>
      <div className="bg-white rounded-lg cursor-pointer shadow-md p-4 overflow-x-auto max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-300px)]">
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
                  onClick={handleUpdateUser}
                >
                  SUBMIT
                </button>
              </div>
              {/* Disable/Enable Account Button */}
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-red-600 text-white px-6 py-2 rounded-sm w-full text-[10px]"
                  onClick={handleToggleAccountStatus}
                >
                  {editFormData.status === "Active"
                    ? "DISABLE ACCOUNT"
                    : "ENABLE ACCOUNT"}
                </button>
              </div>
              {/* Remove Account Button */}
              <div className="mt-4">
                <button
                  type="button"
                  className="bg-red-600 text-white px-6 py-2 rounded-sm w-full text-[10px]"
                  onClick={handleRemoveAccount}
                >
                  DELETE ACCOUNT
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
