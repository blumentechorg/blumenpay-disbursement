// "use client";

// import React, { useState, useMemo } from "react";
// import FloatingContainer from "./CSearch";

// const TicketTable = ({ filters }) => {
//   const [filtersOpen, setFiltersOpen] = useState(false);

//   const handleSearch = (text) => {
//     setFilters((prev) => ({ ...prev, search: text }));
//   };

//   const handleStatusChange = (status) => {
//     setFilters((prev) => ({ ...prev, status }));
//   };

//   const handleUserChange = (user) => {
//     setFilters((prev) => ({ ...prev, assignedTo: user }));
//   };

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
//     <div className="max-w-[95vw] sm:max-w-[600px] md:max-w-[790px] lg:max-w-full">
//       <div className="mb-8 ">
//         <FloatingContainer
//           filtersOpen={filtersOpen}
//           setFiltersOpen={setFiltersOpen}
//           onSearch={handleSearch}
//           onStatusChange={handleStatusChange}
//           onUserChange={handleUserChange}
//         />
//       </div>

//       <div className=" bg-white rounded-lg shadow border">
//         <table className="min-w-full divide-y divide-gray-200 text-sm">
//           <thead className="bg-gray-100 text-left">
//             <tr>
//               <th className="px-4 py-2">Ticket ID</th>
//               <th className="px-4 py-2">Provider Name</th>
//               <th className="px-4 py-2">Subject</th>
//               <th className="px-4 py-2">Priority</th>
//               <th className="px-4 py-2">Date</th>
//               <th className="px-4 py-2">Status</th>
//               <th className="px-4 py-2">Admin</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-100">
//             {filtered.map((item, index) => (
//               <tr key={index} className="hover:bg-gray-50">
//                 <td className="px-4 py-2">{item.id}</td>
//                 <td className="px-4 py-2">{item.provider}</td>
//                 <td className="px-4 py-2">{item.subject}</td>
//                 <td className="px-4 py-2">
//                   <span
//                     className={`inline-block w-2 h-2 rounded-full mr-2 ${
//                       item.priority === "High"
//                         ? "bg-yellow-500"
//                         : item.priority === "Medium"
//                         ? "bg-blue-500"
//                         : item.priority === "Critical"
//                         ? "bg-red-600"
//                         : "bg-green-500"
//                     }`}
//                   ></span>
//                   {item.priority}
//                 </td>
//                 <td className="px-4 py-2">
//                   {new Date(item.date).toLocaleTimeString([], {
//                     hour: "2-digit",
//                     minute: "2-digit",
//                   })}{" "}
//                   -{" "}
//                   {new Date(item.date).toLocaleDateString("en-US", {
//                     month: "short",
//                     day: "numeric",
//                   })}
//                 </td>
//                 <td className="px-4 py-2">{item.status}</td>
//                 <td className="px-4 py-2">{item.admin}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filtered.length === 0 && (
//           <div className="p-4 text-center text-gray-500">No tickets found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TicketTable;

"use client";

import React, { useState } from "react";
import FloatingContainer from "./CSearch";

const TicketTable = ({ filters, setFilters }) => {
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
      id: "#12346",
      provider: "Gro Solar",
      subject: "Login Issues",
      priority: "Medium",
      date: "2025-11-07T11:15",
      status: "Opened",
      admin: "Not Assigned",
    },
    {
      id: "#12347",
      provider: "Switch Box",
      subject: "Account Hacked",
      priority: "Critical",
      date: "2025-11-07T11:15",
      status: "InProgress",
      admin: "Not Assigned",
    },
    {
      id: "#12348",
      provider: "Amaltech Store",
      subject: "Login Issues",
      priority: "Low",
      date: "2025-11-07T11:15",
      status: "Opened",
      admin: "Not Assigned",
    },
    {
      id: "#12349",
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
    <div className="w-full max-w-[95vw] sm:max-w-[600px] md:max-w-[790px] lg:max-w-full mx-auto">
      <div className="mb-4 ">
        <FloatingContainer
          filtersOpen={filtersOpen}
          setFiltersOpen={setFiltersOpen}
          onSearch={handleSearch}
          onStatusChange={handleStatusChange}
          onUserChange={handleUserChange}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded-lg shadow border">
        <table className="w-full min-w-[600px] divide-y divide-gray-200">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                Ticket ID
              </th>
              <th className="px-2 sm:px-4 py-2 text-xs sm:text-sm">Provider</th>
              <th className="px-2 sm:px-4 py-2 text-xs sm:text-sm">Subject</th>
              <th className="px-2 sm:px-4 py-2 text-xs sm:text-sm">Priority</th>
              <th className="px-2 sm:px-4 py-2 text-xs sm:text-sm hidden sm:table-cell">
                Date
              </th>
              <th className="px-2 sm:px-4 py-2 text-xs sm:text-sm">Status</th>
              <th className="px-2 sm:px-4 py-2 text-xs sm:text-sm hidden md:table-cell">
                Admin
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  {item.id}
                </td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  {item.provider}
                </td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm">
                  {item.subject}
                </td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap flex items-center">
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
                  />
                  {item.priority}
                </td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap hidden sm:table-cell">
                  {new Date(item.date).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}{" "}
                  –{" "}
                  {new Date(item.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap">
                  {item.status}
                </td>
                <td className="px-2 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap hidden md:table-cell">
                  {item.admin}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="p-4 text-center text-gray-500">No tickets found</div>
        )}
      </div>
    </div>
  );
};

export default TicketTable;
