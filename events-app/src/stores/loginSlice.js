import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: false,
        isLogin: true,
        username: "",
        email: "",
        password: "",
        error_msg: ""
    },
    reducers: {
        setIsLoginTrue: (state) => {
            return {
                ...state,
                isLogin: true,
                username: "",
                email: "",
                password: "",
                error_msg: ""
            }
        },
        setIsLoginFalse: (state) => {
            return {
                ...state,
                isLogin: false,
                username: "",
                email: "",
                password: "",
                error_msg: ""
            }
        },
        setEmail: (state, action) => {
            state.email = action.payload
        },
        setUsername: (state, action) => {
            state.username = action.payload
        },
        setPassword: (state, action) => {
            state.password = action.payload
        },
        setErrorMsg: (state, action) => {
            if (action.payload.msg) {
                state.error_msg = action.payload
            } else {
                state.error_msg = action.payload
            }
        }
    },
})

export const { 
    setIsLoginTrue, 
    setIsLoginFalse, 
    setEmail, 
    setPassword, 
    setUsername,
    setErrorMsg
} = loginSlice.actions

export default loginSlice.reducer