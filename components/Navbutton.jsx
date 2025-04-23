// // import Image from "next/image";
// // import React from "react";
// // import User from "@/public/images/user.jpg";
// // import { useAuth } from "../context/AuthContext";

// // import Bell from "@/public/icons/header/bell";

// // export default function Navbutton() {
// //   const { user } = useAuth();

// //   return (
// //     <>
// //       <div className="border container border-gray-400 py-3 px-4 rounded-md flex space-x-2">
// //         <div>{user?.email || "User"}</div>
// //         <div className="border-r pr-3">
// //           <Image src={User} alt="" height={24} width={24} />
// //         </div>
// //         <div>
// //           <Bell />
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import User from "@/public/images/user.jpg";
// import { useAuth } from "../context/AuthContext";
// import Bell from "@/public/icons/header/bell";
// import axiosInstance from "@/lib/axiosInstance"; // adjust path as needed
// import { toast } from "react-toastify";

// export default function Navbutton() {
//   const { user } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword) {
//       toast.error("Please fill in both fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axiosInstance.post("/Identity/ChangePassword", {
//         oldPassword,
//         newPassword,
//       });

//       if (res.data?.isSuccess) {
//         toast.success(res.data.message || "Password changed!");
//         setShowModal(false);
//         setOldPassword("");
//         setNewPassword("");
//       } else {
//         toast.error(res.data.message || "Failed to change password.");
//       }
//     } catch (err) {
//       toast.error("An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="relative">
//         <div
//           className="border container border-gray-400 py-3 px-4 rounded-md flex space-x-2 cursor-pointer"
//           onClick={() => setShowDropdown(!showDropdown)}
//         >
//           <div>{user?.email || "User"}</div>
//           <div className="border-r pr-3">
//             <Image src={User} alt="" height={24} width={24} />
//           </div>
//           <div>
//             <Bell />
//           </div>
//         </div>

//         {showDropdown && (
//           <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
//             <button
//               className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               onClick={() => {
//                 setShowDropdown(false);
//                 setShowModal(true);
//               }}
//             >
//               Change Password
//             </button>
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 w-96">
//             <h2 className="text-lg font-semibold mb-4">Change Password</h2>
//             <input
//               type="password"
//               placeholder="Old Password"
//               className="w-full border rounded p-2 mb-3"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="New Password"
//               className="w-full border rounded p-2 mb-4"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 rounded bg-gray-300"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleChangePassword}
//                 className="px-4 py-2 rounded bg-blue-600 text-white"
//                 disabled={loading}
//               >
//                 {loading ? "Changing..." : "Change"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import User from "@/public/images/user.jpg";
// import { useAuth } from "../context/AuthContext";
// import Bell from "@/public/icons/header/bell";
// import axiosInstance from "@/lib/axiosInstance";
// import { toast } from "react-toastify";
// // <-- NEW: import a dropdown icon
// import { ChevronDownIcon } from "@heroicons/react/20/solid";

// export default function Navbutton() {
//   const { user } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword) {
//       toast.error("Please fill in both fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axiosInstance.post("/Identity/ChangePassword", {
//         oldPassword,
//         newPassword,
//       });

//       if (res.data?.isSuccess) {
//         toast.success(res.data.message || "Password changed!");
//         setShowModal(false);
//         setOldPassword("");
//         setNewPassword("");
//       } else {
//         toast.error(res.data.message || "Failed to change password.");
//       }
//     } catch {
//       toast.error("An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="relative">
//         <div
//           className="border container border-gray-400 py-3 px-4 rounded-md flex items-center space-x-2 cursor-pointer select-none"
//           onClick={() => setShowDropdown(!showDropdown)}
//         >
//           <div className="flex items-center space-x-1">
//             <span>{user?.email || "User"}</span>
//             {/* Chevron icon to indicate dropdown */}
//             <ChevronDownIcon className="w-4 h-4 text-gray-600" />
//           </div>
//           <div className="border-r pr-3">
//             <Image src={User} alt="avatar" height={24} width={24} />
//           </div>
//           <div>
//             <Bell />
//           </div>
//         </div>

//         {showDropdown && (
//           <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
//             <button
//               className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               onClick={() => {
//                 setShowDropdown(false);
//                 setShowModal(true);
//               }}
//             >
//               Change Password
//             </button>
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 w-96">
//             <h2 className="text-lg font-semibold mb-4">Change Password</h2>
//             <input
//               type="password"
//               placeholder="Old Password"
//               className="w-full border rounded p-2 mb-3"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="New Password"
//               className="w-full border rounded p-2 mb-4"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 rounded bg-gray-300"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleChangePassword}
//                 className="px-4 py-2 rounded bg-blue-600 text-white"
//                 disabled={loading}
//               >
//                 {loading ? "Changing..." : "Change"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// "use client";

