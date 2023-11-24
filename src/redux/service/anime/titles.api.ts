import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const titlesApi = createApi({
  reducerPath: "titlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://b189-95-25-231-191.ngrok-free.app`,
  }),
  tagTypes: ["titles"],
  endpoints: (builder) => ({
    getTitileById: builder.mutation({
      query: (titleId) => ({
        url: `/anime/${titleId}`,
        method: "GET",
      }),
      invalidatesTags: ["titles"],
    }),
    searchTitle: builder.mutation({
      query: ({ searchValue, page }) => ({
        url: `anime/search/title=${searchValue}&page=${page}`,
        method: "GET",
      }),
      invalidatesTags: ["titles"],
    }),
    getTitles: builder.query({
      query: (page = 0) => ({
        url: `anime/list/page=${page}&limit=18`,
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
  useSearchTitleMutation,
  useLazyGetTitlesQuery,
} = titlesApi;
