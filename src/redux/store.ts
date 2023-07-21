import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from './slices/userSlice'
import deviceReducer from './slices/deviceSlice'
import countReducer from './slices/countSlice'
import serviceReducer from './slices/serviceSlice'
import roleReducer from './slices/roleSlice'
import accountReducer from './slices/accountSlice'
import numberReducer from './slices/numberSlice'
import userLogsReducer from './slices/userLogsSlice'
import notifyReducer from './slices/notifySlice'
import chartReducer from './slices/chartSlice'


const rootReducer = combineReducers({
    user: userReducer,
    device: deviceReducer,
    count: countReducer,
    service: serviceReducer,
    role: roleReducer,
    account: accountReducer,
    number: numberReducer,
    userLogs: userLogsReducer,
    notify: notifyReducer,
    chart: chartReducer
})

const store = configureStore({
    reducer: rootReducer
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

