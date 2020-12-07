import { Dispatch } from "redux";
import { AuthAPI } from "../../api/authAPI";
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
        const token: string = await AuthAPI.login(email, password);
        dispatch({ type: AUTH_SUCCESS, payload: { token } });
    } catch (error) {
        dispatch({ type: AUTH_FAILURE, payload: error.response ? error.response.data : error.message });
    }
}

export async function register(username: string, email: string, password: string, dispatch: Dispatch) {
    dispatch({ type: REGISTER });
    try {
        const token: string = await AuthAPI.register(username, email, password);
        dispatch({ type: REGISTER_SUCCESS, payload: { token } });
    } catch (error) {
        dispatch({ type: REGISTER_FAILURE, payload: error.response ? error.response.data : error.message });
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
