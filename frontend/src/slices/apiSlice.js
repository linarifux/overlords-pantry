import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

export const apiSlice = createApi({
  baseQuery,
  // We define "tags" for caching invalidation
  // If we add a new Product, we tell Redux "Product" data is stale, fetch it again.
  tagTypes: ['Product', 'Order', 'User'],
  endpoints: (builder) => ({}), // We inject endpoints in separate files
});