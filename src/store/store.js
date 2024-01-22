import { configureStore } from '@reduxjs/toolkit'
import authReduces from './slices/AuthorizationSlice'
import adsReduces from './slices/adv'
import { authQuery } from '../serviceQuery/auth'
import { userQuery } from '../serviceQuery/user'
import { adsQuery } from '../serviceQuery/adv'

export const store = configureStore({
    reducer: {
        auth: authReduces,
        ads: adsReduces,
        [authQuery.reducerPath]: authQuery.reducer,
        [userQuery.reducerPath]: userQuery.reducer,
        [adsQuery.reducerPath]: adsQuery.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(authQuery.middleware)
            .concat(userQuery.middleware)
            .concat(adsQuery.middleware),
})
