import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./services/auth";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
      auth: authReducer,  
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
