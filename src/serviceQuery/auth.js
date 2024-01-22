import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authQuery = createApi({
    reducerPath: 'authQuery',
    tagTypes: ['Auth'],

    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8090/',
    }),

    endpoints: (build) => ({
        loginUser: build.mutation({
            query: (body) => ({
                url: 'auth/login/',
                method: 'POST',
                body,
                headers: {
                    'content-type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
        }),
        registrationUser: build.mutation({
            query: (body) => ({
                url: 'auth/register/',
                method: 'POST',
                body,
                headers: {
                    'content-type': 'application/json',
                },
            }),
            invalidatesTags: [{ type: 'Auth', id: 'LIST' }],
        }),
    }),
});

export const { useLoginUserMutation, useRegistrationUserMutation } = authQuery
