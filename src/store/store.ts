import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { rootApi } from "services/rtk-query-api";
import searchValReducer from "./searchValueSlice";

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
    searchValue: searchValReducer,
  },
  middleware: (getDefault) => getDefault().concat(rootApi.middleware),
});

export type StoreType = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<StoreType> = useSelector;
export const useTypedDispatch = () => useDispatch<typeof store.dispatch>();
