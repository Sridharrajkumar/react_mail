import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    token: localStorage.getItem('token') || null,
    userId: '',
    isLogged: false,
    
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action) => {
            const { token, user } = action.payload;
            state.token = token;
            state.userId = user;
            state.isLogged = true;
            localStorage.setItem('token', token)
            localStorage.setItem('user', user)
        },
        logOut: (state) => {
            state.token = null;
            state.userId = null;
            state.isLogged = false;
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }
})

export const AuthActions = AuthSlice.actions;

export default AuthSlice.reducer;

