// import React, { useState, useEffect, useMemo } from "react";
// import { useTable, usePagination } from "react-table";
// import { FaCheckCircle } from "react-icons/fa";
// import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import axiosInstance from "@/lib/axiosInstance";
// import moment from "moment";

// const FundsweepTable = ({ appId }) => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [totalCount, setTotalCount] = useState(0);
//   const [totalPages, setTotalPages] = useState(0);

//   // Modal state
//   const [modalContent, setModalContent] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [initLoading, setInitLoading] = useState(false);
//   const [deleteLoading, setDeleteLoading] = useState(false);

//   // Fetch fundsweep data
//   useEffect(() => {
//     if (!appId) return;
//     setIsLoading(true);

//     axiosInstance
//       .get(`/Apps/Fundsweep/${appId}`, {
//         params: { pageNumber, pageSize },
//       })
//       .then((resp) => {
//         if (resp.data.isSuccess) {
//           setData(resp.data.data);
//           setTotalCount(resp.data.totalCount);
//           setTotalPages(resp.data.totalPages);
//         }
//       })
//       .catch((err) => console.error("Error fetching fundsweep:", err))
//       .finally(() => setIsLoading(false));
//   }, [appId, pageNumber, pageSize]);

//   // Table columns
//   const columns = useMemo(
//     () => [
//       { Header: "Sweep ID", accessor: "id" },
//       {
//         Header: "Amount",
//         accessor: "totalAmount",
//         Cell: ({ value }) => `₦${(value ?? 0).toLocaleString()}`,
//       },
//       { Header: "Commission", accessor: "blumenPayCommission" },
//       { Header: "Profit", accessor: "profit" },
//       { Header: "Fee Incurred", accessor: "feeIncured" },
//       {
//         Header: "Status",
//         accessor: "status",
//         Cell: ({ value }) => {
//           // normalize label to string
//           const label = value?.label ?? value ?? "";
//           let icon;
//           switch (label) {
//             case "Success":
//               icon = <FaCheckCircle className="text-green-500" size={14} />;
//               break;
//             case "Cancelled":
//               icon = <TbAlertCircleFilled className="text-red-500" size={14} />;
//               break;
//             case "Created":
//             case "Initiated":
//               icon = (
//                 <TbAlertCircleFilled className="text-yellow-600" size={14} />
//               );
//               break;
//             default:
//               icon = (
//                 <TbAlertCircleFilled className="text-gray-400" size={14} />
//               );
//           }
//           return (
//             <div className="flex items-center space-x-1">
//               {icon}
//               <span>{label}</span>
//             </div>
//           );
//         },
//       },
//       {
//         Header: "Created",
//         accessor: "createdAt",
//         Cell: ({ value }) => {
//           const now = moment();
//           const then = moment(value);
//           const mins = now.diff(then, "minutes");
//           if (mins < 60) return `${mins} mins ago`;
//           const hrs = now.diff(then, "hours");
//           if (hrs < 24) return `${hrs} hrs ago`;
//           return then.format("YYYY-MM-DD");
//         },
//       },
//       {
//         Header: "Action",
//         accessor: "action",
//         Cell: ({ row }) => (
//           <button
//             onClick={() => {
//               setModalContent(row.original);
//               setIsModalOpen(true);
//             }}
//             className="text-[#343A40] text-xs underline hover:text-blue-700"
//           >
//             View
//           </button>
//         ),
//       },
//     ],
//     []
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
//   } = useTable(
//     {
//       columns,
//       data,
//       initialState: { pageIndex: pageNumber - 1, pageSize },
//       manualPagination: true,
//       pageCount: totalPages,
//     },
//     usePagination
//   );

//   const handlePageChange = (newPage) => {
//     if (newPage < 1 || newPage > totalPages) return;
//     setPageNumber(newPage);
//     gotoPage(newPage - 1);
//   };

