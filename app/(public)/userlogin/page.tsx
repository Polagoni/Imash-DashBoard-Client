"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../reduxStore/features/loginSlice";
import { addUser, addUserClient } from "../../reduxStore/features/userData"

const Login = () => {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const dispatch = useDispatch();
    const router = useRouter();

    const [users, setUsers] = useState({
        name: "",
        password: "",
        role: "user"
    });

    useEffect(() => {
        if (isAuthenticated) {
            router.replace("/dashboard");
        }
    }, [isAuthenticated, router]);

    const handleLoginData = (e: any) => {
        const { name, value } = e.target;
        setUsers((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const hadnelRegistartion = () => {
        router.push("/registration")
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(users),
            });

            const data = await response.json();

            if (response.ok) {
                dispatch(loginSuccess());
                dispatch(addUser(data.user));
                dispatch(addUserClient(data.userClients));
                router.replace("/dashboard");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.log("API Error:", error);
        }
    };

    const backNavigation = () => {
        router.push("/")
    }

    return (
        <div className="flex min-h-screen w-full bg-gray-50">
            <div className="hidden lg:block lg:w-1/2 xl:w-2/3 h-screen overflow-hidden ">
                <img
                    src="/admin.jpeg"
                    alt="User background"
                    className="w-full h-full  rounded-r-[30px]"
                />
            </div>

            <div className="w-full lg:w-1/2 xl:w-1/3 flex items-center justify-center p-6 md:p-12 overflow-y-auto">
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col w-full max-w-md gap-6 p-10 rounded-2xl"
                >
                    <div className="flex flex-col gap-2 mb-4">
                        <h2 className="text-3xl font-extrabold text-gray-900 text-center">User Portal</h2>
                        <p className="text-gray-500 text-center">Please enter your credentials to login</p>
                    </div>

                    <div className="flex flex-col gap-1.5 label-input-group">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Name</label>
                        <input
                            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none transition-all"
                            name="name"
                            placeholder="Enter Name"
                            value={users.name}
                            onChange={handleLoginData}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5 label-input-group">
                        <label className="text-sm font-semibold text-gray-700 ml-1">Password</label>
                        <input
                            className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none transition-all"
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            value={users.password}
                            onChange={handleLoginData}
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        <button className="bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md">
                            Sign In
                        </button>

                        <button
                            type="button"
                            className="bg-white text-gray-600 font-medium py-3 rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all"
                            onClick={backNavigation}
                        >
                            Go Back
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