// import Image from "next/image";
// import React, { useState } from "react";
// import User from "@/public/images/user.jpg";
// import { useAuth } from "../context/AuthContext";
// import Bell from "@/public/icons/header/bell";
// import axiosInstance from "@/lib/axiosInstance";
// import { toast } from "react-toastify";
// // ← NEW: import FontAwesome chevron
// import { FaChevronDown } from "react-icons/fa";

// export default function Navbutton() {
//   const { user } = useAuth();
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChangePassword = async () => {
//     if (!oldPassword || !newPassword) {
//       toast.error("Please fill in both fields");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await axiosInstance.post("/Identity/ChangePassword", {
//         oldPassword,
//         newPassword,
//       });

//       if (res.data?.isSuccess) {
//         toast.success(res.data.message || "Password changed!");
//         setShowModal(false);
//         setOldPassword("");
//         setNewPassword("");
//       } else {
//         toast.error(res.data.message || "Failed to change password.");
//       }
//     } catch {
//       toast.error("An error occurred.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="relative">
//         <div
//           className="border container border-gray-400 py-3 px-4 rounded-md flex items-center space-x-2 cursor-pointer select-none"
//           onClick={() => setShowDropdown(!showDropdown)}
//         >
//           <div className="flex items-center space-x-1">
//             <span>{user?.email || "User"}</span>
//             {/* FontAwesome chevron-down */}
//             <FaChevronDown className="w-4 h-4 text-gray-600" />
//           </div>
//           <div className="border-r pr-3">
//             <Image src={User} alt="avatar" height={24} width={24} />
//           </div>
//           <div>
//             <Bell />
//           </div>
//         </div>

//         {showDropdown && (
//           <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
//             <button
//               className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               onClick={() => {
//                 setShowDropdown(false);
//                 setShowModal(true);
//               }}
//             >
//               Change Password
//             </button>
//           </div>
//         )}
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//           <div className="bg-white rounded-lg p-6 w-96">
//             <h2 className="text-lg font-semibold mb-4">Change Password</h2>
//             <input
//               type="password"
//               placeholder="Old Password"
//               className="w-full border rounded p-2 mb-3"
//               value={oldPassword}
//               onChange={(e) => setOldPassword(e.target.value)}
//             />
//             <input
//               type="password"
//               placeholder="New Password"
//               className="w-full border rounded p-2 mb-4"
//               value={newPassword}
//               onChange={(e) => setNewPassword(e.target.value)}
//             />
//             <div className="flex justify-end space-x-2">
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="px-4 py-2 rounded bg-gray-300"
//                 disabled={loading}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleChangePassword}
//                 className="px-4 py-2 rounded bg-blue-600 text-white"
//                 disabled={loading}
//               >
//                 {loading ? "Changing..." : "Change"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import Image from "next/image";
import React, { useState } from "react";
import User from "@/public/images/user.jpg";
import { useAuth } from "../context/AuthContext";
import Bell from "@/public/icons/header/bell";
import axiosInstance from "@/lib/axiosInstance";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaChevronDown, FaEye, FaEyeSlash } from "react-icons/fa";

export default function Navbutton() {
  const { user } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!oldPassword || !newPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    setLoading(true);
    try {
      const res = await axiosInstance.post("/Identity/ChangePassword", {
        oldPassword,
        newPassword,
      });

      if (res.data?.isSuccess) {
        toast.success(res.data.message || "Password changed!");
        setShowModal(false);
        setOldPassword("");
        setNewPassword("");
      } else {
        toast.error(res.data.message || "Failed to change password.");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toast container (can also go once at app root) */}
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="relative">
        <div
          className="border container border-gray-400 py-3 px-4 rounded-md flex items-center space-x-2 cursor-pointer select-none"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="flex items-center space-x-1">
            <span>{user?.email || "User"}</span>
          </div>
          <div className="border-r pr-3">
            <Image src={User} alt="avatar" height={24} width={24} />
          </div>
          <div>
            <Bell />
          </div>

          <FaChevronDown className="w-4 h-4 text-gray-600" />
        </div>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                setShowDropdown(false);
                setShowModal(true);
              }}
            >
              Change Password
            </button>
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">Change Password</h2>

            {/* Old Password with visibility toggle */}
            <div className="relative mb-3">
              <input
                type={showOldPassword ? "text" : "password"}
                placeholder="Old Password"
                className="w-full border rounded p-2 pr-10"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowOldPassword((v) => !v)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {showOldPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* New Password with visibility toggle */}
            <div className="relative mb-4">
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full border rounded p-2 pr-10"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword((v) => !v)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 focus:outline-none"
              >
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                className="px-4 py-2 rounded bg-blue-600 text-white"
                disabled={loading}
              >
                {loading ? "Changing..." : "Change"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
