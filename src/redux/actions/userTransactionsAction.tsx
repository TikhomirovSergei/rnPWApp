import { Dispatch } from "redux";
import { TransactionsAPI } from "../../api/transactionsAPI";
import { IUserTransactions } from "../reducers/userTransactionsReducer";
import {
    CLEAR_GET_USER_TRANSACTIONS_ERROR_MESSAGE,
    GET_USER_TRANSACTIONS_FAILURE,
    GET_USER_TRANSACTIONS_SUCCESS,
} from "../types";

export async function getUserTransactions(token: string, dispatch: Dispatch, cb: Function) {
    try {
        let history: IUserTransactions[] = await TransactionsAPI.getHistory(token);
        history = history.sort((a, b) => {
            const i = new Date(a.date).getTime();
            const j = new Date(b.date).getTime();
            return j - i;
        });
        dispatch({ type: GET_USER_TRANSACTIONS_SUCCESS, payload: history });
        cb();
    } catch (error) {
        dispatch({
            type: GET_USER_TRANSACTIONS_FAILURE,
            payload: error.response ? error.response.data : error.message,
        });
        cb();
    }
}

export function clearGetUserTransactionsErrorMessage(dispatch: Dispatch) {
    dispatch({ type: CLEAR_GET_USER_TRANSACTIONS_ERROR_MESSAGE });
}
