/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

export interface paginationState {
  currentPage: number;
  titlesArray: {
    titleStatus: string;
    titleAgeRest: string;
    titleName: string;
    titleTags: string[];
  }[];
}
const initialState: paginationState = {
  currentPage: 1,
  titlesArray: [
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
    {
      titleStatus: "вышел",
      titleAgeRest: "21+",
      titleName: "чел",
      titleTags: ["боевик", "драмма", "терентий"],
    },
  ],
};
export const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    nextPageAction: (state) => {
      state.currentPage++;
    },
    nextPageLoadMoreAction: (state) => {
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

export const {
  changePageAction,
  nextPageAction,
  previousPageAction,
  nextPageLoadMoreAction,
} = paginationSlice.actions;

export default paginationSlice.reducer;
