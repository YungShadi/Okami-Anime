import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "okamiApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://d9a3-95-25-231-9.ngrok-free.app/`,
  }),
  endpoints: (builder) => ({
    currentUser: builder.query({
      query: () => ({
        url: "auth/current",
        method: "GET",
        credentials: "include",
      }),
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
    }),
    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCurrentUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
  useLogoutMutation,
} = userApi;
