import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";



const initialState = {
  isAuthenticated: false,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = loginSlice.actions;
export default loginSlice.reducer;
