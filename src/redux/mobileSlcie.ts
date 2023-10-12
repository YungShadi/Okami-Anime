/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { MobileDto } from "../types/mobileDto";

const initialState: MobileDto = {
  isMenuOpened: false,
  isSearchOpened: false,
  isFilterOpened: false,
};

export const aunthSlice = createSlice({
  name: "aunth",
  initialState,
  reducers: {
    toggleMenuAction: (state, action) => {
      state.isMenuOpened = action.payload;
    },
    toggleSearchAction: (state, action) => {
      state.isSearchOpened = action.payload;
    },
    toggleFilterAction: (state, action) => {
      state.isFilterOpened = action.payload;
    },
  },
});
export const { toggleMenuAction, toggleSearchAction, toggleFilterAction } =
  aunthSlice.actions;

export default aunthSlice.reducer;