//   // Initialize FundSweep
//   const handleFundSweep = async () => {
//     setInitLoading(true);
//     try {
//       await axiosInstance.post("/Apps/FundSweep");
//     } catch (err) {
//       console.error("FundSweep error:", err);
//     } finally {
//       setInitLoading(false);
//       setIsModalOpen(false);
//     }
//   };

//   // Delete FundSweep
//   const handleDeleteFundSweep = async () => {
//     if (!modalContent) return;
//     setDeleteLoading(true);
//     try {
//       await axiosInstance.post(`/Apps/CancelFundSweep/${modalContent.id}`, {
//         provider: "string",
//         fundSweepId: modalContent.id,
//       });
//     } catch (err) {
//       console.error("Delete FundSweep error:", err);
//     } finally {
//       setDeleteLoading(false);
//       setIsModalOpen(false);
//     }
//   };

//   return (
//     <div className="space-y-5">
//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-md p-4 overflow-x-auto">
//         <table
//           {...getTableProps()}
//           className="min-w-full text-xs border border-gray-300 table-auto"
//         >
//           <thead className="bg-gray-100 text-gray-700 font-semibold">
//             {headerGroups.map((hg) => (
//               <tr {...hg.getHeaderGroupProps()} key={hg.id}>
//                 {hg.headers.map((col) => (
//                   <th
//                     {...col.getHeaderProps()}
//                     key={col.id}
//                     className="border border-gray-300 px-4 py-2 text-left"
//                   >
//                     {col.render("Header")}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody {...getTableBodyProps()}>
//             {isLoading
//               ? Array.from({ length: 5 }).map((_, idx) => (
//                   <tr key={idx} className="animate-pulse">
//                     {headerGroups[0].headers.map((_, ci) => (
//                       <td key={ci} className="border border-gray-300 px-4 py-2">
//                         <div className="h-4 bg-gray-300 rounded" />
//                       </td>
//                     ))}
//                   </tr>
//                 ))
//               : page.map((row) => {
//                   prepareRow(row);
//                   return (
//                     <tr
//                       {...row.getRowProps()}
//                       key={row.id}
//                       className="hover:bg-gray-50 hover:font-semibold"
//                     >
//                       {row.cells.map((cell) => (
//                         <td
//                           {...cell.getCellProps()}
//                           key={cell.column.id}
//                           className="border border-gray-300 px-4 py-2"
//                         >
//                           {cell.render("Cell")}
//                         </td>
//                       ))}
//                     </tr>
//                   );
//                 })}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex justify-between items-center text-xs p-4 bg-gray-50 border-t border-gray-300">
//           <div className="flex items-center space-x-2">
//             <span>Rows per page:</span>
//             <select
//               value={pageSize}
//               onChange={(e) => setPageSize(Number(e.target.value))}
//               className="border rounded px-1 py-1"
//             >
//               {[5, 10, 15].map((n) => (
//                 <option key={n} value={n}>
//                   {n}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={() => handlePageChange(pageNumber - 1)}
//               disabled={!canPreviousPage || pageNumber <= 1}
//               className="px-1 py-1 border rounded"
//             >
//               <IoMdArrowDropleft size={15} />
//             </button>
//             {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
//               <button
//                 key={item}
//                 onClick={() => handlePageChange(item)}
//                 className={`px-2 py-1 border rounded ${
//                   pageNumber === item
//                     ? "bg-black text-white"
//                     : "bg-white text-gray-700"
//                 }`}
//               >
//                 {item}
//               </button>
//             ))}
//             <button
//               onClick={() => handlePageChange(pageNumber + 1)}
//               disabled={!canNextPage || pageNumber >= totalPages}
//               className="px-1 py-1 border rounded"
//             >
//               <IoMdArrowDropright size={15} />
//             </button>
//           </div>
//           <div>
//             Showing {(pageNumber - 1) * pageSize + 1}–
//             {Math.min(pageNumber * pageSize, totalCount)} of {totalCount}
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && modalContent && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
//           <div className="bg-white rounded-lg p-6 w-1/2 space-y-6">
//             <h2 className="text-xl font-bold">FundSweep Details</h2>

