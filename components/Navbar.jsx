"use client";

import React from "react";
import Navbutton from "./Navbutton";

export default function Navbar() {
  return (
    <>
      <div className="flex px-6 justify-between py-3.5 border-b bg-white sticky">
        <div>
          <div className=" text- font-bold">Welcome Back. Dr. Yunusa </div>
          <div>How Are You Doing Today</div>
        </div>
        <div>
          <Navbutton />
        </div>
      </div>
    </>
  );
}
