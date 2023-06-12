import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const sadminApi = createApi({
  reducerPath: "sadminApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/StoreAdmin" }),
  tagTypes: ["store_Tran", "dispatch"],

  endpoints: (builder) => ({
    SgetOrders: builder.query({
      query: ({ customer_id, store_id }) =>
        `/Sadmin-Orders?store_id=${store_id}&customer_id=${customer_id}`,
      providesTags: ["dispatch"],
    }),
    SgetRevenue: builder.query({
      query: ({ customer_id, store_id }) =>
        `/Sadmin-getRevenue?store_id=${store_id}`,
      providesTags: ["dispatch"],
    }),
    SgetDispatchOrder: builder.query({
      query: () =>
        `/Sadmin-getDispatchOrders`,
      providesTags: ["dispatch"],
    }),
    getStore: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-getStore`,
        method: "POST",
        body,
      }),
    }),
    dispatchOrder: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-Orders`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["dispatch"],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-updateProfile`,
        method: "POST",
        body,
      }),
    }),
    updateStore: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-updateStore`,
        method: "POST",
        body,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useDispatchOrderMutation,
  useGetStoreMutation,
  useSgetOrdersQuery,
  useSgetRevenueQuery,
  useUpdateProfileMutation,
  useUpdateStoreMutation,
  useSgetDispatchOrderQuery
} = sadminApi;
