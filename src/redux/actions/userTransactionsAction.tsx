import { Dispatch } from "redux";
import { Http } from "../../api/http";
import { IUserTransactions } from "../reducers/userTransactionsReducer";
import { GET_USER_TRANSACTIONS, GET_USER_TRANSACTIONS_FAILURE, GET_USER_TRANSACTIONS_SUCCESS } from "../types";

export async function getUserTransactions(token: string, dispatch: Dispatch) {
    dispatch({ type: GET_USER_TRANSACTIONS });
    try {
        const data = await Http.getUsers(token);
        const users: IUserTransactions = data.trans_token;
        dispatch({ type: GET_USER_TRANSACTIONS_SUCCESS, payload: users });
    } catch (e) {
        console.log(e);
        dispatch({ type: GET_USER_TRANSACTIONS_FAILURE, payload: String(e) });
    }
}
