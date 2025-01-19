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

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {modalContent.status === "Failed" ? (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 text-sm flex items-center justify-end"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-gray-100 w-1/3 h-full shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4">
              <Image
                src={kaduna}
                alt="Kaduna Electric Logo"
                width={80}
                height={80}
              />
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Transaction Details */}
            <div className="mt-5 px-4 ">
              <h3 className="text-gray-700 text-sm font-semibold mb-2">
                Transaction Details
              </h3>
              <div className="p-4 bg-gray-50 rounded-md border">
                <div className="flex items-center mb-3">
                  <TbAlertCircleFilled className="text-red-500" size={32} />
                </div>

                <div className="space-y-3 ">
                  <p className="text-gray-700 text-xs font-medium ">
                    <span className="font-light">Date:</span>{" "}
                    <span className="uppercase">{modalContent.date}</span>
                  </p>
                  <p className="text-gray-700 text-xs  font-medium">
                    <span className="font-light ">Service Provider:</span>{" "}
                    <span className="uppercase">Kaduna Electric</span>
                  </p>
                  <p className="text-gray-700 text-xs  font-medium">
                    <span className="font-light ">Amount:</span>{" "}
                    <span className="uppercase">{modalContent.amount}</span>
                  </p>
                  <p className="text-gray-700 text-xs  font-medium">
                    <span className="font-light ">Unit:</span> 32.8
                  </p>
                  <p className="text-gray-700 text-xs  font-medium">
                    <span className="font-light ">Payment Method:</span>{" "}
                    <span className="uppercase">Bank Transfer</span>
                  </p>
                  <p className="text-gray-700 text-xs  font-medium">
                    <span className="font-light ">Status:</span>{" "}
                    <span className="text-red-600">{modalContent.status}</span>{" "}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="mt-5 px-4">
              <h3 className="text-gray-700 text-sm font-semibold mb-2 ">
                Customer Details
              </h3>
              <div className="p-4 bg-gray-50 rounded-md border space-y-3">
                <p className="text-gray-700 text-xs">
                  <span className="font-light">Name:</span>{" "}
                  <span className="font-medium uppercase">John Doe</span>
                </p>
                <p className="text-gray-700 text-xs">
                  <span className="font-light">Email:</span>{" "}
                  <span className="font-medium uppercase">
                    johndoe@gmail.com
                  </span>
                </p>
                <p className="text-gray-700 text-xs">
                  <span className="font-light">Phone:</span>{" "}
                  <span className="font-medium uppercase">09031754067</span>
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="mt-10 px-4">
              <h3 className="text-gray-700 font-semibold mb-4">Status</h3>
              <div className="flex space-x-4 text-xs">
                <button className="bg-[#0052CC] text-white  px-4 py-2 rounded-sm w-full ">
                  RETRY
                </button>
                <button className="bg-gray-300 text-gray-700 px-4  py-2 rounded-sm w-full">
                  REFUND
                </button>
              </div>
            </div>

            {/* Activity Log */}
            <div className="mt-10 px-4">
              <h3 className="text-gray-700 font-semibold mb-2">Activity Log</h3>
              <div className="p-4 bg-gray-50 rounded-md border ">
                <p className="text-gray-700 text-sm flex space-x-1">
                  <TbAlertCircleFilled className="text-yellow-600" size={20} />
                  <span className="text-medium">Pending</span>
                  <span className="pt-1">
                    <TbAlertCircleFilled className="text-gray-900" size={12} />
                  </span>{" "}
                  <span>23 August, 2024 9:30 AM</span>
                </p>
                <span>
                  <Dottedline />
                </span>
                <p className="text-gray-700 text-sm flex space-x-1">
                  <TbAlertCircleFilled className="text-red-600" size={20} />
                  <span className="text-medium">Failed</span>
                  <span className="pt-1">
                    <TbAlertCircleFilled className="text-gray-900" size={12} />
                  </span>
                  <span>23 August, 2024 9:30 AM</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 text-sm flex items-center justify-end"
          onClick={handleBackdropClick}
        >
          <div
            className="bg-gray-100 w-1/3 h-full shadow-lg relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-white p-4">
              <Image
                src={kaduna}
                alt="Kaduna Electric Logo"
                width={80}
                height={80}
              />
              <button
                onClick={onClose}
                className="text-gray-600 hover:text-gray-800"
              >
                <FaTimes size={20} />
              </button>
            </div>

            {/* Transaction Details */}
            <div className="mt-5 px-4 ">
              <h3 className="text-gray-700 text-sm font-semibold mb-2">
                Transaction Details
              </h3>
              <div className="p-4 bg-gray-50 rounded-md border">
                <div className="flex items-center mb-3">
                  <FaCircleCheck className="text-green-500" size={32} />
                </div>

                <div className="space-y-3 ">
                  <p className="text-gray-700 text-xs font-medium ">
                    <span className="font-light">Date:</span>{" "}
                    <span className="uppercase">11:15 AM, Nov 7</span>
                  </p>
                  <p className="text-gray-700 text-xs  font-medium">
                    <span className="font-light ">Service Provider:</span>{" "}
                    <span className="uppercase">Kaduna Electric</span>
                  </p>
                  <p className="text-gray-700 text-xs  font-medium">
                    <span className="font-light ">Amount:</span>{" "}
                    <span className="uppercase">{modalContent.amount}</span>
                  </p>
                  <p className="text-gray-700 text-xs  font-medium">
                    <span className="font-light ">Unit:</span> 32.8
                  </p>
                  <p className="text-gray-700 text-xs  font-medium">
                    <span className="font-light ">Payment Method:</span>{" "}
                    <span className="uppercase">Bank Transfer</span>
                  </p>
                  <p className="text-gray-700 text-xs  font-medium">
                    <span className="font-light ">Status:</span>{" "}
                    <span className="text-green-600">
                      {modalContent.status}
                    </span>{" "}
                  </p>
                </div>
              </div>
            </div>

            {/* Customer Details */}
            <div className="mt-5 px-4">
              <h3 className="text-gray-700 text-sm font-semibold mb-2 ">
                Customer Details
              </h3>
              <div className="p-4 bg-gray-50 rounded-md border space-y-3">
                <p className="text-gray-700 text-xs">
                  <span className="font-light">Name:</span>{" "}
                  <span className="font-medium uppercase">John Doe</span>
                </p>
                <p className="text-gray-700 text-xs">
                  <span className="font-light">Email:</span>{" "}
                  <span className="font-medium uppercase">
                    johndoe@gmail.com
                  </span>
                </p>
                <p className="text-gray-700 text-xs">
                  <span className="font-light">Phone:</span>{" "}
                  <span className="font-medium uppercase">09031754067</span>
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="mt-10 px-4">
              <h3 className="text-gray-700 font-semibold mb-4">Status</h3>
              <div className="flex space-x-4 text-xs">
                <button className="bg-[#0052CC] text-white  px-4 py-2 rounded-sm w-full ">
                  CLOSE
                </button>
                <button className="bg-gray-300 text-gray-700 px-4  py-2 rounded-sm w-full">
                  PRINT
                </button>
              </div>
            </div>

            {/* Activity Log */}
            <div className="mt-10 px-4">
              <h3 className="text-gray-700 font-semibold mb-2">Activity Log</h3>
              <div className="p-4 bg-gray-50 rounded-md border ">
                <p className="text-gray-700 text-sm flex space-x-1">
                  <TbAlertCircleFilled className="text-yellow-600" size={20} />
                  <span className="text-medium">Pending</span>
                  <span className="pt-1">
                    <TbAlertCircleFilled className="text-gray-900" size={12} />
                  </span>{" "}
                  <span>23 August, 2024 9:30 AM</span>
                </p>
                <span>
                  <Dottedline />
                </span>
                <p className="text-gray-700 text-sm flex space-x-1">
                  <TbAlertCircleFilled className="text-green-600" size={20} />
                  <span className="text-medium">Success</span>
                  <span className="pt-1">
                    <TbAlertCircleFilled className="text-gray-900" size={12} />
                  </span>
                  <span>23 August, 2024 9:30 AM</span>
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
