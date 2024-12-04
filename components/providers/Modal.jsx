// import Image from "next/image";
// import React from "react";
// import { FaTimes } from "react-icons/fa";
// import { TbAlertCircleFilled } from "react-icons/tb";
// import kaduna from "@/public/images/kaduna.png";

// const TransactionModal = ({ onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
//       <div className="bg-white w-1/3 rounded-lg shadow-lg p-6 relative">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <Image
//             src={kaduna} // Replace with the correct logo path
//             alt="Kaduna Electric Logo"
//             className="h-8"
//           />
//           <button
//             onClick={onClose}
//             className="text-gray-600 hover:text-gray-800"
//           >
//             <FaTimes size={20} />
//           </button>
//         </div>

//         {/* Transaction Details */}
//         <div className="mt-6">
//           <h3 className="text-gray-700 font-semibold mb-4">
//             Transaction Details
//           </h3>
//           <div className="p-4 bg-gray-50 rounded-md border">
//             <div className="flex items-center mb-3">
//               <TbAlertCircleFilled className="text-red-500" size={20} />
//               <span className="ml-2 text-red-600">Failed</span>
//             </div>
//             <p className="text-gray-700 text-sm">
//               <strong>Date:</strong> 11:15 AM, Nov 7
//             </p>
//             <p className="text-gray-700 text-sm">
//               <strong>Service Provider:</strong> Kaduna Electric
//             </p>
//             <p className="text-gray-700 text-sm">
//               <strong>Amount:</strong> $20,000
//             </p>
//             <p className="text-gray-700 text-sm">
//               <strong>Unit:</strong> 32.8
//             </p>
//             <p className="text-gray-700 text-sm">
//               <strong>Payment Method:</strong> Bank Transfer
//             </p>
//           </div>
//         </div>

//         {/* Customer Details */}
//         <div className="mt-6">
//           <h3 className="text-gray-700 font-semibold mb-4">Customer Details</h3>
//           <div className="p-4 bg-gray-50 rounded-md border">
//             <p className="text-gray-700 text-sm">
//               <strong>Name:</strong> John Doe
//             </p>
//             <p className="text-gray-700 text-sm">
//               <strong>Email:</strong> johndoe@gmail.com
//             </p>
//             <p className="text-gray-700 text-sm">
//               <strong>Phone:</strong> 09031754067
//             </p>
//           </div>
//         </div>

//         {/* Status */}
//         <div className="mt-6">
//           <h3 className="text-gray-700 font-semibold mb-4">Status</h3>
//           <div className="flex space-x-4">
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
//               Retry
//             </button>
//             <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
//               Refund
//             </button>
//           </div>
//         </div>

//         {/* Activity Log */}
//         <div className="mt-6">
//           <h3 className="text-gray-700 font-semibold mb-4">Activity Log</h3>
//           <div className="p-4 bg-gray-50 rounded-md border">
//             <p className="text-gray-700 text-sm">
//               <span className="text-yellow-600 font-bold">Pending:</span> 23
//               August, 2024 9:30 AM
//             </p>
//             <p className="text-gray-700 text-sm">
//               <span className="text-red-600 font-bold">Failed:</span> 23 August,
//               2024 9:30 AM
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TransactionModal;

"use client";

import Image from "next/image";
import React from "react";
import { FaTimes } from "react-icons/fa";
import { TbAlertCircleFilled } from "react-icons/tb";
import kaduna from "@/public/images/kaduna.png";
import Dottedline from "@/public/icons/dottedline";
import { FaCircleCheck } from "react-icons/fa6";

