import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';

const rapidApiUrl = import.meta.env.VITE_RAPID_API_ARTICLE_URL;
const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
const rapidApiHost = import.meta.env.VITE_RAPID_API_ARTICLE_HOST;

export const articleApi = createApi({
  reducerPath: "articleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: rapidApiUrl,
    prepareHeaders: (headers) => {
      headers.set("X-RapidAPI-Key", rapidApiKey);
      headers.set("X-RapidAPI-Host", rapidApiHost);
    },
  }),
  endpoints: (builder) => ({
    getSummary: builder.query({
      query: (params) =>
        `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    }),
  }),
});

export const { useLazyGetSummaryQuery } = articleApi;
