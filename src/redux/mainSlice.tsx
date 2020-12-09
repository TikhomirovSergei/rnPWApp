import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AuthAPI } from "../api/authAPI";

type AuthFields = { email: string; password: string };
type RegisterFields = { username: string; email: string; password: string };

export type ValidationErrors = {
    errorMessage: string;
    field_errors: Record<string, string>;
};

export const asyncAuth = createAsyncThunk(
    "auth/asyncAuth",
    async (fields: AuthFields, { dispatch, rejectWithValue }) => {
        try {
            const { email, password } = fields;
            dispatch(startLoading());
            return await AuthAPI.login(email, password);
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err;
            if (!error.response) {
                throw err;
            }

            return rejectWithValue(error.response.data);
        }
    },
);

export const asyncRegister = createAsyncThunk(
    "register/asyncRegister",
    async (fields: RegisterFields, { rejectWithValue }) => {
        try {
            const { username, email, password } = fields;
            return await AuthAPI.register(username, email, password);
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err;
            if (!error.response) {
                throw err;
            }

            return rejectWithValue(error.response.data);
        }
    },
);

type IMainState = {
    isLoggedIn: boolean;
    loading: boolean;
    token: string;
    authError: string;
    regError: string;
};

const initialState: IMainState = {
    isLoggedIn: false,
    loading: false,
    token: "",
    authError: "",
    regError: "",
};

const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        clearErrorMessage(state) {
            state.authError = "";
            state.regError = "";
        },
        setErrorMessage(state, action: PayloadAction<string>) {
            state.authError = action.payload;
        },
        setRegErrorMessage(state, action: PayloadAction<string>) {
            state.regError = action.payload;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
    },
    extraReducers: {
        [asyncAuth.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        [asyncAuth.rejected.type]: (state, action) => {
            state.loading = false;
            state.authError = action.payload;
        },
        [asyncRegister.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.isLoggedIn = true;
            state.token = action.payload;
        },
        [asyncRegister.rejected.type]: (state, action) => {
            state.loading = false;
            state.regError = action.payload;
        },
    },
});

export const { startLoading, clearErrorMessage, setErrorMessage, setRegErrorMessage, logout } = mainSlice.actions;
export default mainSlice.reducer;
