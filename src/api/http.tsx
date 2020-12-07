export class Http {
    static baseUrl = "http://193.124.114.46:3001";
    static headers = { "Content-Type": "application/json" };

    static async register(username: string, email: string, password: string) {
        return request(`${Http.baseUrl}/users`, "POST", Http.headers, { username, email, password });
    }

    static async login(email: string, password: string) {
        return request(`${Http.baseUrl}/sessions/create`, "POST", Http.headers, { email, password });
    }

    static async getUserInfo(token: string) {
        const headers = {
            ...Http.headers,
            ...{ Authorization: `Bearer ${token}` },
        };
        return request(`${Http.baseUrl}/api/protected/user-info`, "GET", headers);
    }

    static async getHistory(token: string) {
        const headers = {
            ...Http.headers,
            ...{ Authorization: `Bearer ${token}` },
        };
        return request(`${Http.baseUrl}/api/protected/transactions`, "GET", headers);
    }

    static async createTransaction(token: string, name: string, amount: number) {
        const headers = {
            ...Http.headers,
            ...{ Authorization: `Bearer ${token}` },
        };
        return request(`${Http.baseUrl}/api/protected/transactions`, "POST", headers, { name, amount });
    }

    static async getUsers(token: string) {
        const headers = {
            ...Http.headers,
            ...{ Authorization: `Bearer ${token}` },
        };
        return request(`${Http.baseUrl}/api/protected/users/list`, "POST", headers, { filter: " " });
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
    return response.json();
}
