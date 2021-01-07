import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { authReducer, AUTH_FEATURE_KEY } from "./auth.slice";

export const store = configureStore({
    reducer: {
        [AUTH_FEATURE_KEY]: authReducer
    },
    // Additional middleware can be passed to this array
    middleware: [...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
    // Optional Redux store enhancers
    enhancers: []
});
