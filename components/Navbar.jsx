"use client";

import React from "react";
import Navbutton from "./Navbutton";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth(); // Access user from AuthContext

  return (
    <>
      <div className="flex px-6 justify-between py-3.5 border-b bg-white">
        <div>
          {user ? (
            <>
              <div className="text-lg font-bold">
                Welcome Back, {user.name || "User"}!
              </div>
              <div>How Are You Doing Today?</div>
            </>
          ) : (
            <>
              <div className="text-lg font-bold">Welcome to BlumenPay</div>
              <div>Please log in to continue.</div>
            </>
          )}
        </div>
        <div>
          <Navbutton />
        </div>
      </div>
    </>
  );
}
