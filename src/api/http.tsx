export class Http {
    static baseUrl = "http://193.124.114.46:3001";
    static headers = { "Content-Type": "application/json" };

    static async register(username: string, email: string, password: string) {
        try {
            return await request(`${Http.baseUrl}/users`, "POST", Http.headers, { username, email, password });
        } catch (e) {
            throw e;
        }
    }

    static async login(email: string, password: string) {
        try {
            return await request(`${Http.baseUrl}/sessions/create`, "POST", Http.headers, { email, password });
        } catch (e) {
            throw e;
        }
    }

    static async getUserInfo(token: string) {
        try {
            const headers = {
                ...Http.headers,
                ...{ Authorization: `Bearer ${token}` },
            };
            return await request(`${Http.baseUrl}/api/protected/user-info`, "GET", headers);
        } catch (e) {
            throw e;
        }
    }

    static async getUsers(token: string) {
        try {
            const headers = {
                ...Http.headers,
                ...{ Authorization: `Bearer ${token}` },
            };
            return await request(`${Http.baseUrl}/api/protected/transactions`, "GET", headers);
        } catch (e) {
            throw e;
        }
    }

    static async createTransaction(token: string, name: string, amount: number) {
        try {
            const headers = {
                ...Http.headers,
                ...{ Authorization: `Bearer ${token}` },
            };
            return await request(`${Http.baseUrl}/api/protected/transactions`, "POST", headers, { name, amount });
        } catch (e) {
            throw e;
        }
    }
}

async function request(url: string, method, headers: object, data?: object) {
    const config: any = {
        method,
        headers,
    };

    if (method === "POST") {
        config.body = JSON.stringify(data);
    }

    const response = await fetch(url, config);
    if (response.status > 299) throw new Error(await response.text());
    return await response.json();
}
