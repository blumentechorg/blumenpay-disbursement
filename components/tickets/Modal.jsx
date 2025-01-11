import Image from "next/image";
import { useState } from "react";
import kaduna from "@/public/images/kaduna.png";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
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
          <div className="flex justify-between items-center mb-6">
            <div className="text-center">
              <p className="text-gray-500">Current Balance</p>
              <h3 className="text-2xl font-bold">$25,000</h3>
              <p className="text-green-500">+2.5% Last 7 Days</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Pending Disbursement</p>
              <h3 className="text-2xl font-bold">$5</h3>
              <p className="text-green-500">+2.5% Last 7 Days</p>
            </div>
            <div className="text-center">
              <p className="text-gray-500">Total Disbursement</p>
              <h3 className="text-2xl font-bold">$100,000</h3>
              <p className="text-green-500">+2.5% Last 7 Days</p>
            </div>
          </div>

          <div className="border-t pt-4">
            {/* Tab Navigation */}
            <div className="flex space-x-4 mb-4">
              <button className="text-blue-600 font-semibold border-b-2 border-blue-600">
                Disbursement History
              </button>
              <button className="text-gray-500 hover:text-blue-600">
                Transaction History
              </button>
              <button className="text-gray-500 hover:text-blue-600">
                Audit Log
              </button>
            </div>

            {/* Table */}
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-3">ID</th>
                  <th className="p-3">Balance</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }, (_, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-3">1234567890</td>
                    <td className="p-3">$20,000</td>
                    <td className="p-3">11:43 AM, Nov 7</td>
                    <td className="p-3">
                      <span className="text-green-500">Success</span>
                    </td>
                    <td className="p-3">⋮</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md">
              Disburse Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
