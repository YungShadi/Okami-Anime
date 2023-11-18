import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = "token=9369488b540d3a88695d0407421b3197";

export const titlesApi = createApi({
  reducerPath: "titlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://kodikapi.com/`,
  }),
  tagTypes: ["titles"],
  endpoints: (builder) => ({
    getTitles: builder.query({
      query: () =>
        `list?${token}&limit=12&types=anime-serial%2Canime&with_material_data=true&has_field=rating_mpaa`,
    }),
    getTitileById: builder.mutation({
      query: (titleId) => ({
        url: `search?${token}&id=${titleId}&with_material_data=true`,
        method: "GET",
      }),
    }),
    searchTitle: builder.mutation({
      query: (searchValue) => ({
        url: `search?${token}&title=${searchValue}&with_material_data=true`,
        method: "GET",
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
