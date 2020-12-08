import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "./rootReducer";

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ immutableCheck: false }), logger, thunk],
});

export type AppDispatch = typeof store.dispatch;

export default store;
