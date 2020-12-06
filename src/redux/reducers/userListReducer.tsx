import { AnyAction } from "redux";
import { CLEAR_GET_USER_LIST_ERROR_MESSAGE, GET_USER_LIST_FAILURE, GET_USER_LIST_SUCCESS } from "../types";

export interface IUserState {
    id: number;
    name: string;
}

export interface IUserListState {
    users: IUserState[];
    error: string;
}

const initialState: IUserListState = {
    users: [
        /*{
            id: 100,
            name: "username",
        },*/
    ],
    error: "",
};

export function userList(state = initialState, action: AnyAction) {
    switch (action.type) {
        case GET_USER_LIST_SUCCESS:
            return {
                ...state,
                users: action.payload,
            };
        case GET_USER_LIST_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case CLEAR_GET_USER_LIST_ERROR_MESSAGE:
            return {
                ...state,
                error: "",
            };
        default:
            return state;
    }
}
