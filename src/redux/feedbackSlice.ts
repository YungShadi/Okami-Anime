/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { FeedbackDto } from "../types/feedbackDto";

const initialState: FeedbackDto = {
  isFeedbackOpen: true,
};

export const feedbackSlice = createSlice({
  name: "feedbeack",
  initialState,
  reducers: {
    toggleFeedbeackAction: (state, action) => {
      state.isFeedbackOpen = action.payload;
    },
  },
});

export const { toggleFeedbeackAction } = feedbackSlice.actions;

export default feedbackSlice.reducer;
