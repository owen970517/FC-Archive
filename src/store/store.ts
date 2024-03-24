import { configureStore } from "@reduxjs/toolkit";
import matchSlice from "./matchSlice";
import userSlice from "./userSlice";

export const store = configureStore({
    reducer : {
        user : userSlice,
        matches : matchSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch