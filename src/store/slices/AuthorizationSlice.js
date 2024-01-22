import { createSlice } from '@reduxjs/toolkit'

const AUTH_INFO = 'auth'

function getAuthFromLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_INFO))
    } catch (error) {
        console.error(error)
        return null
    }
}

const initialState = {
    access: null,
    refresh: null,
    ID: null,
    email: null,
    name: null,
    surname: null,
    city: null,
    phone: null,
    avatar: null,
    role: null,
};

export const authSlice = createSlice({
    name: 'authReduces',
    initialState: getAuthFromLocalStorage() ?? initialState,

    reducers: {
        setAuth: (state, action) => {
            const {
                access,
                refresh,
                ID,
                email,
                name,
                surname,
                city,
                phone,
                avatar,
                role,
            } = action.payload ?? initialState
            state.access = access
            state.refresh = refresh
            state.ID = ID
            state.email = email
            state.name = name
            state.surname = surname
            state.city = city
            state.phone = phone
            state.avatar = avatar
            state.role = role
            localStorage.setItem(AUTH_INFO, JSON.stringify(state))
        },
    },
});

export const { setAuth } = authSlice.actions

export default authSlice.reducer
