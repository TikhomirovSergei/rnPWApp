import { AnyAction } from "redux";
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

export interface IUserInfo {
    id: number;
    name: string;
    email: string;
    balance: number;
}

interface IState {
    user: IUserInfo;
    loading: boolean;
    transactionLoading: boolean;
    error: string;
}

const initialState: IState = {
    user: { id: 0, name: "", email: "", balance: 0 },
    loading: false,
    transactionLoading: false,
    error: "",
};

export function user(state = initialState, action: AnyAction) {
    switch (action.type) {
        case GET_USER_INFO:
            return {
                ...state,
                loading: true,
            };
        case CREATE_TRANSACTION:
            return {
                ...state,
                transactionLoading: true,
            };
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case CREATE_TRANSACTION_SUCCESS:
            return {
                ...state,
                transactionLoading: false,
                user: { ...state.user, balance: state.user.balance - action.payload },
            };
        case GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case CREATE_TRANSACTION_FAILURE:
        case SET_USER_ERROR_MESSAGE:
            return {
                ...state,
                transactionLoading: false,
                error: action.payload,
            };
        case CLEAR_USER_ERROR_MESSAGE:
            return {
                ...state,
                error: "",
            };
        default:
            return state;
    }
}
