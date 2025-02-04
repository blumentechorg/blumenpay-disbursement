"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useTable, usePagination } from "react-table";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import FloatingSearchContainer from "./ASearch";

function AdminTable({ filters }) {
  // State for the fetched data
  const [data, setData] = useState([]);
  // Other state variables for modal and selection
  const [modalContent, setModalContent] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Fetch data from your API endpoint when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://blumenpay-1.onrender.com/Team"); // Change this to your endpoint URL
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const fetchedData = await response.json();
        // Ensure the fetched data is an array and that it has the expected fields
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

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

  // Define columns (same as before)
  const columns = useMemo(
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
      { Header: "Admin ID", accessor: "id" },
      { Header: "Full Name ", accessor: "fullname" },
      { Header: "Email", accessor: "email" },
      { Header: "Role", accessor: "role" },
      { Header: "Access(pages)", accessor: "access" },
      {
        Header: "Status ",
        accessor: "status",
        Cell: ({ value }) => (
          <div className="flex items-center text-xs space-x-2 ">
            {value === "Active" ? (
              <FaCheckCircle className="text-green-700" size={13} />
            ) : (
              <TbAlertCircleFilled className="text-red-600 " size={16} />
            )}
            <span>{value}</span>
          </div>
        ),
      },
      { Header: "Last Login", accessor: "login" },
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
                      onClick={() => {
                        setIsModalOpen(true); // Show modal
                        closeDropdown(); // Close dropdown
                      }}
                    >
                      Edit Admin
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        alert(`Edit ${row.original.id}`);
                        closeDropdown();
                      }}
                    >
                      Deactivate
                    </li>
                  </ul>
                </div>
              )}

              {isModalOpen && (
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
                      {/* Full Name Input */}
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
                      />

                      {/* Email Input */}
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full mb-4 px-4 py-2 border rounded-md bg-gray-200"
                      />

                      {/* Role Selection Dropdown */}
                      <select className="w-full mb-4 px-5 py-2 border rounded-md bg-gray-200">
                        <option value="" disabled selected>
                          Role
                        </option>
                        <option value="super_admin">Super Admin</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>

                      {/* Pages to Access Checkboxes */}
                      <div className="mb-4 bg-gray-200 rounded-md p-3">
                        <div className="font-bold mb-2">Pages to Access</div>
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
                              id={`access-${page
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                            />
                            <label
                              htmlFor={`access-${page
                                .toLowerCase()
                                .replace(/\s+/g, "-")}`}
                              className="ml-2 text-gray-700"
                            >
                              {page}
                            </label>
                          </div>
                        ))}
                      </div>

                      {/* Buttons */}
                      <div className="flex space-x-2 text-sm">
                        <button
                          className="bg-gray-200 text-gray-600 px-6 py-2 rounded-sm w-full text-[10px]"
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                        >
                          CANCEL
                        </button>
                        <button
                          className="bg-[#0052CC] text-white px-6 py-2 rounded-sm w-full text-[10px]"
                          type="button"
                        >
                          SUBMIT
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          );
        },
      },
    ],
    [selectedRows, isModalOpen]
  );

  // Use a memoized filteredData if you need to filter the data based on props
  // Adjust filter conditions to match your API data structure
  const filteredData = useMemo(() => {
    return data.filter((row) => {
      return (
        (!filters.status || row.status === filters.status) &&
        (!filters.role || row.role === filters.role)
      );
    });
  }, [data, filters]);

  // Set up react-table with the (possibly filtered) data
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
    </div>
  );
}

export default AdminTable;

// "use client";

// import React, { useMemo, useState, useEffect } from "react";
// import { useTable, usePagination } from "react-table";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { BsThreeDotsVertical } from "react-icons/bs";
// import { FaCheckCircle } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import FloatingSearchContainer from "./ASearch";
// import axios from "@/lib/axiosInstance"; // Ensure your axios instance is properly configured

// function AdminTable({ filters }) {
//   // Local component states
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [data, setData] = useState([]);

//   // Fetch data from /Team endpoint on mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("/Team");
//         // Adjust the following line based on the response structure.
//         // For example, if the users are in response.data.users use that.
//         const usersData = Array.isArray(response.data)
//           ? response.data
//           : response.data.users;
//         setData(usersData);
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

//   // Define columns with useMemo.
//   // Note: We include isModalOpen in the dependency array to satisfy ESLint.
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
//         accessor: (row) => row.fullName || row.fullname, // Adjust field name if needed
//       },
//       { Header: "Email", accessor: "email" },
//       { Header: "Role", accessor: "role" },
//       {
//         Header: "Access (pages)",
//         accessor: (row) => {
//           // If your user data includes permission flags, you could
//           // build a string listing the pages the user can access.
//           // For example:
//           const pages = [];
//           if (row.teamMgt) pages.push("Admin");
//           if (row.transactionMgt) pages.push("Overview, Transactions");
//           if (row.settlementnMgt) pages.push("Disbursements");
//           if (row.appMgt) pages.push("Service Providers");
//           if (row.customerMgt) pages.push("Complain Tickets");
//           return pages.join(" | ");
//         },
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
//       { Header: "Last Login", accessor: "login" },
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
//                         alert(`Edit ${row.original.id}`);
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

//   // Filter data based on filters (adjust field names as needed)
//   const filteredData = useMemo(() => {
//     return data.filter((row) => {
//       return (
//         (!filters.paymentMethod ||
//           row.paymentMethod === filters.paymentMethod) &&
//         (!filters.status || row.status === filters.status) &&
//         (!filters.serviceProvider ||
//           row.serviceProvider === filters.serviceProvider) &&
//         (!filters.date ||
//           (row.scheduleDate && row.scheduleDate.includes(filters.date)))
//       );
//     });
//   }, [data, filters]);

//   // Setup react-table
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
//     </div>
//   );
// }

// export default AdminTable;
