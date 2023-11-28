import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";
import BASE_URL from "../URL";

export const titlesApi = createApi({
  reducerPath: "titlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  keepUnusedDataFor: 30,
  tagTypes: ["titles"],
  endpoints: (builder) => ({
    getTitileById: builder.mutation({
      query: (titleId: string) => ({
        url: `/anime/${titleId}`,
        method: "GET",
      }),
      invalidatesTags: ["titles"],
    }),
    getTitles: builder.query({
      query: ({ searchValue, page = 0 }) => ({
        url: `anime/list${
          searchValue
            ? `/search/title=${searchValue}&page=${page}`
            : `/page=${page}`
        }`,
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `${Cookies.get("access_jwt_token")}`,
        },
      }),
      providesTags: (arg) => [{ type: "titles", titles: arg }],
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const {
  useGetTitlesQuery,
  useGetTitileByIdMutation,
  useLazyGetTitlesQuery,
} = titlesApi;
