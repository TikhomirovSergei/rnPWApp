import { AnyAction } from "redux";
import {
    CLEAR_GET_USER_TRANSACTIONS_ERROR_MESSAGE,
    GET_USER_TRANSACTIONS_FAILURE,
    GET_USER_TRANSACTIONS_SUCCESS,
} from "../types";

export interface IUserTransactions {
    id: number;
    date: string;
    username: string;
    amount: number;
    balance: number;
}

interface IUserTransactionsState {
    history: IUserTransactions[];
    error: string;
}

const initialState: IUserTransactionsState = {
    history: [],
    error: "",
};

export function userTransactions(state = initialState, action: AnyAction) {
    switch (action.type) {
        case GET_USER_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                history: action.payload,
            };
        case GET_USER_TRANSACTIONS_FAILURE:
            return {
                ...state,
                error: action.payload,
            };
        case CLEAR_GET_USER_TRANSACTIONS_ERROR_MESSAGE:
            return {
                ...state,
                error: "",
            };
        default:
            return state;
    }
}
