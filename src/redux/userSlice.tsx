import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ProfileAPI } from "../api/profileAPI";
import { TransactionsAPI } from "../api/transactionsAPI";
import { ValidationErrors } from "./mainSlice";

type CreateTransactionFields = { token: string; name: string; amount: number };

export const asyncGetProfile = createAsyncThunk(
    "profile/asyncGetProfile",
    async (token: string, { rejectWithValue }) => {
        try {
            return await ProfileAPI.getUserInfo(token);
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err;
            if (!error.response) {
                throw err;
            }

            return rejectWithValue(error.response.data);
        }
    },
);

export const asyncCreateTransaction = createAsyncThunk(
    "transaction/asyncCreateTransaction",
    async (fields: CreateTransactionFields, { dispatch, rejectWithValue }) => {
        try {
            const { token, name, amount } = fields;
            dispatch(createTransactionLoading());
            return await TransactionsAPI.createTransaction(token, name, amount);
        } catch (err) {
            let error: AxiosError<ValidationErrors> = err;
            if (!error.response) {
                throw err;
            }

            return rejectWithValue(error.response.data);
        }
    },
);

export type IUserInfo = {
    id: number;
    name: string;
    email: string;
    balance: number;
};

type IUserState = {
    user: IUserInfo;
    loading: boolean;
    transactionLoading: boolean;
    error: string;
};

const initialState: IUserState = {
    user: { id: 0, name: "", email: "", balance: 0 },
    loading: false,
    transactionLoading: false,
    error: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoading(state) {
            state.loading = true;
        },
        createTransactionLoading(state) {
            state.transactionLoading = true;
        },
        clearUserErrorMessage(state) {
            state.error = "";
        },
        setUserErrorMessage(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
    extraReducers: {
        [asyncGetProfile.fulfilled.type]: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        [asyncGetProfile.rejected.type]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [asyncCreateTransaction.fulfilled.type]: (state, action) => {
            state.transactionLoading = false;
            state.user = { ...state.user, balance: action.payload };
        },
        [asyncCreateTransaction.rejected.type]: (state, action) => {
            state.transactionLoading = false;
            state.error = action.payload;
        },
    },
});

export const { userLoading, createTransactionLoading, clearUserErrorMessage, setUserErrorMessage } = userSlice.actions;
export default userSlice.reducer;
