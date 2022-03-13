import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import coinSliceReducer from "./coinSlice";
import historySliceReducer from "./historySlice";

export const store = configureStore({
  reducer: {
    coin: coinSliceReducer,
    history: historySliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
