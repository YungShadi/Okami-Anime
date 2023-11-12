/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  
};
export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    nextPageAction: (state) => {
      state.currentPage++;
    },
    previousPageAction: (state) => {
      state.currentPage--;
    },
    changePageAction: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { changePageAction, nextPageAction, previousPageAction } =
  paginationSlice.actions;

export default paginationSlice.reducer;
