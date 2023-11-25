import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import app from "./slices/apps";
import boxchat from "./slices/boxchat";
export const store = configureStore({
  reducer: {
    app: app,
    botchat: boxchat,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;