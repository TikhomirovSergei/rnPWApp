import { combineReducers } from "redux";
import { main } from "./mainReducer";
import { user } from "./userReducer";
import { userTransactions } from "./userTransactionsReducer";
import { journal } from "./journalReducer";

const rootReducer = combineReducers({
    main,
    user,
    userTransactions,
    journal,
});

export default rootReducer;
