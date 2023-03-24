import { createSlice } from '@reduxjs/toolkit'

export const formSlice = createSlice({
    name: 'form',
    initialState: {
        eventName: "",
        eventDate: "",
        eventDesc: "",
        eventPrice: "",
        eventType: "",
        eventTC: false,
    },
    reducers: {
        setEventName: (state, action) => {
            state.eventName = action.payload
        },
        setEventDate: (state, action) => {
            state.eventDate = action.payload
        },
        setEventDesc: (state, action) => {
            state.eventDesc = action.payload
        },
        setEventPrice: (state, action) => {
            state.eventPrice = action.payload
        },
        setEventType: (state, action) => {
            state.eventType = action.payload
        },
        setEventTc: (state, action) => {
            console.log(action.payload)
            state.eventTC = !state.eventTC
        },
        clearForm: (state) => {
            return {
                ...state,
                eventName: "",
                eventDate: "",
                eventDesc: "",
                eventPrice: "",
                eventType: "",
                eventTC: false,
            }
        }
    },
})

export const { 
    setEventName,
    setEventDate,
    setEventDesc,
    setEventPrice,
    setEventType,
    setEventTc
} = formSlice.actions

export default formSlice.reducer