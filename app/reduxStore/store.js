import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/loginSlice";
import usersData from "./features/userData";
import toastNotification from "./features/tostNotification";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersData,
    toastNotification: toastNotification, // ✅ FIXED
  },
});