// components/LogoutModal.js
import React from "react";
import { TbAlertCircleFilled } from "react-icons/tb";

const LogoutModal = ({ isOpen, onClose, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative z-60">
        {/* Close Button */}
        <div className="">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            ✖
          </button>

          {/* Modal Content */}
          <h2 className="text-lg font-semibold mb-4">Log Out</h2>
        </div>
        <div className="flex flex-col items-center">
          <div className="text-red-500 text-6xl mb-4">
            <TbAlertCircleFilled />
          </div>
          <p className="text-center text-gray-700 mb-6 font-bold">
            Are you sure you want to log out?
          </p>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 uppercase"
            >
              Yes, Log Out
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded hover:bg-gray-300 uppercase"
            >
              No, Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
