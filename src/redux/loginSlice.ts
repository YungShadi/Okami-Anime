/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { UserDto } from "../types/userDto";

const initialState: UserDto = {
  username: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "loginSlice",
  initialState,
  reducers: {
    loginAction: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

export const { loginAction } = loginSlice.actions;

export default loginSlice.reducer;
