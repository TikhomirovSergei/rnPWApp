import { Dispatch } from "redux";
import { Http } from "../../api/http";
import {
    AUTH,
    AUTH_FAILURE,
    AUTH_SUCCESS,
    CLEAR_ERROR_MESSAGE,
    LOGOUT,
    REGISTER,
    REGISTER_FAILURE,
    REGISTER_SUCCESS,
    SET_ERROR_MESSAGE,
    SET_REG_ERROR_MESSAGE,
} from "../types";

export async function auth(email: string, password: string, dispatch: Dispatch) {
    dispatch({ type: AUTH });
    try {
        const token = await Http.login(email, password);
        dispatch({ type: AUTH_SUCCESS, payload: { token: token.id_token } });
    } catch (e) {
        dispatch({ type: AUTH_FAILURE, payload: String(e) });
    }
}

export async function register(username: string, email: string, password: string, dispatch: Dispatch) {
    dispatch({ type: REGISTER });
    try {
        const token = await Http.register(username, email, password);
        dispatch({ type: REGISTER_SUCCESS, payload: { token: token.id_token } });
    } catch (e) {
        dispatch({ type: REGISTER_FAILURE, payload: String(e) });
    }
}

export function clearErrorMessage(dispatch: Dispatch) {
    dispatch({ type: CLEAR_ERROR_MESSAGE });
}

export function setErrorMessage(message: string, dispatch: Dispatch) {
    dispatch({ type: SET_ERROR_MESSAGE, payload: message });
}

export function seRegErrorMessage(message: string, dispatch: Dispatch) {
    dispatch({ type: SET_REG_ERROR_MESSAGE, payload: message });
}

export function logout(dispatch: Dispatch) {
    dispatch({ type: LOGOUT });
}
