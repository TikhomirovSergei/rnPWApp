import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { TransactionsAPI } from "../api/transactionsAPI";
import { ValidationErrors } from "./mainSlice";

type GetUserTransactionsFields = { token: string; cb: Function };

export const asyncGetUserTransactions = createAsyncThunk(
    "transactions/asyncGetUserTransactions",
    async (fields: GetUserTransactionsFields, { rejectWithValue }) => {
        const { token, cb } = fields;
        try {
            let history: IUserTransactions[] = await TransactionsAPI.getHistory(token);
            return history.sort((a, b) => {
                const i = new Date(a.date).getTime();
                const j = new Date(b.date).getTime();
                return j - i;
            });
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

export type IUserTransactions = {
    id: number;
    date: string;
    username: string;
    amount: number;
    balance: number;
};

type IUserTransactionsState = {
    history: IUserTransactions[];
    error: string;
};

const initialState: IUserTransactionsState = {
    history: [],
    error: "",
};

const userTransactionsSlice = createSlice({
    name: "userTransactions",
    initialState,
    reducers: {
        clearGetUserTransactionsErrorMessage(state) {
            state.error = "";
        },
    },
    extraReducers: {
        [asyncGetUserTransactions.fulfilled.type]: (state, action) => {
            state.history = action.payload;
        },
        [asyncGetUserTransactions.rejected.type]: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const { clearGetUserTransactionsErrorMessage } = userTransactionsSlice.actions;
export default userTransactionsSlice.reducer;
