/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState: { isMenuOpened: boolean; isSearchOpened: boolean } = {
  isMenuOpened: false,
  isSearchOpened: false,
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
  },
});
export const { toggleMenuAction, toggleSearchAction } = aunthSlice.actions;

export default aunthSlice.reducer;
