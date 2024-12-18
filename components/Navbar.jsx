"use client";

import React from "react";
import Navbutton from "./Navbutton";
import { useAuth } from "../context/AuthContext";
import Mobilenav from "./Mobilenav";

export default function Navbar() {
  const { user } = useAuth(); // Access user from AuthContext

  return (
    <>
      <div className="flex px-6 justify-between py-3.5 border-b bg-white">
        <div className="flex space-x-10">
          <div className="lg:hidden">
            <Mobilenav />
          </div>
          <div className="hidden md:block">
            <div className="text-lg font-bold">
              Welcome Back, {user.name || "User"}!
            </div>
            <div>How Are You Doing Today?</div>
          </div>
        </div>
        <div>
          <Navbutton />
        </div>
      </div>
    </>
  );
}
