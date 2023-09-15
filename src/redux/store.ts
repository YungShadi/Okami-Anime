import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./service/user/user.api";
import authReducer from "./aunthSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
