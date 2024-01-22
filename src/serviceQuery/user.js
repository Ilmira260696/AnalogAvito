import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';

export const userQuery = createApi({
    reducerPath: 'userQuery',
    tagTypes: ['User'],
    baseQuery: baseQueryWithReauth,

    endpoints: (build) => ({
        getUser: build.query({
            query: () => '/user',
            providesTags: ['User'],
        }),
        updateUser: build.mutation({
            query: (body) => ({
                url: '/user',
                method: 'PATCH',
                body,
                headers: {
                    'content-type': 'application/json',
                },
            }),
            invalidatesTags: ['User'],
        }),
        updatePassword: build.mutation({
            query: (body) => ({
                url: '/user/password',
                method: 'PUT',
                body: JSON.stringify({
                    password_1: body.password,
                    password_2: body.newPassword,
                }),
                headers: {
                    'content-type': 'application/json',
                },
            }),
            invalidatesTags: ['User'],
        }),
        uploadAvatar: build.mutation({
            query: ({ file }) => {
                const formData = new FormData();
                formData.append('file', file);
                return {
                    url: '/user/avatar',
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['User'],
        }),
    }),
});

export const {
    useGetUserQuery,
    useUpdateUserMutation,
    useUpdatePasswordMutation,
    useUploadAvatarMutation,
} = userQuery;
