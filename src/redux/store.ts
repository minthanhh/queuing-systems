import { combineReducers, configureStore } from "@reduxjs/toolkit"
import userReducer from './slices/userSlice'
import deviceReducer from './slices/deviceSlice'
import countReducer from './slices/countSlice'
import serviceReducer from './slices/serviceSlice'
// import { deviceApi } from './services/deviceApi'
// import { setupListeners } from "@reduxjs/toolkit/dist/query"

const rootReducer = combineReducers({
    user: userReducer,
    device: deviceReducer,
    count: countReducer,
    service: serviceReducer
})

const store = configureStore({
    reducer: rootReducer
        // [deviceApi.reducerPath]: deviceApi.reducer
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(deviceApi.middleware)
})

// setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store

