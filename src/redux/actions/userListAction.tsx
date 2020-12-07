import { Dispatch } from "redux";
import { UsersAPI } from "../../api/usersAPI";
import { CLEAR_GET_USER_LIST_ERROR_MESSAGE, GET_USER_LIST_FAILURE, GET_USER_LIST_SUCCESS } from "../types";

export async function getUsers(token: string, dispatch: Dispatch, cb: Function) {
    try {
        const data = await UsersAPI.getUsers(token);
        dispatch({ type: GET_USER_LIST_SUCCESS, payload: data });
        cb();
    } catch (error) {
        dispatch({ type: GET_USER_LIST_FAILURE, payload: error.response ? error.response.data : error.message });
        cb();
    }
}

export function clearGetUserListErrorMessage(dispatch: Dispatch) {
    dispatch({ type: CLEAR_GET_USER_LIST_ERROR_MESSAGE });
}
