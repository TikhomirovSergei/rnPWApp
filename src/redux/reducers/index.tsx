import { combineReducers } from "redux";
import { main } from "./mainReducer";
import { user } from "./userReducer";
import { userTransactions } from "./userTransactionsReducer";
import { userList } from "./userListReducer";

const rootReducer = combineReducers({
    main,
    user,
    userTransactions,
    userList,
});

export default rootReducer;
