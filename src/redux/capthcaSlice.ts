/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { CapthcaDto } from "../types/captchaDto";

const initialState: CapthcaDto = {
  isCaptchaDone: false,
  showCaptcha: false,
};

export const captchaSlice = createSlice({
  name: "capthca",
  initialState,
  reducers: {
    toggleCaptchaAction: (state, action) => {
      state.showCaptcha = action.payload;
    },
    isCaptchaDoneAction: (state, action) => {
      state.isCaptchaDone = action.payload;
    },
  },
});

export const { toggleCaptchaAction, isCaptchaDoneAction } =
  captchaSlice.actions;

export default captchaSlice.reducer;
