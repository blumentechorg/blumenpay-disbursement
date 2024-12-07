"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import axios from "../lib/axiosInstance";
import Cookies from "js-cookie";
import { useAuth } from "@/context/AuthContext";
import { userSchema } from "@/validation/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post("/Identity/Login", data);
      const { token, user } = response.data;

      Cookies.set("authToken", token, { secure: true, sameSite: "Strict" });
      localStorage.setItem("user", JSON.stringify(user));
      login(user, token);
      router.push("/Explore/overview");
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 font-light">
      <div className="flex flex-col items-center w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-black">BlumenPay</h2>
        <h2 className="mb-6 text-lg text-center">Log In</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid gap-y-4">
            <input
              type="text"
              id="username"
              {...register("username")}
              placeholder="Email"
              className="h-10 w-full rounded-md border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                {...register("password")}
                placeholder="Enter your password"
                className="h-10 w-full rounded-md border border-gray-300 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <span
                className="absolute right-3 top-2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </span>
            </div>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
            <button
              type="submit"
              className="mt-4 h-10 w-full rounded-md bg-blue-800 text-white hover:bg-blue-950 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <ToastContainer position="top-right" autoClose={5000} theme="colored" />
      </div>
    </div>
  );
};

export default SignInForm;
