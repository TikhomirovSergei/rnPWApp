import { Dispatch } from "redux";
import { UsersAPI } from "../../api/usersAPI";
import { IUserState } from "../reducers/userListReducer";
import { CLEAR_GET_USER_LIST_ERROR_MESSAGE, GET_USER_LIST_FAILURE, GET_USER_LIST_SUCCESS } from "../types";

export async function getUsers(token: string, dispatch: Dispatch, cb: Function) {
    try {
        const users: IUserState[] = await UsersAPI.getUsers(token);
        dispatch({ type: GET_USER_LIST_SUCCESS, payload: users });
        cb();
    } catch (error) {
        dispatch({ type: GET_USER_LIST_FAILURE, payload: error.response ? error.response.data : error.message });
        cb();
    }
}

export function clearGetUserListErrorMessage(dispatch: Dispatch) {
    dispatch({ type: CLEAR_GET_USER_LIST_ERROR_MESSAGE });
}
