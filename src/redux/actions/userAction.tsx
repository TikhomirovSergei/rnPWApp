import { Dispatch } from "redux";
import { Http } from "../../api/http";
import { IUserInfo } from "../reducers/userReducer";
import { GET_USER_INFO, GET_USER_INFO_FAILURE, GET_USER_INFO_SUCCESS } from "../types";

export async function getUserInfo(token: string, dispatch: Dispatch) {
    dispatch({ type: GET_USER_INFO });
    try {
        const data = await Http.getUserInfo(token);
        const user: IUserInfo = data.user_info_token;
        dispatch({ type: GET_USER_INFO_SUCCESS, payload: user });
    } catch (e) {
        dispatch({ type: GET_USER_INFO_FAILURE });
        // TODO: showToast
    }
}
