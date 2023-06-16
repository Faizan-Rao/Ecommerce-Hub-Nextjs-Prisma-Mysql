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
   
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAdminMutation
} = adminApi;
