import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setAuth } from '../store/slices/AuthorizationSlice';

const baseQueryWithReauth = async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: 'http://localhost:8090/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.access;

            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    });

    const result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status !== 401) {
        return result;
    }
    const logOut = () => {
        localStorage.removeItem('auth');
        api.dispatch(setAuth(null));
    };

    const { auth } = api.getState();
    console.log('authBaseQuery', auth);

    if (!auth.refresh) {
        return logOut();
    }
    const refreshToken = await baseQuery(
        {
            url: 'auth/login/',
            method: 'PUT',
            body: {
                access_token: auth.access,
                refresh_token: auth.refresh,
            },
            headers: {
                'content-type': 'application/json',
            },
        },
        api,
        extraOptions,
    );
    if (!refreshToken.data.access_token) {
        return logOut();
    }
    api.dispatch(
        setAuth({
            ...auth,
            access: refreshToken.data?.access_token,
            refresh: refreshToken.data?.refresh_token,
        }),
    );

    const retryResult = await baseQuery(args, api, extraOptions);

    if (retryResult?.error?.status === 401) {
        return logOut();
    }
    return retryResult;
};

export default baseQueryWithReauth;
