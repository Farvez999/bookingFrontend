import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import userReducer from "./features/userSlice/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
