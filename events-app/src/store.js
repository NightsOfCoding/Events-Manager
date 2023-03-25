import { configureStore, combineReducers } from '@reduxjs/toolkit'
import alertsSlice from './stores/alertsSlice'
import formSlice from './stores/formSlice'
import  loginSlice from './stores/loginSlice'
import sessionSlice from './stores/sessionSlice'
import { persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';


const persistConfig = {
  key: "root",
  version: 1,
  storage
}

const reducer = combineReducers({
    login: loginSlice,
    form: formSlice,
    session: sessionSlice,
    alert: alertsSlice
})

const persistedReducer = persistReducer(persistConfig, reducer)
 
export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})