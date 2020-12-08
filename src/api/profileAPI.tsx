import { BASE_URL, HEADERS } from "./base";

const axios = require("axios");

export class ProfileAPI {
    static async getUserInfo(token: string) {
        return axios
            .get(`${BASE_URL}/api/protected/user-info`, {
                headers: {
                    ...HEADERS,
                    ...{ Authorization: `Bearer ${token}` },
                },
            })
            .then((response) => response.data?.user_info_token);
    }
}
