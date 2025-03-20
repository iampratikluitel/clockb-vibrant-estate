import { configureStore } from "@reduxjs/toolkit";
import { adminConfigurationApi } from "./api/Admin/adminConfiguration";
import { setupListeners } from "@reduxjs/toolkit/query"; 
import { TypedUseSelectorHook, useSelector } from "react-redux"; 
import { publicConfigurationApi } from "./api/Public/publicConfiguration";

export const store = configureStore({
  reducer: {
    [adminConfigurationApi.reducerPath]: adminConfigurationApi.reducer,

    [publicConfigurationApi.reducerPath]: publicConfigurationApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    adminConfigurationApi.middleware,
    publicConfigurationApi.middleware,

  ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
