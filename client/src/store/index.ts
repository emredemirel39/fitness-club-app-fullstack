import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import scheduleSlice from "../slices/scheduleSlice";
import usersSlice from "../slices/usersSlice";

const store = configureStore({
    reducer: {
        user: usersSlice,
        schedule: scheduleSlice
    }
})

export default store;

export type RootState = ReturnType <typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;