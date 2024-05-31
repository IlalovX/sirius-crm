import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./slice/modal";
import TeacherDetailReducer from "./slice/teacherDetail";

export const store = configureStore({
  reducer: {
    modal: ModalReducer,
    teacherDetail: TeacherDetailReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
