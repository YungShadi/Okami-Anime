/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  titlesArray: [],
  title: [],
};

export const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    setTitlesAction: (state, action) => {
      console.log("a");
      state.titlesArray = action.payload;
    },
    setCurrentTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitlesAction, setCurrentTitle } = titlesSlice.actions;

export default titlesSlice.reducer;
