// "use client";

// import React, { useState, useEffect, useMemo } from "react";
// import { useTable, usePagination } from "react-table";
// import { FaCheckCircle } from "react-icons/fa";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import TransactionModal from "./Modal";
// import axiosInstance from "@/lib/axiosInstance";
// import moment from "moment";
// import Link from "next/link";

// const ActivityTable = ({ searchQuery = "" }) => {
//   const [modalContent, setModalContent] = useState(null);
//   const [selectedRows, setSelectedRows] = useState({});
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // Pagination states (1-indexed)
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(15);
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   // Fetch data without any external filters, but now with search query if provided.
//   useEffect(() => {
//     setIsLoading(true);
//     // Append search parameter if searchQuery is not empty.
//     const query = `/Transaction?pageNumber=${pageNumber}&pageSize=${pageSize}${
//       searchQuery ? `&search=${searchQuery}` : ""
//     }`;
//     axiosInstance
//       .get(query)
//       .then((response) => {
//         setData(response.data.data);
//         setTotalCount(response.data.totalCount);
//         setTotalPages(
//           response.data.totalPages ||
//             Math.ceil(response.data.totalCount / pageSize)
//         );
//       })
//       .catch((error) => {
//         console.error("Error fetching transactions:", error);
//       })
//       .finally(() => setIsLoading(false));
//   }, [pageNumber, pageSize, searchQuery]);

//   const finalData = data;
//   const dynamicTotalCount = totalCount;
//   const dynamicTotalPages = totalPages;

