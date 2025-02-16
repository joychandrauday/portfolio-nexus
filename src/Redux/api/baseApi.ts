import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:3333/api',
        baseUrl: 'https://blog-chronicle-backend.vercel.app/api',
        // baseUrl: 'https://portfolio-one-olive-24.vercel.app',
        credentials: 'include'
    }),
    endpoints: () => ({})
})