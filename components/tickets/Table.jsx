// "use client";

// import React from "react";

// const TicketTable = ({ filters }) => {
//   const data = [
//     {
//       id: "#12345",
//       provider: "KAEDC",
//       subject: "Payment Not Processed",
//       priority: "High",
//       date: "2025-11-07T11:43",
//       status: "Resolved",
//       admin: "Not Assigned",
//     },
//     {
//       id: "#12345",
//       provider: "Gro Solar",
//       subject: "Login Issues",
//       priority: "Medium",
//       date: "2025-11-07T11:15",
//       status: "Opened",
//       admin: "Not Assigned",
//     },
//     {
//       id: "#12345",
//       provider: "Switch Box",
//       subject: "Account Hacked",
//       priority: "Critical",
//       date: "2025-11-07T11:15",
//       status: "InProgress",
//       admin: "Not Assigned",
//     },
//     {
//       id: "#12345",
//       provider: "Amaltech Store",
//       subject: "Login Issues",
//       priority: "Low",
//       date: "2025-11-07T11:15",
//       status: "Opened",
//       admin: "Not Assigned",
//     },
//     {
//       id: "#12345",
//       provider: "VAT Account",
//       subject: "Login Issues",
//       priority: "Low",
//       date: "2025-11-07T11:15",
//       status: "Resolved",
//       admin: "Not Assigned",
//     },
//   ];

//   const filtered = data.filter((item) => {
//     return (
//       (!filters.status || item.status === filters.status) &&
//       (!filters.priority || item.priority === filters.priority) &&
//       (!filters.assignedTo || item.admin === filters.assignedTo) &&
//       (!filters.date || item.date.startsWith(filters.date))
//     );
//   });

//   return (
//     <div className="overflow-x-auto bg-white rounded-lg shadow border">
//       <table className="min-w-full divide-y divide-gray-200 text-sm">
//         <thead className="bg-gray-100 text-left">
//           <tr>
//             <th className="px-4 py-2">Ticket ID</th>
//             <th className="px-4 py-2">Provider Name</th>
//             <th className="px-4 py-2">Subject</th>
//             <th className="px-4 py-2">Priority</th>
//             <th className="px-4 py-2">Date</th>
//             <th className="px-4 py-2">Status</th>
//             <th className="px-4 py-2">Admin</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100">
//           {filtered.map((item, index) => (
//             <tr key={index} className="hover:bg-gray-50">
//               <td className="px-4 py-2">{item.id}</td>
//               <td className="px-4 py-2">{item.provider}</td>
//               <td className="px-4 py-2">{item.subject}</td>
//               <td className="px-4 py-2">
//                 <span
//                   className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                     item.priority === "High"
//                       ? "bg-yellow-500"
//                       : item.priority === "Medium"
//                       ? "bg-blue-500"
//                       : item.priority === "Critical"
//                       ? "bg-red-600"
//                       : "bg-green-500"
//                   }`}
//                 ></span>
//                 {item.priority}
//               </td>
//               <td className="px-4 py-2">
//                 {new Date(item.date).toLocaleTimeString([], {
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}{" "}
//                 -{" "}
//                 {new Date(item.date).toLocaleDateString("en-US", {
//                   month: "short",
//                   day: "numeric",
//                 })}
//               </td>
//               <td className="px-4 py-2">{item.status}</td>
//               <td className="px-4 py-2">{item.admin}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {filtered.length === 0 && (
//         <div className="p-4 text-center text-gray-500">No tickets found</div>
//       )}
//     </div>
//   );
// };

// export default TicketTable;

