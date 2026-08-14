(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/features/loginSlice.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "loginSuccess",
    ()=>loginSuccess,
    "logoutSuccess",
    ()=>logoutSuccess
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$js$2d$cookie$2f$dist$2f$js$2e$cookie$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/js-cookie/dist/js.cookie.mjs [app-client] (ecmascript)");
;
;
const initialState = {
    isAuthenticated: false
};
const loginSlice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state)=>{
            state.isAuthenticated = true;
        },
        logoutSuccess: (state)=>{
            state.isAuthenticated = false;
        }
    }
});
const { loginSuccess, logoutSuccess } = loginSlice.actions;
const __TURBOPACK__default__export__ = loginSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/features/userData.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addUser",
    ()=>addUser,
    "addUserClient",
    ()=>addUserClient,
    "clearUserData",
    ()=>clearUserData,
    "default",
    ()=>__TURBOPACK__default__export__,
    "setUserClients",
    ()=>setUserClients,
    "setUsers",
    ()=>setUsers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    users: [],
    userClients: []
};
const usersData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "clients",
    initialState,
    reducers: {
        setUsers: (state, action)=>{
            state.users = action.payload;
        },
        addUser: (state, action)=>{
            state.users.push(action.payload);
        },
        setUserClients: (state, action)=>{
            state.userClients = action.payload;
        },
        addUserClient: (state, action)=>{
            state.userClients.push(action.payload);
        },
        clearUserData: (state)=>{
            state.users = [];
            state.userClients = [];
        }
    }
});
const { setUsers, addUser, setUserClients, addUserClient, clearUserData } = usersData.actions;
const __TURBOPACK__default__export__ = usersData.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/features/tostNotification.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "setToastNotification",
    ()=>setToastNotification
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
;
const initialState = {
    status: "",
    message: ""
};
const toastNotification = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createSlice"])({
    name: "toastNotification",
    initialState,
    reducers: {
        setToastNotification: (state, action)=>{
            state.status = action.payload.status;
            state.message = action.payload.message;
        }
    }
});
const { setToastNotification } = toastNotification.actions;
const __TURBOPACK__default__export__ = toastNotification.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/store.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "store",
    ()=>store
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$features$2f$loginSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/features/loginSlice.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$features$2f$userData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/features/userData.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$features$2f$tostNotification$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/features/tostNotification.js [app-client] (ecmascript)");
;
;
;
;
const store = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f40$reduxjs$2f$toolkit$2f$dist$2f$redux$2d$toolkit$2e$modern$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["configureStore"])({
    reducer: {
        auth: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$features$2f$loginSlice$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        users: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$features$2f$userData$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
        toastNotification: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$features$2f$tostNotification$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
    }
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/provider.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ReduxProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/node_modules/react-redux/dist/react-redux.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/store.js [app-client] (ecmascript)");
"use client";
;
;
;
function ReduxProvider({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$node_modules$2f$react$2d$redux$2f$dist$2f$react$2d$redux$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Provider"], {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f$dash_board$2f$Imash$2d$DashBoard$2d$Client$2f$app$2f$reduxStore$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/Desktop/dash_board/Imash-DashBoard-Client/app/reduxStore/provider.js",
        lineNumber: 8,
        columnNumber: 5
    }, this);
}
_c = ReduxProvider;
var _c;
__turbopack_context__.k.register(_c, "ReduxProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=Desktop_dash_board_Imash-DashBoard-Client_app_reduxStore_1a1a7e11._.js.map