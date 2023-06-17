import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const adminApi = createApi({
  reducerPath: "adminApi",

  baseQuery: fetchBaseQuery({ baseUrl: "/api/Admin" }),

  tagTypes: [],

  endpoints: (builder) => ({
    getAdmin: builder.mutation({
      query: (body) => ({
        url: `/Admin-login`,
        method: "POST",
        body,
      }),
    }),
    updateAdmin: builder.mutation({
      query: (body) => ({
        url: `/Admin-UpdateProfile`,
        method: "PUT",
        body,
      }),
    }),
    getStore: builder.query({
      query: () => `/Admin-Store`,
    }),
    getStats: builder.query({
      query: () => `/Admin-Stats`,
    }),
    getCustomers: builder.query({
      query: () => `/Admin-Customer`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAdminMutation, useGetStoreQuery, useGetCustomersQuery, useUpdateAdminMutation, useGetStatsQuery } =
  adminApi;
