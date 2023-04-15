import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { rootApi } from "services/rtk-query-api";

export const store = configureStore({
  reducer: {
    [rootApi.reducerPath]: rootApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(rootApi.middleware),
});

export type StoreType = ReturnType<typeof store.getState>;
export const typedSelector: TypedUseSelectorHook<StoreType> = useSelector;
