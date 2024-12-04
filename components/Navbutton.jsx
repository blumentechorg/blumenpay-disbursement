import Image from "next/image";
import React from "react";
import User from "@/public/images/user.jpg";
import { useAuth } from "../context/AuthContext";

import Bell from "@/public/icons/header/bell";

export default function Navbutton() {
  const { user } = useAuth();

  return (
    <>
      <div className="border container border-gray-400 py-3 px-4 rounded-md flex space-x-2">
        <div>{user?.email || "User"}</div>
        <div className="border-r pr-3">
          <Image src={User} alt="" height={24} width={24} />
        </div>
        <div>
          <Bell />
        </div>
      </div>
    </>
  );
}
