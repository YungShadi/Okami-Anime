import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./service/user/user.api";
import { titlesApi } from "./service/anime/titles.api";
import authReducer from "./aunthSlice";
import mobileReducer from "./mobileSlcie";
import captchaSlice from "./capthcaSlice";
import errorSlice from "./errorSlice";
import feedbackSlice from "./feedbackSlice";
import paginationSlice from "./paginationSlice";
import titlesSlice from "./titlesSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [titlesApi.reducerPath]: titlesApi.reducer,
    auth: authReducer,
    mobile: mobileReducer,
    captcha: captchaSlice,
    error: errorSlice,
    feedback: feedbackSlice,
    pagination: paginationSlice,
    titles: titlesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([userApi.middleware, titlesApi.middleware]),
});

export default store;