const TransactionModal = ({ modalContent, onClose }) => {
  if (!modalContent) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      {modalContent.status === "Failed" ? (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 text-sm flex items-center justify-end">
          <div className="bg-gray-100 w-1/3 rounded-lg shadow-lg  relative">
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-6">
              <Image
                src={kaduna} // Replace with the correct logo path
                alt="Kaduna Electric Logo"
                className=""
                width={100}
                height={100}
              />
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Transaction Details */}
            <div className="mt-6 px-4">
              <h3 className="text-gray-700 font-semibold mb-4">
                Transaction Details
              </h3>
              <div className="p-4 bg-gray-50 rounded-md border">
                <div className="flex items-center mb-3">
                  <TbAlertCircleFilled className="text-red-500" size={20} />
                  <span className="ml-2 text-red-600">
                    {" "}
                    {modalContent.status}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Date:</strong> 11:15 AM, Nov 7
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Service Provider:</strong> Kaduna Electric
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Amount:</strong> {modalContent.amount}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Unit:</strong> 32.8
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Payment Method:</strong> Bank Transfer
                </p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="mt-6 px-4">
              <h3 className="text-gray-700 font-semibold mb-4">
                Customer Details
              </h3>
              <div className="p-4 bg-gray-50 rounded-md border">
                <p className="text-gray-700 text-sm">
                  <strong>Name:</strong> John Doe
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Email:</strong> johndoe@gmail.com
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Phone:</strong> 09031754067
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="mt-6 px-4">
              <h3 className="text-gray-700 font-semibold mb-4">Status</h3>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md w-full ">
                  Retry
                </button>
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md w-full">
                  Refund
                </button>
              </div>
            </div>

            {/* Activity Log */}
            <div className="mt-6 px-4">
              <h3 className="text-gray-700 font-semibold mb-4">Activity Log</h3>
              <div className="p-4 bg-gray-50 rounded-md border space-y-1">
                <p className="text-gray-700 text-sm flex">
                  <TbAlertCircleFilled className="text-red-500" size={20} />
                  <span className="text-yellow-600 font-bold">Pending:</span> 23
                  August, 2024 9:30 AM
                </p>
                <span className="p">
                  <Dottedline />
                </span>
                <p className="text-gray-700 text-sm flex">
                  <TbAlertCircleFilled className="text-red-500" size={20} />
                  <span className="text-red-600 font-bold">Failed:</span> 23
                  August, 2024 9:30 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 text-sm flex items-center justify-end">
          <div className="bg-white w-1/3 rounded-lg shadow-lg p-6 relative">
            {/* Header */}
            <div className="flex items-center justify-between">
              <Image
                src={kaduna} // Replace with the correct logo path
                alt="Kaduna Electric Logo"
                className="h-8"
              />
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Transaction Details */}
            <div className="mt-6">
              <h3 className="text-gray-700 font-semibold mb-4">
                Transaction Details
              </h3>
              <div className="p-4 bg-gray-50 rounded-md border">
                <div className="flex items-center mb-3">
                  <FaCircleCheck className="text-green-500" size={20} />
                  <span className="ml-2 text-green-600">
                    {" "}
                    {modalContent.status}
                  </span>
                </div>
                <p className="text-gray-700 text-sm">
                  <strong>Date:</strong> 11:15 AM, Nov 7
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Service Provider:</strong> Kaduna Electric
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Amount:</strong> {modalContent.amount}
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Unit:</strong> 32.8
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Payment Method:</strong> Bank Transfer
                </p>
              </div>
            </div>

            {/* Customer Details */}
            <div className="mt-6">
              <h3 className="text-gray-700 font-semibold mb-4">
                Customer Details
              </h3>
              <div className="p-4 bg-gray-50 rounded-md border">
                <p className="text-gray-700 text-sm">
                  <strong>Name:</strong> John Doe
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Email:</strong> johndoe@gmail.com
                </p>
                <p className="text-gray-700 text-sm">
                  <strong>Phone:</strong> 09031754067
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="mt-6">
              <h3 className="text-gray-700 font-semibold mb-4">Status</h3>
              <div className="flex space-x-4">
                <button className="bg-blue-600 text-white px-2 py-2 rounded-sm w-full ">
                  Retry
                </button>
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-sm w-full">
                  Refund
                </button>
              </div>
            </div>

            {/* Activity Log */}
            <div className="mt-6">
              <h3 className="text-gray-700 font-semibold mb-4">Activity Log</h3>
              <div className="p-4 bg-gray-50 rounded-md border space-y-1">
                <p className="text-gray-700 text-sm flex">
                  <TbAlertCircleFilled className="text-red-500" size={20} />
                  <span className="text-yellow-600 font-bold">Pending:</span> 23
                  August, 2024 9:30 AM
                </p>
                <span className="p">
                  <Dottedline />
                </span>
                <p className="text-gray-700 text-sm flex">
                  <TbAlertCircleFilled className="text-red-500" size={20} />
                  <span className="text-red-600 font-bold">Failed:</span> 23
                  August, 2024 9:30 AM
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionModal;