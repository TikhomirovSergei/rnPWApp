import { combineReducers } from "redux";
import { main } from "./mainReducer";
import { user } from "./userReducer";
import { journal } from "./journalReducer";

const rootReducer = combineReducers({
    main,
    user,
    journal,
});

export default rootReducer;
