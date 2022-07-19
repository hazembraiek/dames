import { configureStore } from "@reduxjs/toolkit";
import Board from "./slices/board";

const store = configureStore({
  reducer: {
    Board: Board.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
