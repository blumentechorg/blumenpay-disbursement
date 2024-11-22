import Image from "next/image";
import React from "react";
import user from "@/public/images/user.jpg";

import Bell from "@/public/icons/header/bell";

export default function Navbutton() {
  return (
    <>
      <div className="border container border-gray-400 py-3 px-4 rounded-md flex  space-x-2  ">
        <div>Shereefadamu001@Gmail.Com</div>
        <div className="border-r pr-3 ">
          <Image src={user} alt="" height={24} width={24} />
        </div>
        <div>
          <Bell />
        </div>
      </div>
    </>
  );
}
