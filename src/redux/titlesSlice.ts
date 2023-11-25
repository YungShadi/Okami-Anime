/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { TitlesStateDto } from "../types/titleDto";

const initialState: TitlesStateDto = {
  titlesArray: [],
  title: [],
};

export const titlesSlice = createSlice({
  name: "titles",
  initialState,
  reducers: {
    setTitlesAction: (state, action) => {
      state.titlesArray = action.payload;
    },
    expandTitlesAction: (state, action) => {
      state.titlesArray = [...state.titlesArray, ...action.payload];
    },
    setCurrentTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitlesAction, setCurrentTitle, expandTitlesAction } =
  titlesSlice.actions;

export default titlesSlice.reducer;
