import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

const token = "token=9369488b540d3a88695d0407421b3197";

export const titlesApi = createApi({
  reducerPath: "titlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://0d34-95-25-231-191.ngrok-free.app`,
  }),
  tagTypes: ["titles"],
  endpoints: (builder) => ({
    // getTitles: builder.query({
    //   query: () =>
    //     `list?${token}&limit=18&types=anime-serial%2Canime&with_material_data=true&has_field=rating_mpaa`,
    // }),
    getTitileById: builder.mutation({
      query: (titleId) => ({
        url: `/anime/${titleId}`,
        method: "GET",
      }),
    }),
    searchTitle: builder.mutation({
      query: (searchValue) => ({
        url: `anime/search/title=${searchValue}&page=0`,
        method: "GET",
      }),
    }),
    getTitles: builder.query({
      query: () => ({
        url: "anime/list/page=0&limit=18",
        method: "GET",
        credentials: "include",
        headers: {
          authorization: `${Cookies.get("access_jwt_token")}`,
        },
      }),
    }),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const {
  useGetTitlesQuery,
  useGetTitileByIdMutation,
  useSearchTitleMutation,
} = titlesApi;
