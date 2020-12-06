import { AnyAction } from "redux";
import {
    AUTH,
    AUTH_FAILURE,
    AUTH_SUCCESS,
    CLEAR_ERROR_MESSAGE,
    GET_USER_INFO_FAILURE,
    REGISTER,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    SET_ERROR_MESSAGE,
} from "../types";

interface IState {
    isLoggedIn: boolean;
    loading: boolean;
    token: string;
    error: string;
}

const initialState: IState = {
    isLoggedIn: false,
    loading: false,
    token: "",
    error: "",
};

export function main(state = initialState, action: AnyAction) {
    switch (action.type) {
        case AUTH:
        case REGISTER:
            return {
                ...state,
                loading: true,
            };
        case AUTH_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isLoggedIn: true,
                token: action.payload.token,
            };
        case AUTH_FAILURE:
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case GET_USER_INFO_FAILURE:
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                isLoggedIn: false,
                error: action.payload,
            };
        case CLEAR_ERROR_MESSAGE:
            return {
                ...state,
                error: "",
            };
        default:
            return state;
    }
}
