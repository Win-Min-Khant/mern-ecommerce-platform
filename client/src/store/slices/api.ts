import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseUrl = import.meta.env.VITE_MODE === "development" ? import.meta.env.VITE_LOCAL_API_URL : import.meta.env.VITE_API_URL;
// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({ baseUrl, credentials: "include"}),
  tagTypes: ['User'],
  endpoints: () => ({})
})