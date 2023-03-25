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
            state.eventTC = action.payload
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
        },
        setFormData: (state, action) => {
            return {
                eventName: action.payload.eventname,
                eventDate: action.payload.eventdate,
                eventDesc: action.payload.eventdesc,
                eventPrice: action.payload.price,
                eventType: action.payload.eventtype,
                eventTC: action.payload.eventtc,
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
    setEventTc,
    clearForm,
    setFormData
} = formSlice.actions

export default formSlice.reducer