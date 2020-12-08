import { BASE_URL, HEADERS } from "./base";

const axios = require("axios");

export class TransactionsAPI {
    static async getHistory(token: string) {
        return axios
            .get(`${BASE_URL}/api/protected/transactions`, {
                headers: {
                    ...HEADERS,
                    ...{ Authorization: `Bearer ${token}` },
                },
            })
            .then((response) => response.data?.trans_token);
    }

    static async createTransaction(token: string, name: string, amount: number) {
        return axios
            .post(
                `${BASE_URL}/api/protected/transactions`,
                { name, amount },
                {
                    headers: {
                        ...HEADERS,
                        ...{ Authorization: `Bearer ${token}` },
                    },
                },
            )
            .then((response) => response.data?.trans_token?.balance);
    }
}
