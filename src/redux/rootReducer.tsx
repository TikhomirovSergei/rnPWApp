import { combineReducers } from "@reduxjs/toolkit";
import mainSlice from "./mainSlice";
import userSlice from "./userSlice";
import userListSlice from "./userListSlice";
import userTransactionsSlice from "./userTransactionsSlice";

const rootReducer = combineReducers({
    main: mainSlice,
    user: userSlice,
    userList: userListSlice,
    userTransactions: userTransactionsSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
