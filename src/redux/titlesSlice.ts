/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titlesArray: [],
};

export const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    setTitlesAction: (state, action) => {
      state.titlesArray = action.payload;
    },
  },
});

export const { setTitlesAction } = titlesSlice.actions;

export default titlesSlice.reducer;
