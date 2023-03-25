import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import db from "../db.json";
import {CREATE_USER_EVENTS} from "../constants/constants";

export const getUserEvents = createAsyncThunk('session/getUserEvents',
()=> {
    return fetch(`${CREATE_USER_EVENTS}`)
    .then((res)=>res.json())
    .catch((err)=>console.log(err))
})

export const sessionSlice = createSlice({
    name: 'form',
    initialState: {
        user: {},
        loggedInUser: "",
        isUserLoggedIn: false,
        loggedUserEmail: "",
        events: [],
        total_price: 0,
    },
    reducers: {
        setLoggeduserEmail: (state, action) => {

            if (action.payload) {
                let events = db.events.filter((evt) => evt.email===action.payload)
                let user = db.users.find((usr)=> usr.email === action.payload)
                if (user.email) {
                    state.user = { 
                        "email": user.email, 
                        "username": user.username,
                        "userid": user.id
                    }

                    state.loggedUserEmail = user.email
                    state.loggedInUser = user.username
                }

                if (events.length > 0) {
                    state.events = events

                    let intialValue = 0
                    let total_price = events.reduce((acc, cur)=> {
                        return parseInt(acc) + parseInt(cur.price)
                    }, intialValue)
                    if (total_price) {
                        state.total_price = total_price
                    }
                }

            } else {
                state.loggedUserEmail = action.payload
                state.loggedInUser = action.payload
            }
        },
        setUserSession: (state, action) => {
            state.isUserLoggedIn = action.payload
        },
        setEvents: (state, action) => {
            if (action.payload) {
                state.events.push(action.payload)
            }
            let intialValue = 0
            let total_price = state.events.reduce((acc, cur)=> {
                return parseInt(acc) + parseInt(cur.price)
            }, intialValue)

            if (total_price) {
                state.total_price = total_price
            }
        },
        clearSession: (state) => {
            return {
                users: {},
                loggedInUser: "",
                isUserLoggedIn: false,
                loggedUserEmail: "",
                events: [],
                total_price: 0,
            }
        }
    },
    extraReducers: {
        [getUserEvents.fulfilled]: (state, action) => {
            let events = action.payload.filter((act)=> act.email===state.loggedUserEmail)

            if (events.length > 0) {
                state.user = {
                    "email": events[0].email,
                    "username": events[0].username,
                    "userid": events[0].userid
                }

                state.events = events

                let intialValue = 0
                let total_price = events.reduce((acc, cur)=> {
                    return parseInt(acc) + parseInt(cur.price)
                }, intialValue)

                state.total_price = total_price

                state.loggedInUser = events[0].username
                state.loggedUserEmail = events[0].email
                state.isUserLoggedIn = true
            }
        }
    }
})

export const {
    setLoggeduserEmail,
    setUserSession,
    setEvents,
    clearSession
} = sessionSlice.actions

export default sessionSlice.reducer