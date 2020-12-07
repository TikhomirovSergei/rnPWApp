import { Dispatch } from "redux";
import { ProfileAPI } from "../../api/profileAPI";
import { TransactionsAPI } from "../../api/transactionsAPI";
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
        const user: IUserInfo = await ProfileAPI.getUserInfo(token);
        dispatch({ type: GET_USER_INFO_SUCCESS, payload: user });
    } catch (error) {
        dispatch({ type: GET_USER_INFO_FAILURE, payload: error.response ? error.response.data : error.message });
    }
}

export async function createTransaction(token: string, name: string, amount: number, dispatch: Dispatch) {
    dispatch({ type: CREATE_TRANSACTION });
    try {
        await TransactionsAPI.createTransaction(token, name, amount);
        dispatch({ type: CREATE_TRANSACTION_SUCCESS, payload: amount });
    } catch (error) {
        dispatch({ type: CREATE_TRANSACTION_FAILURE, payload: error.response ? error.response.data : error.message });
    }
}

export function clearUserErrorMessage(dispatch: Dispatch) {
    dispatch({ type: CLEAR_USER_ERROR_MESSAGE });
}

export function setUserErrorMessage(message: string, dispatch: Dispatch) {
    dispatch({ type: SET_USER_ERROR_MESSAGE, payload: message });
}
