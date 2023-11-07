import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./service/user/user.api";
import authReducer from "./aunthSlice";
import mobileReducer from "./mobileSlcie";
import captchaSlice from "./capthcaSlice";
import errorSlice from "./errorSlice";
import feedbackSlice from "./feedbackSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    mobile: mobileReducer,
    captcha: captchaSlice,
    error: errorSlice,
    feedback: feedbackSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
