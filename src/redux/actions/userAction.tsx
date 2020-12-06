import { Dispatch } from "redux";
import { Http } from "../../api/http";
import { IUserInfo } from "../reducers/userReducer";
import {
    CLEAR_USER_ERROR_MESSAGE,
    CREATE_TRANSACTION,
    CREATE_TRANSACTION_FAILURE,
    CREATE_TRANSACTION_SUCCESS,
    GET_USER_INFO,
    GET_USER_INFO_FAILURE,
    GET_USER_INFO_SUCCESS,
    SET_USER_ERROR_MESSAGE,
} from "../types";

export async function getUserInfo(token: string, dispatch: Dispatch) {
    dispatch({ type: GET_USER_INFO });
    try {
        const data = await Http.getUserInfo(token);
        const user: IUserInfo = data.user_info_token;
        dispatch({ type: GET_USER_INFO_SUCCESS, payload: user });
    } catch (e) {
        dispatch({ type: GET_USER_INFO_FAILURE, payload: String(e) });
    }
}

export async function createTransaction(token: string, name: string, amount: number, dispatch: Dispatch) {
    dispatch({ type: CREATE_TRANSACTION });
    try {
        await Http.createTransaction(token, name, amount);
        dispatch({ type: CREATE_TRANSACTION_SUCCESS, payload: amount });
    } catch (e) {
        dispatch({ type: CREATE_TRANSACTION_FAILURE, payload: String(e) });
    }
}

export function clearUserErrorMessage(dispatch: Dispatch) {
    dispatch({ type: CLEAR_USER_ERROR_MESSAGE });
}

export function setUserErrorMessage(message: string, dispatch: Dispatch) {
    dispatch({ type: SET_USER_ERROR_MESSAGE, payload: message });
}