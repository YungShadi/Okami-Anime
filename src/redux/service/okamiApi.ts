import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const okamiApi = createApi({
  reducerPath: "okamiApi",
  baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:8080/` }),
  endpoints: (builder) => ({
    currentUser: builder.query({
      query: () => ({
        url: "auth/current",
        method: "GET",
      }),
    }),
    loginUser: builder.mutation({
      query: (userData) => ({
        url: "auth/login",
        headers: {
          "Content-Type": "application/json",
        },
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
  }),
});

export const {
  useCurrentUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} = okamiApi;
