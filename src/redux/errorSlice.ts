/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { ErrorDto } from "../types/errorDto";

const initialState: ErrorDto = {
  errorObj: [],
  amountOfErrors: 0,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    addErrorAction: (state, action) => {
      state.errorObj = [...state.errorObj, action.payload];
      state.amountOfErrors = state.errorObj.length;
    },
    removeErrorAction: (state, action) => {
      state.errorObj.filter((error) => error.index !== action.payload);
      state.errorObj.forEach((error) => {
        if (error.index >= action.payload) error.index--;
      });
      state.amountOfErrors = state.errorObj.length;
    },
  },
});

export const { addErrorAction, removeErrorAction } = errorSlice.actions;

export default errorSlice.reducer;