// // components/DataTable.jsx
// export default function DataTable({ data }) {
//   return (
//     <div className="overflow-x-auto bg-white rounded-lg shadow mt-4">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-4 py-2 text-left">
//               <input type="checkbox" />
//             </th>
//             {[
//               "Ticket ID",
//               "Provider Name",
//               "Subject",
//               "Priority",
//               "Date",
//               "Status",
//               "Admin",
//               "",
//             ].map((col) => (
//               <th
//                 key={col}
//                 className="px-4 py-2 text-left text-sm font-medium text-gray-600"
//               >
//                 {col}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100">
//           {data.map((row, i) => (
//             <tr key={i} className="hover:bg-gray-50">
//               <td className="px-4 py-2">
//                 <input type="checkbox" />
//               </td>
//               <td className="px-4 py-2 text-sm font-medium">{row.id}</td>
//               <td className="px-4 py-2 text-sm">{row.provider}</td>
//               <td className="px-4 py-2 text-sm">{row.subject}</td>
//               <td className="px-4 py-2 text-sm">
//                 <span
//                   className={`px-2 py-1 rounded-full text-xs ${
//                     row.priority === "High"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : row.priority === "Medium"
//                       ? "bg-blue-100 text-blue-800"
//                       : row.priority === "Critical"
//                       ? "bg-red-100 text-red-800"
//                       : "bg-green-100 text-green-800"
//                   }`}
//                 >
//                   {row.priority}
//                 </span>
//               </td>
//               <td className="px-4 py-2 text-sm">{row.date}</td>
//               <td className="px-4 py-2 text-sm">{row.status}</td>
//               <td className="px-4 py-2 text-sm">
//                 {row.admin || "Not Assigned"}
//               </td>
//               <td className="px-4 py-2 text-sm text-gray-400">⋮</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="flex items-center justify-between px-4 py-3 bg-gray-50">
//         <div className="text-sm">Showing {data.length} of 100</div>
//         <div className="space-x-1">
//           <button className="px-3 py-1 rounded border">1</button>
//           <button className="px-3 py-1 rounded border">2</button>
//           <button className="px-3 py-1 rounded border">3</button>
//           <button className="px-3 py-1 rounded border">4</button>
//         </div>
//         <div className="text-sm">
//           Show Rows
//           <select className="ml-2 border rounded p-1 text-sm">
//             {[7, 10, 20].map((n) => (
//               <option key={n}>{n}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React, { useState, useMemo } from "react";
import FloatingContainer from "./CSearch";

const TicketTable = ({ filters }) => {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const handleSearch = (text) => {
    setFilters((prev) => ({ ...prev, search: text }));
  };

  const handleStatusChange = (status) => {
    setFilters((prev) => ({ ...prev, status }));
  };

  const handleUserChange = (user) => {
    setFilters((prev) => ({ ...prev, assignedTo: user }));
  };

  const data = [
    {
      id: "#12345",
      provider: "KAEDC",
      subject: "Payment Not Processed",
      priority: "High",
      date: "2025-11-07T11:43",
      status: "Resolved",
      admin: "Not Assigned",
    },
    {
      id: "#12345",
      provider: "Gro Solar",
      subject: "Login Issues",
      priority: "Medium",
      date: "2025-11-07T11:15",
      status: "Opened",
      admin: "Not Assigned",
    },
    {
      id: "#12345",
      provider: "Switch Box",
      subject: "Account Hacked",
      priority: "Critical",
      date: "2025-11-07T11:15",
      status: "InProgress",
      admin: "Not Assigned",
    },
    {
      id: "#12345",
      provider: "Amaltech Store",
      subject: "Login Issues",
      priority: "Low",
      date: "2025-11-07T11:15",
      status: "Opened",
      admin: "Not Assigned",
    },
    {
      id: "#12345",
      provider: "VAT Account",
      subject: "Login Issues",
      priority: "Low",
      date: "2025-11-07T11:15",
      status: "Resolved",
      admin: "Not Assigned",
    },
  ];

  const filtered = data.filter((item) => {
    return (
      (!filters.status || item.status === filters.status) &&
      (!filters.priority || item.priority === filters.priority) &&
      (!filters.assignedTo || item.admin === filters.assignedTo) &&
      (!filters.date || item.date.startsWith(filters.date))
    );
  });

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow border">
      <FloatingContainer
        filtersOpen={filtersOpen}
        setFiltersOpen={setFiltersOpen}
        onSearch={handleSearch}
        onStatusChange={handleStatusChange}
        onUserChange={handleUserChange}
      />
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-2">Ticket ID</th>
            <th className="px-4 py-2">Provider Name</th>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Priority</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Admin</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filtered.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2">{item.id}</td>
              <td className="px-4 py-2">{item.provider}</td>
              <td className="px-4 py-2">{item.subject}</td>
              <td className="px-4 py-2">
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 ${
                    item.priority === "High"
                      ? "bg-yellow-500"
                      : item.priority === "Medium"
                      ? "bg-blue-500"
                      : item.priority === "Critical"
                      ? "bg-red-600"
                      : "bg-green-500"
                  }`}
                ></span>
                {item.priority}
              </td>
              <td className="px-4 py-2">
                {new Date(item.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {new Date(item.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </td>
              <td className="px-4 py-2">{item.status}</td>
              <td className="px-4 py-2">{item.admin}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {filtered.length === 0 && (
        <div className="p-4 text-center text-gray-500">No tickets found</div>
      )}
    </div>
  );
};

export default TicketTable;
