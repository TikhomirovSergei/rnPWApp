import { BASE_URL, HEADERS } from "./base";

const axios = require("axios");

export class UsersAPI {
    static async getUsers(token: string) {
        return axios
            .post(
                `${BASE_URL}/api/protected/users/list`,
                { filter: " " },
                {
                    headers: {
                        ...HEADERS,
                        ...{ Authorization: `Bearer ${token}` },
                    },
                },
            )
            .then((response) => response.data);
    }
}
