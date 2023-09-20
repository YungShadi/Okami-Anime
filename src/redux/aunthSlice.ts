/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { UserDto } from "../types/userDto";

const initialState: UserDto = {
  username: "",
  password: "",
  authorities: ["UNDEFINED"],
};

export const aunthSlice = createSlice({
  name: "aunth",
  initialState,
  reducers: {
    currentUserAction: (state, action) => {
      state.username = action.payload.username;
      state.profilePic = action.payload.profilePic;
      state.email = action.payload.email;
      state.authorities = action.payload.authorities;
    },
    logoutAction: (state) => {
      state.username = "";
      state.profilePic = "";
      state.email = "";
      state.authorities = ["UNDEFINED"];
    },
  },
});

export const { currentUserAction, logoutAction } = aunthSlice.actions;

export default aunthSlice.reducer;
