import { AnyAction } from "redux";
import { GET_USER_INFO, GET_USER_INFO_FAILURE, GET_USER_INFO_SUCCESS } from "../types";

export interface IUserInfo {
    id: number;
    name: string;
    email: string;
    balance: string;
}

interface IState {
    user: IUserInfo;
    loading: boolean;
}

const initialState: IState = {
    user: { id: 0, name: "", email: "", balance: "" },
    loading: false,
};

export function user(state = initialState, action: AnyAction) {
    switch (action.type) {
        case GET_USER_INFO:
            return {
                ...state,
                loading: true,
            };
        case GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
            };
        case GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
}
