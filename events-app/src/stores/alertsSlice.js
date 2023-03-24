import { createSlice } from '@reduxjs/toolkit'

export const alertsSlice = createSlice({
    name: 'form',
    initialState: {
        alertType: "",
        alertMsg: "",
        show: 800,
        hide: true,
    },
    reducers: {
        setAlerts: (state, action) => {
            state.alertType = action.payload.type
            state.alertMsg = action.payload.msg
            state.hide = false
        },
        setAlertTimeOut: (state) => {
            state.alertType = ""
            state.alertMsg = ""
            state.hide = true
        },
        clearAlerts: (state) => {
            return {
                ...state,
                alertType: "",
                alertMsg: "",
            }
        }
    },
})

export const { 
    clearAlerts,
    setAlerts,
    setAlertTimeOut
} = alertsSlice.actions

export default alertsSlice.reducer