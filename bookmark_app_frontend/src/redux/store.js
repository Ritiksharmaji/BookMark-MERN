import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import bookmarkReducer from "./bookmarkSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bookmarks: bookmarkReducer
  },
});

