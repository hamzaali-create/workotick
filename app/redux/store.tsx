import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { AuthApi } from './services/auth';

// ✅ Store configuration
export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware),
});

// ✅ TypeScript ke liye RootState & AppDispatch nikalna zaruri hota hai
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