//   const columns = useMemo(
//     () => [
//       // {
//       //   Header: "",
//       //   accessor: "checkbox",
//       //   Cell: ({ row }) => (
//       //     <input
//       //       type="checkbox"
//       //       onClick={(e) => e.stopPropagation()}
//       //       checked={selectedRows[row.original.id] || false}
//       //       onChange={() =>
//       //         setSelectedRows((prev) => ({
//       //           ...prev,
//       //           [row.original.id]: !prev[row.original.id],
//       //         }))
//       //       }
//       //     />
//       //   ),
//       // },
//       {
//         Header: "Business",
//         accessor: "app.name",
//         Cell: ({ value }) => value || "N/A",
//       },
//       { Header: "Reference Number", accessor: "referenceNumber" },
//       { Header: "Provider", accessor: "provider" },
//       {
//         Header: "Amount",
//         accessor: "amount",
//         Cell: ({ value }) => `₦${value.toLocaleString()}`,
//       },
//       { Header: "Fee", accessor: "fee" },
//       {
//         Header: "Type",
//         accessor: "type",
//         Cell: ({ value }) => (value ? value.label : ""),
//       },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => {
//           let icon;
//           switch (value.label) {
//             case "Success":
//               icon = <FaCheckCircle className="text-green-500" size={14} />;
//               break;
//             case "Pending":
//               icon = (
//                 <TbAlertCircleFilled className="text-yellow-600" size={14} />
//               );
//               break;
//             case "Failed":
//               icon = <TbAlertCircleFilled className="text-red-500" size={14} />;
//               break;
//             default:
//               icon = null;
//           }
//           return (
//             <div className="flex items-center space-x-2">
//               {icon}
//               <span>{value.label}</span>
//             </div>
//           );
//         },
//       },
//       {
//         Header: "Created At",
//         accessor: "createdAt",
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
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => (
//           <Link
//             href="/Explore/transactions/all"
//             className="text-[#343A40] text-xs underline hover:text-blue-700"
//           >
//             View
//           </Link>
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
//       pageCount: dynamicTotalPages,
//     },
//     usePagination
//   );

//   const handlePageChange = (newPageNumber) => {
//     if (newPageNumber < 1 || newPageNumber > dynamicTotalPages) return;
//     setPageNumber(newPageNumber);
//     gotoPage(newPageNumber - 1);
//   };

//   const getPaginationItems = () => {
//     if (dynamicTotalPages <= 8) {
//       return Array.from({ length: dynamicTotalPages }, (_, i) => i + 1);
//     }
//     const rightGroup = [
//       dynamicTotalPages - 2,
//       dynamicTotalPages - 1,
//       dynamicTotalPages,
//     ];
//     let leftGroup = [];
//     if (pageNumber <= 5) {
//       leftGroup = [1, 2, 3, 4, 5];
//     } else if (pageNumber > dynamicTotalPages - 7) {
//       leftGroup = [];
//       for (let i = dynamicTotalPages - 7; i <= dynamicTotalPages - 3; i++) {
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

//   return (
//     <div className="w-full max-w-[90vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1200px] ">
//       <div className="space-y-5 ">
//         <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
//           <table
//             {...getTableProps()}
//             className="min-w-full text-xs border-collapse border border-gray-300 rounded-lg table-auto"
//           >
//             <thead className="bg-gray-100 text-gray-700 font-semibold">
//               {headerGroups.map((headerGroup) => {
//                 const { key, ...rest } = headerGroup.getHeaderGroupProps();
//                 return (
//                   <tr key={key} {...rest} className="block sm:table-row">
//                     {headerGroup.headers.map((column) => {
//                       const { key: columnKey, ...columnRest } =
//                         column.getHeaderProps();
//                       return (
//                         <th
//                           key={columnKey}
//                           {...columnRest}
//                           className={`border border-gray-300 px-4 py-2 text-left ${
//                             column.className || ""
//                           }`}
//                         >
//                           {column.render("Header")}
//                         </th>
//                       );
//                     })}
//                   </tr>
//                 );
//               })}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {isLoading
//                 ? Array.from({ length: 5 }).map((_, index) => (
//                     <tr key={index} className="animate-pulse">
//                       {headerGroups[0].headers.map((_, colIndex) => (
//                         <td
//                           key={colIndex}
//                           className="border border-gray-300 px-4 py-2"
//                         >
//                           <div className="h-4 bg-gray-300 rounded"></div>
//                         </td>
//                       ))}
//                     </tr>
//                   ))
//                 : page.map((row) => {
//                     prepareRow(row);
//                     const { key, ...rowProps } = row.getRowProps();
//                     return (
//                       <tr
//                         key={key}
//                         {...rowProps}
//                         className="hover:bg-gray-50 hover:font-semibold block sm:table-row"
//                       >
//                         {row.cells.map((cell) => {
//                           const { key: cellKey, ...cellProps } =
//                             cell.getCellProps();
//                           return (
//                             <td
//                               key={cellKey}
//                               {...cellProps}
//                               className={`border border-gray-300 px-4 py-2 block sm:table-cell ${
//                                 cell.column.className || ""
//                               }`}
//                               data-label={cell.column.Header}
//                             >
//                               {cell.render("Cell")}
//                             </td>
//                           );
//                         })}
//                       </tr>
//                     );
//                   })}
//             </tbody>
//           </table>
//           <div className="flex flex-col sm:flex-row justify-between text-xs items-center p-4 bg-gray-50 border-t border-gray-300 space-y-2 sm:space-y-0">
//             <div className="flex items-center space-x-2">
//               <span className="text-gray-700">Rows per page:</span>
//               <select
//                 value={pageSize}
//                 onChange={(e) => setPageSize(Number(e.target.value))}
//                 className="px-1 py-1 border rounded-md bg-white text-gray-700"
//               >
//                 {[5, 10, 15].map((size) => (
//                   <option key={size} value={size}>
//                     {size}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="flex items-center space-x-2">
//               <button
//                 onClick={() => handlePageChange(pageNumber - 1)}
//                 disabled={!canPreviousPage || pageNumber <= 1}
//                 className={`px-1 py-1 border rounded-md ${
//                   !canPreviousPage || pageNumber <= 1
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     : "bg-black text-white hover:bg-gray-100"
//                 }`}
//               >
//                 <IoMdArrowDropleft size={15} />
//               </button>
//               {paginationItems.map((item, index) =>
//                 item === "ellipsis" ? (
//                   <span key={index} className="px-2 py-1">
//                     ...
//                   </span>
//                 ) : (
//                   <button
//                     key={index}
//                     onClick={() => handlePageChange(item)}
//                     className={`px-2 py-1 border rounded-md ${
//                       pageNumber === item
//                         ? "bg-black text-white"
//                         : "bg-white text-gray-700 hover:bg-gray-100"
//                     }`}
//                   >
//                     {item}
//                   </button>
//                 )
//               )}
//               <button
//                 onClick={() => handlePageChange(pageNumber + 1)}
//                 disabled={!canNextPage || pageNumber >= dynamicTotalPages}
//                 className={`px-1 py-1 border rounded-md ${
//                   !canNextPage || pageNumber >= dynamicTotalPages
//                     ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     : "bg-black text-white hover:bg-gray-100"
//                 }`}
//               >
//                 <IoMdArrowDropright size={15} />
//               </button>
//             </div>
//             <div className="text-gray-600">
//               Showing {(pageNumber - 1) * pageSize + 1}-
//               {Math.min(pageNumber * pageSize, dynamicTotalCount)} of{" "}
//               {dynamicTotalCount}
//             </div>
//           </div>
//         </div>
//         <TransactionModal
//           modalContent={modalContent}
//           onClose={() => setModalContent(null)}
//         />
//       </div>
//     </div>
//   );
// };

// export default ActivityTable;

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";
import TransactionModal from "./Modal";
import axiosInstance from "@/lib/axiosInstance";
import moment from "moment";
import Link from "next/link";

const ActivityTable = ({ searchQuery = "" }) => {
  const [modalContent, setModalContent] = useState(null);
  const [selectedRows, setSelectedRows] = useState({});
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Pagination states (1-indexed)
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Fetch data (append search param if needed)
  useEffect(() => {
    setIsLoading(true);
    const query = `/Transaction?pageNumber=${pageNumber}&pageSize=${pageSize}${
      searchQuery ? `&search=${searchQuery}` : ""
    }`;
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
  }, [pageNumber, pageSize, searchQuery]);

  const finalData = data;
  const dynamicTotalCount = totalCount;
  const dynamicTotalPages = totalPages;

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
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <Link
            href="/Explore/transactions/all"
            className="text-[#343A40] text-xs underline hover:text-blue-700"
          >
            View
          </Link>
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
      pageCount: dynamicTotalPages,
    },
    usePagination
  );

  const handlePageChange = (newPageNumber) => {
    if (newPageNumber < 1 || newPageNumber > dynamicTotalPages) return;
    setPageNumber(newPageNumber);
    gotoPage(newPageNumber - 1);
  };

  const getPaginationItems = () => {
    if (dynamicTotalPages <= 8) {
      return Array.from({ length: dynamicTotalPages }, (_, i) => i + 1);
    }
    const rightGroup = [
      dynamicTotalPages - 2,
      dynamicTotalPages - 1,
      dynamicTotalPages,
    ];
    let leftGroup = [];
    if (pageNumber <= 5) {
      leftGroup = [1, 2, 3, 4, 5];
    } else if (pageNumber > dynamicTotalPages - 7) {
      leftGroup = [];
      for (let i = dynamicTotalPages - 7; i <= dynamicTotalPages - 3; i++) {
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

  return (
    <div className="w-full max-w-[90vw] sm:max-w-[600px] md:max-w-full">
      <div className="space-y-5">
        <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
          <table
            {...getTableProps()}
            className="min-w-full text-xs border-collapse border border-gray-300 rounded-lg table-auto"
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
                        className="hover:bg-gray-50 hover:font-semibold"
                      >
                        {row.cells.map((cell) => {
                          const { key: cellKey, ...cellProps } =
                            cell.getCellProps();
                          return (
                            <td
                              key={cellKey}
                              {...cellProps}
                              className={`border border-gray-300 px-4 py-2 ${
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
                {[5, 10, 15].map((size) => (
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
                disabled={!canNextPage || pageNumber >= dynamicTotalPages}
                className={`px-1 py-1 border rounded-md ${
                  !canNextPage || pageNumber >= dynamicTotalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-gray-100"
                }`}
              >
                <IoMdArrowDropright size={15} />
              </button>
            </div>

            <div className="text-gray-600">
              Showing {(pageNumber - 1) * pageSize + 1}-
              {Math.min(pageNumber * pageSize, dynamicTotalCount)} of{" "}
              {dynamicTotalCount}
            </div>
          </div>
        </div>

        <TransactionModal
          modalContent={modalContent}
          onClose={() => setModalContent(null)}
        />
      </div>
    </div>
  );
};

export default ActivityTable;
