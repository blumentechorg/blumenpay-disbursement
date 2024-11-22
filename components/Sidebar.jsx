import Image from "next/image";
import { FaHome, FaCog, FaUser, FaSignOutAlt } from "react-icons/fa";
import logo from "@/public/images/logo.png";
import title from "@/public/images/title.png";

export default function Sidebar() {
  const menus = [
    { name: "Overview", href: "/Explore/overview/", icon: <FaHome /> },
    { name: "Transaction", href: "/Explore/transactions/", icon: <FaCog /> },
    { name: "Disbursement", href: "/Explore/disbursement/", icon: <FaUser /> },
    {
      name: "Service Providers",
      href: "/Explore/serviceprovider",
      icon: <FaUser />,
    },
    { name: "Logout", href: "/", icon: <FaSignOutAlt /> },
  ];

  return (
    <div className="h-screen w-64 bg-white text-black flex flex-col">
      {/* Logo and Title */}
      <div className="flex items-center justify-center h-20 border-b border-gray-300 space-x-2">
        <Image src={logo} alt="" width={30} height={30} />
        <Image src={title} alt="" width={100} height={100} />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-6">
        <ul className="space-y-2 px-4">
          {menus.map((menu, index) => (
            <li key={index}>
              <a
                href={menu.href}
                className="flex items-center px-4 py-2 text-sm font-light rounded hover:bg-[#F5F7FA]"
              >
                <span className="text-lg mr-3">{menu.icon}</span>
                {menu.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
