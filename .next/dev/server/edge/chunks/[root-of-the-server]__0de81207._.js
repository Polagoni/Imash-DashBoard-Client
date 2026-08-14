(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push(["chunks/[root-of-the-server]__0de81207._.js",
"[externals]/node:buffer [external] (node:buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:buffer", () => require("node:buffer"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[project]/Desktop/dash_board/Imash-DashBoard-Client/middleware.ts [middleware-edge] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "middleware",
    ()=>middleware
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$esm$2f$api$2f$server$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/next/dist/esm/api/server.js [middleware-edge] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/next/dist/esm/server/web/exports/index.js [middleware-edge] (ecmascript)");
;
function middleware(request) {
    const token = request.cookies.get("token")?.value;
    const role = request.cookies.get("role")?.value;
    const path = request.nextUrl.pathname;
    console.log("token:", token);
    console.log("role:", role);
    console.log("path:", path);
    // 1️⃣ If NOT logged in → block protected pages
    if (!token) {
        if (path.startsWith("/dashboard") || path.startsWith("/admin") && !path.startsWith("/adminlogin")) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/", request.url));
        }
    }
    // 2️⃣ Logged user trying login page
    if (token && (path === "/" || path.startsWith("/userlogin"))) {
        if (role === "admin") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/admindashboard", request.url));
        }
        if (role === "user") {
            return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
        }
    }
    // 3️⃣ Admin should NOT access user pages
    if (token && role === "admin" && path.startsWith("/dashboard")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/admin", request.url));
    }
    // 4️⃣ User should NOT access admin pages
    if (token && role === "user" && path.startsWith("/admin")) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL("/dashboard", request.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$esm$2f$server$2f$web$2f$exports$2f$index$2e$js__$5b$middleware$2d$edge$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        "/",
        "/userlogin",
        "/register",
        "/dashboard/:path*",
        "/admin/:path*"
    ]
};
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__0de81207._.js.map