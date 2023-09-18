import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://d4de-95-25-239-176.ngrok-free.app/`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    currentUser: builder.query({
      query: () => ({
        url: "auth/current",
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `${Cookies.get("access_jwt_token")}`,
        },
      }),
      providesTags: (result, arg) => [{ type: "User", username: arg }],
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "auth/login",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
        body: JSON.stringify({
          username: userData.username,
          password: userData.password,
        }),
      }),
      invalidatesTags: ["User"],
    }),
    registerUser: builder.mutation({
      query: (userData) => ({
        url: "auth/register",
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          username: `${userData.username}`,
          password: `${userData.password}`,
          mail: `${userData.email}`,
        }),
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    refreshJWT: builder.mutation({
      query: () => ({
        url: "/auth/token/refresh",
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `${Cookies.get("refresh_token")}`,
        },
      }),
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useLazyCurrentUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutMutation,
  useRefreshJWTMutation,
} = userApi;
