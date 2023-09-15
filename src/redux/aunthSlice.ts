/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { UserDto } from "../types/userDto";

const initialState: UserDto = {
  username: "",
  password: "",
  logined: false,
};

export const aunthSlice = createSlice({
  name: "aunth",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.username = action.payload.username;
      state.profilePic = action.payload.profilePic;
      state.email = action.payload.email;
      state.logined = true;
    },
    currentUserAction: (state, action) => {
      state.username = action.payload.username;
      state.profilePic = action.payload.profilePic;
      state.email = action.payload.email;
      state.logined = action.payload.logined;
    },
    logoutAction: (state) => {
      state.username = "";
      state.profilePic = "";
      state.email = "";
      state.logined = false;
    },
  },
});

export const { loginAction, currentUserAction, logoutAction } =
  aunthSlice.actions;

export default aunthSlice.reducer;
