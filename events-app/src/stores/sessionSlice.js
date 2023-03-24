import { createSlice } from '@reduxjs/toolkit'
import db from "../db.json"
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
                db.users.forEach((user) => {

                    if (user.email === action.payload) {
                        state.loggedUserEmail = user.email
                        state.loggedInUser = user.username
                        state.events = user.events

                        let total_price = user.events.reduce((acc, cur)=> {
                            return parseInt(acc) + parseInt(cur.price)
                        }, state.total_price)

                        if (total_price) {
                            state.total_price =  total_price
                        }

                        state.user = {
                            "email": user.email,
                            "username": user.username,
                            "password": user.password,
                            "events": user.events,
                            "id": user.id
                        }
                    }
                })

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
})

export const {
    setLoggeduserEmail,
    setUserSession,
    setEvents,
    clearSession
} = sessionSlice.actions

export default sessionSlice.reducer