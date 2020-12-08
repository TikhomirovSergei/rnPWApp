import { BASE_URL } from "./base";

const axios = require("axios");

export class AuthAPI {
    static async register(username: string, email: string, password: string) {
        return axios
            .post(`${BASE_URL}/users`, { username, email, password })
            .then((response) => response.data?.id_token);
    }

    static async login(email: string, password: string) {
        return axios
            .post(`${BASE_URL}/sessions/create`, { email, password })
            .then((response) => response.data?.id_token);
    }
}
