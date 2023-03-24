import { createSlice } from '@reduxjs/toolkit'

export const loginSlice = createSlice({
    name: 'login',
    initialState: {
        loggedIn: false,
        isLogin: true,
        username: "",
        email: "",
        password: "",
        error_msg: "",
        success_msg: ""
    },
    reducers: {
        setIsLoginTrue: (state) => {
            return {
                loggedIn: false,
                isLogin: true,
                username: "",
                email: "",
                password: "",
                error_msg: "",
                success_msg: ""
            }
        },
        setIsLoginFalse: (state) => {
            return {
                loggedIn: false,
                isLogin: false,
                username: "",
                email: "",
                password: "",
                error_msg: "",
                success_msg: ""
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
        },
        setSuccessMsg: (state, action) => {
            state.success_msg = action.payload
        },
        setLoggedIn: (state, action) => {
            state.loggedIn = action.payload
        },
        setInputs: (state, action) => {
            state.email = action.payload.email
            state.username = action.payload.username
            state.password = action.payload.password
        }
    },
})

export const { 
    setIsLoginTrue, 
    setIsLoginFalse, 
    setEmail, 
    setPassword, 
    setUsername,
    setErrorMsg,
    setSuccessMsg,
    setLoggedIn,
    setInputs
} = loginSlice.actions

export default loginSlice.reducer