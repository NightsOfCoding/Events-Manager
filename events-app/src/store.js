import { configureStore } from '@reduxjs/toolkit'
import  loginSlice from './stores/loginSlice'

export default configureStore({
  reducer: {
    login: loginSlice
  },
})