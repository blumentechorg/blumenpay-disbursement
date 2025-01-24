// "use client";
// import Image from "next/image";
// import logo from "@/public/images/logo.png";
// import title from "@/public/images/title.png";
// import Caretupdown from "@/public/icons/sidebar/caretupdown";
// import Overview from "@/public/icons/sidebar/overview";
// import Transactions from "@/public/icons/sidebar/transactions";
// import Disbursements from "@/public/icons/sidebar/disbursements";
// import Tickets from "@/public/icons/sidebar/tickets";
// import Admin from "@/public/icons/sidebar/admin";
// import Providers from "@/public/icons/sidebar/providers";
// import Logout from "@/public/icons/sidebar/logout";
// import LogoutModal from "./LogoutModal";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "../context/AuthContext";

// export default function Sidebar() {
//   const { user, logout } = useAuth();
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);
//   const router = useRouter();

//   const handleLogout = () => {
//     closeModal(); // Close the modal
//     logout(); // Clear AuthContext and cookies
//     router.push("/"); // Redirect to login/home
//   };

//   const roleMapping = {
//     "team management": ["Admin"],
//     "transaction management": ["Overview", "Transactions"],
//     "settlement management": ["Disbursements"],
//     "app management": ["Service Providers"],
//     "customer management": ["Complain Tickets"],
//   };

//   const menus = [
//     { name: "Overview", href: "/Explore/overview/", icon: <Overview /> },
//     {
//       name: "Transactions",
//       href: "/Explore/transactions/",
//       icon: <Transactions />,
//     },
//     {
//       name: "Disbursements",
//       href: "/Explore/disbursements/",
//       icon: <Disbursements />,
//     },
//     {
//       name: "Service Providers",
//       href: "/Explore/providers",
//       icon: <Providers />,
//     },
//     {
//       name: "Complain Tickets",
//       href: "/Explore/tickets/",
//       icon: <Tickets />,
//     },
//     {
//       name: "Admin",
//       href: "/Explore/admin/",
//       icon: <Admin />,
//     },
//   ];

//   // Filter menus based on user role
//   const filteredMenus =
//     user?.role === "super_admin"
//       ? menus // Super Admin sees the entire menu
//       : menus.filter((menu) =>
//           Object.entries(roleMapping).some(
//             ([role, allowedMenus]) =>
//               user?.managementRoles?.includes(role) &&
//               allowedMenus.includes(menu.name)
//           )
//         );

//   return (
//     <div className="h-screen w-64 bg-white text-black flex flex-col sticky top-0">
//       {/* Logo and Title */}
//       <div className="flex items-center justify-between h-20 border-b border-gray-300 px-2">
//         <div className="flex space-x-2">
//           <Image src={logo} alt="Logo" width={36} height={30} />
//           <Image src={title} alt="Title" width={100} height={100} />
//         </div>
//         <div>
//           <Caretupdown />
//         </div>
//       </div>

//       {/* Menu Items */}
//       <nav className="flex-1 mt-6">
//         <ul className="space-y-1 px-4">
//           {filteredMenus.map((menu, index) => (
//             <li key={index}>
//               <a
//                 href={menu.href}
//                 className="flex items-center px-4 py-2 text-sm rounded
//                   hover:bg-[#F5F7FA] hover:font-bold hover:text-gray-900"
//               >
//                 <span className="text-lg mr-1.5">{menu.icon}</span>
//                 {menu.name}
//               </a>
//             </li>
//           ))}
//           <button
//             onClick={() => setIsModalOpen(true)}
//             className="flex items-center px-4 py-2 text-sm font-light hover:font-bold hover:text-gray-900"
//           >
//             <span className="text-lg mr-3">
//               <Logout />
//             </span>
//             Log Out
//           </button>
//           <LogoutModal
//             isOpen={isModalOpen}
//             onClose={closeModal}
//             onLogout={handleLogout}
//           />
//         </ul>
//       </nav>
//     </div>
//   );
// }

// src/components/Sidebar.js

"use client";

import Image from "next/image";
import { useAuth } from "../context/AuthContext";
import { MENU_ITEMS } from "@/constants/menu";
import LogoutModal from "./LogoutModal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import logo from "@/public/images/logo.png";
import title from "@/public/images/title.png";
import Logout from "@/public/icons/sidebar/logout";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleLogout = () => {
    closeModal();
    logout();
    router.push("/");
  };

  // Debug: Log user object and role
  console.log("User object from AuthContext:", user);
  console.log("User role:", user?.role);

  // Filter menu items based on user role
  const filteredMenus =
    user?.role === "SuperAdmin"
      ? MENU_ITEMS // Show all items for super admin
      : MENU_ITEMS.filter((menu) => menu.roles.includes(user?.role));

  // Debug: Log filtered menus
  console.log("Filtered Menus:", filteredMenus);

  return (
    <div className="h-screen w-64 bg-white text-black flex flex-col sticky top-0">
      {/* Logo Section */}
      <div className="flex items-center justify-between h-20 border-b border-gray-300 px-2">
        <div className="flex space-x-2">
          <Image src={logo} alt="Logo" width={36} height={30} />
          <Image src={title} alt="Title" width={100} height={30} />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-1 px-4">
          {filteredMenus.map((menu, index) => (
            <li key={index}>
              <a
                href={menu.href}
                className="flex items-center px-4 py-2 text-sm rounded hover:bg-gray-100 hover:font-bold hover:text-gray-900"
              >
                <span className="text-lg mr-1.5 hover:text-current">
                  {menu.icon}
                </span>
                {menu.name}
              </a>
            </li>
          ))}
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 text-sm font-light hover:font-bold hover:text-gray-900"
          >
            <span className="text-lg mr-3">
              <Logout />
            </span>
            Log Out
          </button>
          <LogoutModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onLogout={handleLogout}
          />
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
