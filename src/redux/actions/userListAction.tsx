import { Dispatch } from "redux";
import { Http } from "../../api/http";
import { CLEAR_GET_USER_LIST_ERROR_MESSAGE, GET_USER_LIST_FAILURE, GET_USER_LIST_SUCCESS } from "../types";

export async function getUsers(token: string, dispatch: Dispatch, cb: Function) {
    try {
        const data = await Http.getUsers(token);
        dispatch({ type: GET_USER_LIST_SUCCESS, payload: data });
        cb();
    } catch (e) {
        console.log(e);
        dispatch({ type: GET_USER_LIST_FAILURE, payload: String(e) });
        cb();
    }
}

export function clearGetUserListErrorMessage(dispatch: Dispatch) {
    dispatch({ type: CLEAR_GET_USER_LIST_ERROR_MESSAGE });
}
