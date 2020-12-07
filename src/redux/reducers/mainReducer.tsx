import { AnyAction } from "redux";
import {
    AUTH,
    AUTH_FAILURE,
    AUTH_SUCCESS,
    CLEAR_ERROR_MESSAGE,
    GET_USER_INFO_FAILURE,
    LOGOUT,
    REGISTER,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    SET_ERROR_MESSAGE,
    SET_REG_ERROR_MESSAGE,
} from "../types";

interface IMainState {
    isLoggedIn: boolean;
    loading: boolean;
    token: string;
    authError: string;
    regError: string;
}

const mainInitialState: IMainState = {
    isLoggedIn: false,
    loading: false,
    token: "",
    authError: "",
    regError: "",
};

export function main(state = mainInitialState, action: AnyAction) {
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
            return {
                ...state,
                loading: false,
                authError: action.payload,
            };
        case REGISTER_FAILURE:
            return {
                ...state,
                loading: false,
                regError: action.payload,
            };
        case GET_USER_INFO_FAILURE:
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                isLoggedIn: false,
                authError: action.payload,
            };
        case SET_REG_ERROR_MESSAGE:
            return {
                ...state,
                regError: action.payload,
            };
        case CLEAR_ERROR_MESSAGE:
            return {
                ...state,
                authError: "",
                regError: "",
            };
        case LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
}
