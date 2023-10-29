import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./service/user/user.api";
import authReducer from "./aunthSlice";
import mobileReducer from "./mobileSlcie";
import captchaSlice from "./capthcaSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
    mobile: mobileReducer,
    captcha: captchaSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
