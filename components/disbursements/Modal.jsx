import React, { useState } from "react";

const Modal = ({ triggerLabel, className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {/* Trigger Button */}
      <button
        className={`w-[150px] h-[32px] bg-blue-700 text-white text-xs rounded-sm p-1.5 hover:bg-blue-800 focus:outline-none ${className}`}
        onClick={openModal}
      >
        {triggerLabel}
      </button>

      {/* Modal Content */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-[#F1F1F1] rounded-md p-6 w-[485px] shadow-lg">
            <div className="flex justify-between items-center pb-4">
              <h1 className="text-xl font-bold">Manual Disbursement</h1>
              <button
                className="text-gray-600 hover:text-red-500"
                onClick={closeModal}
                aria-label="Close Modal"
              >
                ✕
              </button>
            </div>

            {/* Manual Disbursement Form */}
            <form className="space-y-4">
              {/* Service Provider */}
              <select
                className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                aria-label="Select Service Provider"
              >
                <option value="" disabled selected>
                  Service Provider
                </option>
                <option value="KAEDC">KAEDC</option>
                <option value="AEDC">AEDC</option>
              </select>

              {/* Percentage and Amount */}
              <div className="flex items-center space-x-2">
                <select
                  className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  aria-label="Select Percentage or Fixed Amount"
                >
                  <option value="Percentage">Percentage</option>
                </select>
                <input
                  type="number"
                  step="0.1"
                  className="w-1/2 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="1.0"
                  aria-label="Enter Percentage"
                />
              </div>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-md bg-gray-100"
                placeholder="Amount "
                aria-readonly="true"
                disabled
              />

              {/* Account Details */}
              <div className="text-sm text-gray-600">
                <div className="font-bold pb-2 text-center">
                  Account Details
                </div>
                <select
                  className="w-full mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  aria-label="Select Bank"
                >
                  <option value="" disabled selected>
                    Bank
                  </option>
                  <option value="GTBank">GTBank</option>
                  <option value="Access Bank">Access Bank</option>
                </select>
                <input
                  type="text"
                  className="w-full mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  placeholder="Account Number"
                  aria-label="Enter Account Number"
                />
                <input
                  type="text"
                  className="w-full px-4 py-2 border rounded-md bg-gray-100"
                  placeholder="Account Name "
                  aria-readonly="true"
                  disabled
                />
              </div>

              {/* Bank Details */}
              <div className="text-sm text-gray-600 mt-4 text-center space-y-2">
                <div>Bank Name: GTBank</div>
                <div>Account Number: 0104647462</div>
                <div>Account Name: KAEDC</div>
              </div>

              {/* Buttons */}
              <div className="flex space-x-4 pt-6">
                <button
                  className="bg-gray-200 text-xs text-gray-600 uppercase px-6 py-3 rounded-sm w-1/2 hover:bg-gray-300"
                  type="button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 text-xs text-white px-6 py-3 uppercase rounded-sm w-1/2 hover:bg-blue-700"
                  type="submit"
                >
                  Disburse Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
