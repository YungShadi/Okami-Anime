import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./service/user/user.api";
import authReducer from "./aunthSlice";
import mobileReducer from "./mobileSlcie";
import captchaSlice from "./capthcaSlice";
import errorSlice from "./errorSlice";
import feedbackSlice from "./feedbackSlice";
import paginationSlice from "./paginationSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    mobile: mobileReducer,
    captcha: captchaSlice,
    error: errorSlice,
    feedback: feedbackSlice,
    pagination: paginationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
