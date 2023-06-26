import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "userApi",
  

  baseQuery: fetchBaseQuery({ baseUrl: "/api/User" }),
  tagTypes:['prod_Tran'],
  endpoints: (builder) => ({
    getRecommended: builder.query({
      query: () => `/User_getPopularProduct`,
    }),
    getStores: builder.query({
      query: () => `/User_getAllStore`,
    }),
    getAllProduct: builder.query({
      query: () => `/User_getAllProduct`,
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
    getOrders: builder.query({
      query: (customer_id) =>
        `/User_Orders?customer_id=${customer_id}`,
      providesTags: ['prod_Tran'],
    }),
    getFeatured: builder.query({
      query: () =>
        `/User_FeaturedProducts`,
    }),
    dynamicSearch: builder.query({
      query: ({ search, minPrice, maxPrice }) =>
        `/User_DynamicSearch?search=${search}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    }),
    UserFeedback: builder.mutation({
      query: (body) => ({
        url: `/User_Feedback`,
        method: "POST",
        body,
      }),
     
    }),
    UserLogin: builder.mutation({
      query: (body) => ({
        url: `/User_Login`,
        method: "POST",
        body,
      }),
    }),
    UserSignup: builder.mutation({
      query: (body) => ({
        url: `/User_Signup`,
        method: "POST",
        body,
      }),
    }),
    
    UserProductTran: builder.mutation({
      query: (body) => ({
        url: `/User_ProductTransaction`,
        method: "POST",
        body,
      }),
      invalidatesTags:['prod_Tran']
    }),
    removeOrder: builder.mutation({
      query: (body) => ({
        url: `/User_Orders`,
        method: "POST",
        body,
      }),
      invalidatesTags:['prod_Tran']
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
  useGetProductDetailQuery,
  useGetAllProductQuery,
  useDynamicSearchQuery,
  useUserLoginMutation,
  useUserSignupMutation,
  useUserFeedbackMutation,
  useUserProductTranMutation,
  useGetOrdersQuery,
  useRemoveOrderMutation,
  useGetFeaturedQuery,
} = userApi;
