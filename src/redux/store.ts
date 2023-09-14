import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./service/user/user.api";
import loginReducer from "./loginSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    login: loginReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export default store;
