(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$features$2f$loginSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/features/loginSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$features$2f$userData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/features/userData.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const AdminLogin = ()=>{
    _s();
    const isAuthenticated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"])({
        "AdminLogin.useSelector[isAuthenticated]": (state)=>state.auth.isAuthenticated
    }["AdminLogin.useSelector[isAuthenticated]"]);
    const dispatch = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [admin, setAdmin] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        password: "",
        role: "admin"
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AdminLogin.useEffect": ()=>{
            if (isAuthenticated) {
                router.replace("/admindashboard");
            }
        }
    }["AdminLogin.useEffect"], [
        isAuthenticated,
        router
    ]);
    const handleLoginData = (e)=>{
        const { name, value } = e.target;
        setAdmin((prev)=>({
                ...prev,
                [name]: value
            }));
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(admin)
            });
            const data = await response.json();
            if (response.ok) {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$features$2f$loginSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["loginSuccess"])());
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$features$2f$userData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addUser"])(data.user));
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$features$2f$userData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addUserClient"])(data.userClients));
                router.replace("/admindashboard");
            } else {
                alert(data.message || "Admin Login failed");
            }
        } catch (error) {
            console.log("API Error:", error);
        }
    };
    const backNavigation = ()=>{
        router.push("/");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex min-h-screen w-full bg-gray-50",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "hidden lg:block lg:w-1/2 xl:w-2/3 h-screen overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: "/admin.jpeg",
                    alt: "Admin background",
                    className: "w-full h-full object-cover rounded-r-[30px]"
                }, void 0, false, {
                    fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                    lineNumber: 80,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                lineNumber: 79,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full lg:w-1/2 xl:w-1/3 flex items-center justify-center p-6 md:p-12 overflow-y-auto",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "flex flex-col w-full max-w-md gap-6 p-10 rounded-2xl",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl font-extrabold text-gray-900 text-center",
                                    children: "Admin Portal"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                                    lineNumber: 94,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-500 text-center",
                                    children: "Please enter your credentials to continue"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                                    lineNumber: 95,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                            lineNumber: 93,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5 label-input-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-gray-700 ml-1",
                                    children: "Admin Name"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                                    lineNumber: 99,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none transition-all",
                                    name: "name",
                                    placeholder: "Enter Admin Name",
                                    value: admin.name,
                                    onChange: handleLoginData,
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                                    lineNumber: 100,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                            lineNumber: 98,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1.5  label-input-group",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                    className: "text-sm font-semibold text-gray-700 ml-1",
                                    children: "Password"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                                    lineNumber: 111,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                    className: "w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-300 focus:border-transparent outline-none transition-all",
                                    name: "password",
                                    type: "password",
                                    placeholder: "Enter Password",
                                    value: admin.password,
                                    onChange: handleLoginData,
                                    required: true
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                                    lineNumber: 112,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                            lineNumber: 110,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3 mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: "bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md",
                                    children: "Sign In"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                                    lineNumber: 124,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "bg-white text-black font-medium py-3 rounded-xl border border-gray-200 hover:bg-gray-50 active:scale-[0.98] transition-all",
                                    onClick: backNavigation,
                                    children: "Go Back"
                                }, void 0, false, {
                                    fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                                    lineNumber: 129,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                            lineNumber: 123,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                    lineNumber: 89,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
                lineNumber: 88,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/(public)/adminlogin/page.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(AdminLogin, "9hGn9exZ8kvxUYyGUi8wxyM5LnI=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSelector"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useDispatch"],
        __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = AdminLogin;
const __TURBOPACK__default__export__ = AdminLogin;
var _c;
__turbopack_context__.k.register(_c, "AdminLogin");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=Desktop_dash_board_Imash-DashBoard-Client_fdc4b04f._.js.map