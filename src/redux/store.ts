import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from './features/userSlice'
import deviceReducer from './features/deviceSlice'
import countReducer from './features/countSlice'

const rootReducer = combineReducers({
    user: userReducer,
    device: deviceReducer,
    count: countReducer
})

const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store