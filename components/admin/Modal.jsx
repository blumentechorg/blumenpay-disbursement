import Image from "next/image";
import { useState } from "react";
import kaduna from "@/public/images/kaduna.png";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
    //   <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg shadow-lg p-6">
    //     {/* Modal Header */}
    //     <div className="flex justify-between items-center border-b pb-3">
    //       <div className="flex items-center space-x-2">
    //         <Image
    //           src={kaduna} // Update this to your logo
    //           alt="Kaduna Electric"
    //           width={80}
    //           height={80}
    //         />
    //         <h2 className="text-xl font-bold">Kaduna Electric</h2>
    //       </div>
    //       <button
    //         onClick={onClose}
    //         className="text-gray-400 hover:text-gray-600"
    //       >
    //         ✕
    //       </button>
    //     </div>

    //     {/* Modal Content */}
    //     <div className="mt-4">
    //       <div className="flex justify-between items-center mb-6">
    //         <div className="text-center">
    //           <p className="text-gray-500">Current Balance</p>
    //           <h3 className="text-2xl font-bold">$25,000</h3>
    //           <p className="text-green-500">+2.5% Last 7 Days</p>
    //         </div>
    //         <div className="text-center">
    //           <p className="text-gray-500">Pending Disbursement</p>
    //           <h3 className="text-2xl font-bold">$5</h3>
    //           <p className="text-green-500">+2.5% Last 7 Days</p>
    //         </div>
    //         <div className="text-center">
    //           <p className="text-gray-500">Total Disbursement</p>
    //           <h3 className="text-2xl font-bold">$100,000</h3>
    //           <p className="text-green-500">+2.5% Last 7 Days</p>
    //         </div>
    //       </div>

    //       <div className="border-t pt-4">
    //         {/* Tab Navigation */}
    //         <div className="flex space-x-4 mb-4">
    //           <button className="text-blue-600 font-semibold border-b-2 border-blue-600">
    //             Disbursement History
    //           </button>
    //           <button className="text-gray-500 hover:text-blue-600">
    //             Transaction History
    //           </button>
    //           <button className="text-gray-500 hover:text-blue-600">
    //             Audit Log
    //           </button>
    //         </div>

    //         {/* Table */}
    //         <table className="w-full text-left border-collapse">
    //           <thead>
    //             <tr className="bg-gray-100">
    //               <th className="p-3">ID</th>
    //               <th className="p-3">Balance</th>
    //               <th className="p-3">Date</th>
    //               <th className="p-3">Status</th>
    //               <th className="p-3">Action</th>
    //             </tr>
    //           </thead>
    //           <tbody>
    //             {Array.from({ length: 5 }, (_, i) => (
    //               <tr key={i} className="hover:bg-gray-50">
    //                 <td className="p-3">1234567890</td>
    //                 <td className="p-3">$20,000</td>
    //                 <td className="p-3">11:43 AM, Nov 7</td>
    //                 <td className="p-3">
    //                   <span className="text-green-500">Success</span>
    //                 </td>
    //                 <td className="p-3">⋮</td>
    //               </tr>
    //             ))}
    //           </tbody>
    //         </table>

    //         <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
    //           Disburse Now
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 rounded-lg shadow-lg p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center space-x-2">
            <Image
              src={kaduna} // Update this to your logo
              alt="Kaduna Electric"
              width={80}
              height={80}
            />
            <h2 className="text-xl font-bold">Kaduna Electric</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="mt-4">
          <form className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-gray-700"
              >
                Role
              </label>
              <select
                id="role"
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="super_admin">Super Admin</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* Pages Access Checkboxes */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Pages to Access
              </label>
              <div className="mt-2 space-y-2">
                <div>
                  <input
                    id="access-dashboard"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="access-dashboard"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Dashboard
                  </label>
                </div>
                <div>
                  <input
                    id="access-reports"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="access-reports"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Reports
                  </label>
                </div>
                <div>
                  <input
                    id="access-analytics"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="access-analytics"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Analytics
                  </label>
                </div>
                <div>
                  <input
                    id="access-settings"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="access-settings"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Settings
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
