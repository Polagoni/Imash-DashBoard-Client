"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToastNotification } from "@/app/reduxStore/features/tostNotification";

type UserType = {
  name: string;
  password: string;
};

type ErrorType = {
  name?: string;
  password?: string;
};

const Registration = () => {
  const [users, setUsers] = useState<UserType>({
    name: "",
    password: "",
  });
  const dispatch = useDispatch();

  const [errors, setErrors] = useState<ErrorType>({});
  const router = useRouter();

  // ✅ COMMON VALIDATION FUNCTION
  const validateField = (fieldName: keyof UserType, value: string) => {
    const validators = {
      name: () => {
        if (!value.trim()) return "Name is required";
        if (!/^[A-Za-z ]+$/.test(value))
          return "Only letters allowed";
        if (value.length < 3)
          return "Minimum 3 characters required";
        return "";
      },

      password: () => {
        if (!value.trim()) return "Password is required";
        if (value.length < 6)
          return "Minimum 6 characters required";
        if (!/[A-Z]/.test(value))
          return "At least one uppercase required";
        if (!/[0-9]/.test(value))
          return "At least one number required";
        return "";
      },
    };

    return validators[fieldName]?.() || "";
  };

  // 🔹 Handle Input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUsers((prev) => ({
      ...prev,
      [name]: value,
    }));

    const errorMsg = validateField(name as keyof UserType, value);

    setErrors((prev) => ({
      ...prev,
      [name]: errorMsg,
    }));
  };

  // 🔹 Validate All
  const validateAll = () => {
    let newErrors: ErrorType = {};

    (Object.keys(users) as (keyof UserType)[]).forEach((key) => {
      const errorMsg = validateField(key, users[key]);
      if (errorMsg) newErrors[key] = errorMsg;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 🔹 Submit
  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Registration failed");
        return;
      } else {

        router.push("/userlogin");
        dispatch(setToastNotification({ status: "success", message: data.message }));
      }



      setUsers({ name: "", password: "" });
      setErrors({});
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  // 🔹 Back Button
  const handleBack = () => {
    router.push("/userlogin");
  };




  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex justify-center items-center  min-h-[500px] w-[500px] bg-gray-50 rounded-[20px]">

        <div className="w-full flex items-center justify-center p-2 md:p-5 overflow-y-auto">
          <form
            onSubmit={handleRegistration}
            className="flex flex-col w-full max-w-md gap-6 p-10 rounded-2xl bg-white lg:bg-transparent"
          >
            <div className="flex flex-col gap-2 mb-2">
              <h2 className="text-3xl font-extrabold text-gray-900 text-center">
                Create Account
              </h2>
              <p className="text-gray-500 text-center text-sm">Join our platform by filling out the details below</p>
            </div>

            {/* Name Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Full Name</label>
              <input
                name="name"
                placeholder="Enter your full name"
                value={users.name}
                onChange={handleChange}
                className={`w-full border ${errors.name ? 'border-red-500' : 'border-gray-300'} p-3 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none transition-all`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={users.password}
                onChange={handleChange}
                className={`w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-3 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none transition-all`}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Username Placeholder / Additional Links */}
            {/* <div className="flex justify-between items-center px-1">
              <div className="text-xs text-blue-600 cursor-pointer hover:underline font-medium">
                Forgot Username?
              </div>
            </div> */}

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <button
                onClick={handleRegistration}
                className="bg-green-400 text-white font-bold py-3.5 rounded-xl hover:bg-green-500 active:scale-[0.98] transition-all shadow-md"
              >
                Set Up Account
              </button>

              <button
                type="button"
                onClick={handleBack}
                className="bg-white text-gray-600 font-medium py-3 rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
};

export default Registration;