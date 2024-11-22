"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";

// Define Yup validation schema
const userSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Initialize Next.js router

  // Initialize React Hook Form with Yup resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Submitted", data);
    alert("Login successful!");
    router.push("/Explore/overview"); // Redirect to the dashboard page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 sm:p-6 font-light">
      <div className="flex flex-col items-center w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="text-xl font-semibold text-black">BlumenPay</h2>
          <h2 className="mb-6 text-lg text-center">Log In</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <div className="grid gap-y-4">
            <div>
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
            </div>

            <div>
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
            </div>

            <button
              type="submit"
              className="mt-4 h-10 w-full rounded-md bg-blue-800 text-white hover:bg-blue-950"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
