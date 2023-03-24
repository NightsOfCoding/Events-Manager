import { configureStore } from '@reduxjs/toolkit'
import alertsSlice from './stores/alertsSlice'
import formSlice from './stores/formSlice'
import  loginSlice from './stores/loginSlice'
import sessionSlice from './stores/sessionSlice'

export default configureStore({
  reducer: {
    login: loginSlice,
    form: formSlice,
    session: sessionSlice,
    alert: alertsSlice
  },
})