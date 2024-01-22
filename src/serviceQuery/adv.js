import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReauth from './baseQueryWithReauth';

export const adsQuery = createApi({
    reducerPath: 'adsQuery',
    tagTypes: ['AdsUser', 'Ads', 'Adv', 'Comments'],
    baseQuery: baseQueryWithReauth,

    endpoints: (build) => ({
        getAdsAll: build.query({
            query: () => '/ads',
            providesTags: ['Ads'],
        }),
        getAdv: build.query({
            query: (id) => `/ads/${id}`,
            providesTags: ['Adv'],
        }),
        getAdsUser: build.query({
            query: () => '/ads/me',
            providesTags: ['AdsUser'],
        }),
        addNewAdvText: build.mutation({
            query: (body) => ({
                url: '/adstext',
                method: 'POST',
                body,
                headers: {
                    'content-type': 'application/json',
                },
            }),
            invalidatesTags: ['Ads', 'AdsUser', 'Adv'],
        }),
        updateAdv: build.mutation({
            query: (body) => ({
                url: `/ads/${body.id}`,
                method: 'PATCH',
                body: JSON.stringify({
                    title: body.title,
                    description: body.description,
                    price: body.price,
                }),
                headers: {
                    'content-type': 'application/json',
                },
            }),
            invalidatesTags: ['Ads', 'AdsUser', 'Adv'],
        }),
        deleteAdv: build.mutation({
            query: ({ id }) => ({
                url: `/ads/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Ads', 'AdsUser', 'Adv'],
        }),
        uploadImageAdv: build.mutation({
            query: ({ image, id }) => {
                const formData = new FormData();
                formData.append('file', image);

                return {
                    url: `/ads/${id}/image`,
                    method: 'POST',
                    body: formData,
                };
            },
            invalidatesTags: ['Ads', 'AdsUser', 'Adv'],
        }),
        deleteImageAdv: build.mutation({
            query: ({ url, id }) => ({
                url: `/ads/${id}/image`,
                params: {
                    file_url: url,
                },
                method: 'DELETE',
            }),
            invalidatesTags: ['Ads', 'AdsUser', 'Adv'],
        }),
        getCommentsAdv: build.query({
            query: (id) => `/ads/${id}/comments`,
            providesTags: ['Comments'],
        }),
        createComment: build.mutation({
            query: (body) => ({
                url: `/ads/${body.id}/comments`,
                method: 'POST',
                body: JSON.stringify({
                    text: body.text,
                }),
                headers: {
                    'content-type': 'application/json',
                },
            }),
            invalidatesTags: ['Comments'],
        }),
    }),
});

export const {
    useGetAdsAllQuery,
    useGetAdvQuery,
    useGetAdsUserQuery,
    useAddNewAdvTextMutation,
    useUpdateAdvMutation,
    useDeleteAdvMutation,
    useUploadImageAdvMutation,
    useDeleteImageAdvMutation,
    useGetCommentsAdvQuery,
    useCreateCommentMutation,
} = adsQuery;
