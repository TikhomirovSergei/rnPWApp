import { AnyAction } from "redux";
import {
    AUTH,
    AUTH_FAILURE,
    AUTH_SUCCESS,
    GET_USER_INFO_FAILURE,
    REGISTER,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
} from "../types";

interface IState {
    isLoggedIn: boolean;
    loading: boolean;
    token: string;
}

const initialState: IState = {
    isLoggedIn: false,
    loading: false,
    token: "",
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
            };
        case GET_USER_INFO_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
            };
        default:
            return state;
    }
}
