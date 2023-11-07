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
      state.amountOfErrors++;
    },
    removeErrorAction: (state, action) => {
      state.errorObj = state.errorObj.filter(
        (error) => error.index !== action.payload
      );
      state.amountOfErrors--;
    },
  },
});

export const { addErrorAction, removeErrorAction } = errorSlice.actions;

export default errorSlice.reducer;
