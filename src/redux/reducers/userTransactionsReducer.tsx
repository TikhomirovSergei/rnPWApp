import { AnyAction } from "redux";
import { GET_USER_TRANSACTIONS, GET_USER_TRANSACTIONS_FAILURE, GET_USER_TRANSACTIONS_SUCCESS } from "../types";

export interface IUserTransactions {
    id: number;
    date: number;
    username: string;
    amount: number;
    balance: number;
}

interface IState {
    users: IUserTransactions[];
    loading: boolean;
}

const initialState: IState = {
    users: [
        {
            id: 200,
            date: 123456,
            username: "username",
            amount: 200,
            balance: 700,
        },
    ],
    loading: false,
};

export function userTransactions(state = initialState, action: AnyAction) {
    switch (action.type) {
        case GET_USER_TRANSACTIONS:
            return {
                ...state,
                loading: true,
            };
        case GET_USER_TRANSACTIONS_SUCCESS:
            return {
                ...state,
                loading: false,
                // users: action.payload,
            };
        case GET_USER_TRANSACTIONS_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
