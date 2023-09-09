import { configureStore } from "@reduxjs/toolkit";
import { okamiApi } from "./service/okamiApi";

export const store = configureStore({
  reducer: {
    [okamiApi.reducerPath]: okamiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(okamiApi.middleware),
});

export default store;
