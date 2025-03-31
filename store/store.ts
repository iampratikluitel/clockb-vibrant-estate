import { configureStore } from "@reduxjs/toolkit";
import { adminConfigurationApi } from "./api/Admin/adminConfiguration";
import { setupListeners } from "@reduxjs/toolkit/query"; 
import { TypedUseSelectorHook, useSelector } from "react-redux"; 
import { publicConfigurationApi } from "./api/Public/publicConfiguration";
import { publicFunctionsApi } from "./api/Public/publicFunctions";
import { adminAboutApi } from "./api/Admin/adminAboutPage";
import { publicAboutApi } from "./api/Public/publicAbout";
import { adminMemberApi } from "./api/Admin/adminTeamMember";
import { adminFaqApi } from "./api/Admin/adminFaqs";

export const store = configureStore({
  reducer: {
    [adminConfigurationApi.reducerPath]: adminConfigurationApi.reducer,
    [adminAboutApi.reducerPath]: adminAboutApi.reducer,
    [adminFaqApi.reducerPath]: adminFaqApi.reducer,
    [adminMemberApi.reducerPath]: adminMemberApi.reducer,
    [publicConfigurationApi.reducerPath]: publicConfigurationApi.reducer,
    [publicFunctionsApi.reducerPath]: publicFunctionsApi.reducer,
    [publicAboutApi.reducerPath]: publicAboutApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    adminConfigurationApi.middleware,
    adminAboutApi.middleware,
    adminMemberApi.middleware,
    adminFaqApi.middleware,

    publicConfigurationApi.middleware,
    publicFunctionsApi.middleware,
    publicAboutApi.middleware,
  ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
