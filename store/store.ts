import { configureStore } from "@reduxjs/toolkit";
import { adminConfigurationApi } from "./api/Admin/adminConfiguration";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { publicConfigurationApi } from "./api/Public/publicConfiguration";
import { publicFunctionsApi } from "./api/Public/publicFunctions";
import { adminAboutApi } from "./api/Admin/adminAboutPage";
import { publicAboutApi } from "./api/Public/publicAbout";
import { adminFaqApi } from "./api/Admin/adminFaqs";
import { adminTestimonialsApi } from "./api/Admin/adminTestimonials";
import { publicTestimonailsApi } from "./api/Public/publicTestimonails";
import { adminNewsInsightsApi } from "./api/Admin/adminNewsInsight";
import { publicNewsInsightsApi } from "./api/Public/publicNewsInsight";
import { adminProjectApi } from "./api/Admin/adminProject";
import { publicProjectApi } from "./api/Public/publicProject";
import { publicFaqsApi } from "./api/Public/publicFaq";
import { adminContactApi } from "./api/Admin/adminContact";
import { publicContactApi } from "./api/Public/publicContact";
import { adminDevelopementPhaseApi } from "./api/Admin/adminDevelopmentPhase";
import { publicDevelopementPhaseApi } from "./api/Public/publicDevelopmentPhase";
import { adminMiscsApi } from "./api/Admin/adminMisc";

export const store = configureStore({
  reducer: {
    [adminConfigurationApi.reducerPath]: adminConfigurationApi.reducer,
    [adminAboutApi.reducerPath]: adminAboutApi.reducer,
    [adminFaqApi.reducerPath]: adminFaqApi.reducer,
    [adminTestimonialsApi.reducerPath]: adminTestimonialsApi.reducer,
    [adminNewsInsightsApi.reducerPath]: adminNewsInsightsApi.reducer,
    [adminProjectApi.reducerPath]: adminProjectApi.reducer,
    [adminDevelopementPhaseApi.reducerPath]: adminDevelopementPhaseApi.reducer,
    [adminContactApi.reducerPath]: adminContactApi.reducer,
    [adminMiscsApi.reducerPath]: adminMiscsApi.reducer,

    [publicConfigurationApi.reducerPath]: publicConfigurationApi.reducer,
    [publicFunctionsApi.reducerPath]: publicFunctionsApi.reducer,
    [publicAboutApi.reducerPath]: publicAboutApi.reducer,
    [publicTestimonailsApi.reducerPath]: publicTestimonailsApi.reducer,
    [publicNewsInsightsApi.reducerPath]: publicNewsInsightsApi.reducer,
    [publicProjectApi.reducerPath]: publicProjectApi.reducer,
    [publicFaqsApi.reducerPath]: publicFaqsApi.reducer,
    [publicDevelopementPhaseApi.reducerPath]:
      publicDevelopementPhaseApi.reducer,
    [publicContactApi.reducerPath]: publicContactApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      adminConfigurationApi.middleware,
      adminAboutApi.middleware,
      adminFaqApi.middleware,
      adminTestimonialsApi.middleware,
      adminProjectApi.middleware,
      adminNewsInsightsApi.middleware,
      adminContactApi.middleware,
      adminDevelopementPhaseApi.middleware,
      adminMiscsApi.middleware,

      publicConfigurationApi.middleware,
      publicFunctionsApi.middleware,
      publicAboutApi.middleware,
      publicTestimonailsApi.middleware,
      publicNewsInsightsApi.middleware,
      publicProjectApi.middleware,
      publicFaqsApi.middleware,
      publicContactApi.middleware,
      publicDevelopementPhaseApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