//             <div className="text-sm text-gray-700 space-y-1">
//               <div>
//                 <strong>Sweep ID:</strong> {modalContent.id}
//               </div>
//               <div>
//                 <strong>Status:</strong>{" "}
//                 {(modalContent.status?.label ?? modalContent.status) || ""}
//               </div>
//               <div>
//                 <strong>Total:</strong> ₦
//                 {(modalContent.totalAmount || 0).toLocaleString()}
//               </div>
//               <div>
//                 <strong>Created:</strong>{" "}
//                 {moment(modalContent.createdAt).format("YYYY-MM-DD HH:mm")}
//               </div>
//             </div>

//             <div className="flex justify-end space-x-4">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
//               >
//                 Close
//               </button>

//               {(modalContent.status?.label ?? modalContent.status) ===
//                 "Created" && (
//                 <>
//                   <button
//                     onClick={handleFundSweep}
//                     disabled={initLoading}
//                     className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
//                   >
//                     {initLoading ? "Initializing…" : "FundSweep"}
//                   </button>

//                   <button
//                     onClick={handleDeleteFundSweep}
//                     disabled={deleteLoading}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
//                   >
//                     {deleteLoading ? "Deleting…" : "Delete FundSweep"}
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FundsweepTable;

import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { FaCheckCircle } from "react-icons/fa";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { TbAlertCircleFilled } from "react-icons/tb";
import axiosInstance from "@/lib/axiosInstance";
import moment from "moment";

