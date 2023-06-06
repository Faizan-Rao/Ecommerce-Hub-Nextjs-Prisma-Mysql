import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/User" }),
  endpoints: (builder) => ({
    getRecommended: builder.query({
      query: () => `/User_getPopularProduct`,
    }),
    getStores: builder.query({
      query: () => `/User_getAllStore`,
    }),
    getCategory: builder.query({
      query: (storeId) => `/User_getSpecificCategory?storeId=${storeId}`,
    }),
    getSubCategory: builder.query({
      query: (catId) => `/User_getSubCategory?catId=${catId}`,
    }),
    getProduct: builder.query({
      query: (subCatId) => `/User_getSpecificProduct?subCatId=${subCatId}`,
    }),
    getProductDetail: builder.query({
      query: (prodId) => `/User_ProductDetail?prodId=${prodId}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetRecommendedQuery,
  useGetStoresQuery,
  useGetCategoryQuery,
  useGetSubCategoryQuery,
  useGetProductQuery,
  useGetProductDetailQuery
} = userApi;
