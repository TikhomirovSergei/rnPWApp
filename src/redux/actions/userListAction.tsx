import { Dispatch } from "redux";
import { Http } from "../../api/http";
import {
    CLEAR_GET_USER_LIST_ERROR_MESSAGE,
    GET_USER_LIST,
    GET_USER_LIST_FAILURE,
    GET_USER_LIST_SUCCESS,
} from "../types";

export async function getUsers(token: string, dispatch: Dispatch) {
    dispatch({ type: GET_USER_LIST });
    try {
        const data = await Http.getUsers(token);
        dispatch({ type: GET_USER_LIST_SUCCESS, payload: data });
    } catch (e) {
        console.log(e);
        dispatch({ type: GET_USER_LIST_FAILURE, payload: String(e) });
    }
}

export function clearGetUserListErrorMessage(dispatch: Dispatch) {
    dispatch({ type: CLEAR_GET_USER_LIST_ERROR_MESSAGE });
}
