"use client"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setToastNotification } from "../reduxStore/features/tostNotification";

const ToastNotification = () => {
    const dispatch = useDispatch();
    const { status, message } = useSelector(
        (state: any) => state.toastNotification
    );


    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(setToastNotification({ status: "", message: "" }));
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    if (!message) return null;

    return (
        <div className="fixed top-6 right-10 z-50">
            <div
                className={`px-4 py-4 w-[300px] rounded-lg shadow-lg text-white flex items-center gap-2
          ${status === "success" ? "bg-green-200" : "bg-red-200"}`}
            >
                {/* Icon */}
                <span>
                    {status === "success" ? (
                        <>
                            <h1 className="text-gray-500 text-[18px]">
                                <svg className="w-6 h-6 text-gray-800 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </h1>
                        </>
                    ) : (
                        <>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 9-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                        </>
                    )}
                </span>

                {/* Message */}
                <p className="font-medium">
                    <h1 className="text-gray-500 text-[18px]">
                        {message}
                    </h1>
                </p>
            </div>
        </div>
    );
};

export default ToastNotification;