import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./service/user/user.api";
import { titlesApi } from "./service/anime/titles.api";
import authReducer from "./aunthSlice";
import mobileReducer from "./mobileSlcie";
import captchaSlice from "./capthcaSlice";
import feedbackSlice from "./feedbackSlice";
import paginationSlice from "./paginationSlice";
import titlesSlice from "./titlesSlice";
import filterSlice from "./filterSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [titlesApi.reducerPath]: titlesApi.reducer,
    auth: authReducer,
    mobile: mobileReducer,
    captcha: captchaSlice,
    feedback: feedbackSlice,
    pagination: paginationSlice,
    titles: titlesSlice,
    filter: filterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, titlesApi.middleware]),
});

export default store;
