"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../reduxStore/features/loginSlice";
import { clearUserData } from "../reduxStore/features/userData";

export default function DashboardPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:5000/api/logout", {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                dispatch(logoutSuccess());
                dispatch(clearUserData());
                router.replace("/");
                router.refresh();
            }
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="">
            <button
                onClick={handleLogout}
                disabled={loading}
                className="px-4 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition"
            >
                {loading ? "Logging out..." : "Logout"}
            </button>
        </div>
    );
}