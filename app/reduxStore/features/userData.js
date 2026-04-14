import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userClients: []
};

const usersData = createSlice({
  name: "clients",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    setUserClients: (state, action) => {
      state.userClients = action.payload;
    },
    addUserClient: (state, action) => {
      state.userClients.push(action.payload);
    },
    clearUserData: (state) => {
      state.users = [];
      state.userClients = [];
    }
  }
});

export const {
  setUsers,
  addUser,
  setUserClients,
  addUserClient,
  clearUserData
} = usersData.actions;

export default usersData.reducer;
