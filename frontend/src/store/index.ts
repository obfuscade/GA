import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import projectReducer from "./slices/projectSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
