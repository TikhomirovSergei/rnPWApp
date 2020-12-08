import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { UsersAPI } from "../api/usersAPI";
import { ValidationErrors } from "./mainSlice";

type GetUsersFields = { token: string; cb: Function };

export const asyncGetUsers = createAsyncThunk(
    "users/asyncGetUsers",
    async (fields: GetUsersFields, { rejectWithValue }) => {
        const { token, cb } = fields;
        try {
            return await UsersAPI.getUsers(token);
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err;
            if (!error.response) {
                throw err;
            }

            return rejectWithValue(error.response.data);
        } finally {
            cb();
        }
    },
);

export type IUserState = {
    id: number;
    name: string;
};

type IUserListState = {
    users: IUserState[];
    error: string;
};

const initialState: IUserListState = {
    users: [],
    error: "",
};

const userListSlice = createSlice({
    name: "userList",
    initialState,
    reducers: {
        clearGetUserListErrorMessage(state) {
            state.error = "";
        },
    },
    extraReducers: {
        [asyncGetUsers.fulfilled.type]: (state, action) => {
            state.users = action.payload;
        },
        [asyncGetUsers.rejected.type]: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { clearGetUserListErrorMessage } = userListSlice.actions;
export default userListSlice.reducer;
