import { configureStore } from "@reduxjs/toolkit"
import dataSlice from "./Slice/dataSlice"
import persistReducer from "redux-persist/es/persistReducer"
import persistStore from "redux-persist/es/persistStore"
import storage from "redux-persist/lib/storage"

const persistConffg = {
    key: 'root',
    storage,
    version:1
}


const persistedReducer = persistReducer(persistConffg, dataSlice)

export const store = configureStore({
    reducer : persistedReducer,
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({serializableCheck: false})
})

export const persistor = persistStore(store)