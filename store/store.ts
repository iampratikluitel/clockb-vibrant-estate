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
import { adminTestimonialsApi } from "./api/Admin/adminTestimonials";
import { publicTestimonailsApi } from "./api/Public/publicTestimonails";
import { adminUpcommingProjectApi } from "./api/Admin/adminUpcommingProject";
import { adminTermsAndConditionsApi } from "./api/Admin/adminTermsAndCondition";
import { adminNewsInsightsApi } from "./api/Admin/adminNewsInsight";
import { publicNewsInsightsApi } from "./api/Public/publicNewsInsight";
import { adminPartnerApi } from "./api/Admin/adminPartner";

export const store = configureStore({
  reducer: {
    [adminConfigurationApi.reducerPath]: adminConfigurationApi.reducer,
    [adminAboutApi.reducerPath]: adminAboutApi.reducer,
    [adminFaqApi.reducerPath]: adminFaqApi.reducer,
    [adminMemberApi.reducerPath]: adminMemberApi.reducer,
    [adminPartnerApi.reducerPath]: adminPartnerApi.reducer,
    [adminTestimonialsApi.reducerPath]: adminTestimonialsApi.reducer,
    [adminUpcommingProjectApi.reducerPath]: adminUpcommingProjectApi.reducer,
    [adminTermsAndConditionsApi.reducerPath]: adminTermsAndConditionsApi.reducer,
    [adminNewsInsightsApi.reducerPath]: adminNewsInsightsApi.reducer,


    [publicConfigurationApi.reducerPath]: publicConfigurationApi.reducer,
    [publicFunctionsApi.reducerPath]: publicFunctionsApi.reducer,
    [publicAboutApi.reducerPath]: publicAboutApi.reducer,
    [publicTestimonailsApi.reducerPath]: publicTestimonailsApi.reducer,
    [publicNewsInsightsApi.reducerPath]: publicNewsInsightsApi.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    adminConfigurationApi.middleware,
    adminAboutApi.middleware,
    adminMemberApi.middleware,
    adminFaqApi.middleware,
    adminTestimonialsApi.middleware,
    adminUpcommingProjectApi.middleware,
    adminTermsAndConditionsApi.middleware,
    adminNewsInsightsApi.middleware,
    adminPartnerApi.middleware,

    publicConfigurationApi.middleware,
    publicFunctionsApi.middleware,
    publicAboutApi.middleware,
    publicTestimonailsApi.middleware,
    publicNewsInsightsApi.middleware
  ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
