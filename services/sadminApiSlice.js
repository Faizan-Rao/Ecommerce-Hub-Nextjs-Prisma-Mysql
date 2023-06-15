import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const sadminApi = createApi({
  reducerPath: "sadminApi",

  baseQuery: fetchBaseQuery({ baseUrl: "/api/StoreAdmin" }),

  tagTypes: ["store_Tran", "dispatch", "product", "Category", "Subcategory"],

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
      query: (store_id) => `/Sadmin-getDispatchOrders?store_id=${store_id}`,
      providesTags: ["dispatch"],
    }),
    SgetCategory: builder.query({
      query: (s_id) => `/Sadmin-getCategories?s_id=${s_id}`,
      providesTags: ["Category"]
    }),
    SgetSubcategory: builder.query({
      query: (c_id) => `/Sadmin-getSubcategory?c_id=${c_id}`,
      providesTags: ['Subcategory']
    }),
    SgetProduct: builder.query({
      query: (subId) => `/Sadmin-getProduct?subId=${subId}`,
      providesTags: ["product"],
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
    ScreateProduct: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-Product`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["product"],
    }),
    SupdateProduct: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-Product`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["product"],
    }),
    SdeleteProduct: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-Product`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["product"],
    }),
    ScreateCategory: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-Category`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    SupdateCategory: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-Category`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    SdeleteCategory: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-Category`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Category"],
    }),
    ScreateSubCategory: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-Subcategory`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subcategory"],
    }),
    SupdateSubCategory: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-Subcategory`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Subcategory"],
    }),
    SdeleteSubCategory: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-Subcategory`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Subcategory"],
    }),
    createStore: builder.mutation({
      query: (body) => ({
        url: `/Sadmin-createStore`,
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
  useSgetCategoryQuery,
  useSgetSubcategoryQuery,
  useSgetDispatchOrderQuery,
  useUpdateProfileMutation,
  useUpdateStoreMutation,
  useSgetProductQuery,
  useScreateProductMutation,
  useSdeleteProductMutation,
  useSupdateProductMutation,
  useScreateCategoryMutation,
  useSdeleteCategoryMutation,
  useSupdateCategoryMutation,
  useScreateSubCategoryMutation,
  useSdeleteSubCategoryMutation,
  useSupdateSubCategoryMutation,
  useCreateStoreMutation,
} = sadminApi;