const FundsweepTable = ({ appId }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Modal state
  const [modalContent, setModalContent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch fundsweep data
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
      .catch((err) => console.error("Error fetching fundsweep:", err))
      .finally(() => setIsLoading(false));
  }, [appId, pageNumber, pageSize]);

  // Table columns
  const columns = useMemo(
    () => [
      { Header: "Sweep ID", accessor: "id" },
      {
        Header: "Amount",
        accessor: "totalAmount",
        Cell: ({ value }) => `₦${(value ?? 0).toLocaleString()}`,
      },
      { Header: "Commission", accessor: "blumenPayCommission" },
      { Header: "Profit", accessor: "profit" },
      { Header: "Fee Incurred", accessor: "feeIncured" },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => {
          const label = value?.label ?? value ?? "";
          let icon;
          switch (label) {
            case "Success":
              icon = <FaCheckCircle className="text-green-500" size={14} />;
              break;
            case "Cancelled":
              icon = <TbAlertCircleFilled className="text-red-500" size={14} />;
              break;
            case "Created":
            case "Initiated":
              icon = (
                <TbAlertCircleFilled className="text-yellow-600" size={14} />
              );
              break;
            default:
              icon = (
                <TbAlertCircleFilled className="text-gray-400" size={14} />
              );
          }
          return (
            <div className="flex items-center space-x-1">
              {icon}
              <span>{label}</span>
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
            onClick={() => {
              setModalContent(row.original);
              setIsModalOpen(true);
            }}
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

  // Initialize FundSweep
  const handleFundSweep = async () => {
    setInitLoading(true);
    try {
      await axiosInstance.post("/Apps/FundSweep");
    } catch (err) {
      console.error("FundSweep error:", err);
    } finally {
      setInitLoading(false);
      setIsModalOpen(false);
    }
  };

  // Delete FundSweep
  const handleDeleteFundSweep = async () => {
    if (!modalContent) return;
    setDeleteLoading(true);
    try {
      await axiosInstance.post(`/Apps/CancelFundSweep/${modalContent.id}`, {
        provider: "string",
        fundSweepId: modalContent.id,
      });
    } catch (err) {
      console.error("Delete FundSweep error:", err);
    } finally {
      setDeleteLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-5">
      {/* Table */}
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((item) => (
              <button
                key={item}
                onClick={() => handlePageChange(item)}
                className={`px-2 py-1 border rounded ${
                  pageNumber === item
                    ? "bg-black text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {item}
              </button>
            ))}
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

      {/* Modal */}
      {isModalOpen && modalContent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-3/4 max-h-[90vh] overflow-y-auto space-y-6">
            <h2 className="text-xl font-bold">FundSweep Details</h2>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["ID", modalContent.id],
                    ["FundSweep Setup ID", modalContent.fundSweepSetupId],
                    ["App ID", modalContent.appId],
                    ["Reference Number", modalContent.referenceNumber],
                    ["Percentage", `${modalContent.percentage ?? 0}%`],
                    ["Bank Name", modalContent.bankName],
                    ["Account Number", modalContent.accountNumber],
                    [
                      "Status",
                      (modalContent.status?.label ?? modalContent.status) ||
                        "—",
                    ],
                    ["Generated By", modalContent.generatedBy],
                    ["Processed By", modalContent.processedBy],
                    [
                      "Total Amount",
                      `₦${(modalContent.totalAmount ?? 0).toLocaleString()}`,
                    ],
                    [
                      "Cash Total",
                      `₦${(modalContent.cashTotal ?? 0).toLocaleString()}`,
                    ],
                    [
                      "Online Total",
                      `₦${(modalContent.onlineTotal ?? 0).toLocaleString()}`,
                    ],
                    [
                      "Commission",
                      `₦${(
                        modalContent.blumenPayCommission ?? 0
                      ).toLocaleString()}`,
                    ],
                    [
                      "Amount Payable",
                      `₦${(modalContent.amountPayable ?? 0).toLocaleString()}`,
                    ],
                    [
                      "Fee Incurred",
                      `₦${(modalContent.feeIncured ?? 0).toLocaleString()}`,
                    ],
                    [
                      "Total Amount Deposited",
                      `₦${(
                        modalContent.totalAmountDeposited ?? 0
                      ).toLocaleString()}`,
                    ],
                    [
                      "Unresolved Amount",
                      `₦${(
                        modalContent.unresolvedAmount ?? 0
                      ).toLocaleString()}`,
                    ],
                    [
                      "Profit",
                      `₦${(modalContent.profit ?? 0).toLocaleString()}`,
                    ],
                    ["Cash Tx Count", modalContent.cashTransactionCount],
                    ["Online Tx Count", modalContent.onlineTransactionCount],
                    [
                      "Auto Processed",
                      modalContent.autoProcessed ? "Yes" : "No",
                    ],
                    [
                      "Highest Amount",
                      `₦${(modalContent.highestAmount ?? 0).toLocaleString()}`,
                    ],
                    [
                      "Lowest Amount",
                      `₦${(modalContent.lowestAmount ?? 0).toLocaleString()}`,
                    ],
                    [
                      "Window Start",
                      moment(modalContent.windowStartDate).format(
                        "MMM D, YYYY h:mm A"
                      ),
                    ],
                    [
                      "Window End",
                      moment(modalContent.windowEndDate).format(
                        "MMM D, YYYY h:mm A"
                      ),
                    ],
                  ].map(([label, value], idx) => (
                    <tr
                      key={idx}
                      className="border-t hover:bg-gray-50 hover:font-semibold"
                    >
                      <td className="border border-gray-300 px-4 py-2 font-bold">
                        {label}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {value ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>

              {(modalContent.status?.label ?? modalContent.status) ===
                "Created" && (
                <>
                  <button
                    onClick={handleFundSweep}
                    disabled={initLoading}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {initLoading ? "Initializing…" : "FundSweep"}
                  </button>

                  <button
                    onClick={handleDeleteFundSweep}
                    disabled={deleteLoading}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                  >
                    {deleteLoading ? "Deleting…" : "Cancel FundSweep"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundsweepTable;
