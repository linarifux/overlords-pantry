import { PRODUCTS_URL } from '../constants'; // Ensure UPLOAD_URL is imported or defined
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: PRODUCTS_URL,
      }),
      keepUnusedDataFor: 5,
      providesTags: ['Products'],
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    
    // --- FIX START ---
    createProduct: builder.mutation({
      query: (data) => ({  // 1. Accept 'data' argument
        url: PRODUCTS_URL,
        method: 'POST',
        body: data,        // 2. Pass 'data' as the body
      }),
      invalidatesTags: ['Product'], 
    }),
    // --- FIX END ---

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Products'],
    }),
    
    // Make sure this matches your backend route (e.g., /api/upload)
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `/api/upload`, 
        method: 'POST',
        body: data,
      }),
    }),
    
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: 'DELETE',
      }),
    }),
    getTopProducts: builder.query({
      query: () => ({
        url: `${PRODUCTS_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useDeleteProductMutation,
  useGetTopProductsQuery,
} = productsApiSlice;