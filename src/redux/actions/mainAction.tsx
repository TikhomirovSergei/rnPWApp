import { Dispatch } from "redux";
import { Http } from "../../api/http";
import { AUTH, AUTH_FAILURE, AUTH_SUCCESS, REGISTER, REGISTER_FAILURE, REGISTER_SUCCESS } from "../types";

export async function auth(email: string, password: string, dispatch: Dispatch) {
    dispatch({ type: AUTH });
    try {
        const token = await Http.login(email, password);
        dispatch({ type: AUTH_SUCCESS, payload: { token: token.id_token } });
    } catch (e) {
        dispatch({ type: AUTH_FAILURE });
        // TODO: showToast
    }
}

export async function register(username: string, email: string, password: string, dispatch: Dispatch) {
    dispatch({ type: REGISTER });
    try {
        const token = await Http.register(username, email, password);
        console.log(token);
        dispatch({ type: REGISTER_SUCCESS, payload: { token: token.id_token } });
    } catch (e) {
        dispatch({ type: REGISTER_FAILURE });
        // TODO: showToast
    }
}
