import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: "",
    message: "",
};

const toastNotification = createSlice({
    name: "toastNotification",
    initialState,
    reducers: {
        setToastNotification: (state, action) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
        },
    },
});

export const { setToastNotification } = toastNotification.actions;
export default toastNotification.reducer;