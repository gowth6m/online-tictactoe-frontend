
import axios from "axios";
import GameApiClient from "./game-api-client";
import { AppConfig } from "@/config/app-config";

const APP_PASSWORD = "gowthaman" // TODO: Replace this method with JWT token from server

const client = axios.create({
    baseURL: AppConfig.api.url,
    headers: {
        'Content-Type': 'application/json',
    },
});

class ApiClient {
    static game = new GameApiClient(client, '/game');

    static setAuthorizationHeader = async (sessionId: string) => {
        return new Promise<void>((resolve) => {
            const credentials = `${sessionId}:${APP_PASSWORD}`;
            const encodedCredentials = btoa(credentials);
            client.defaults.headers.common['Authorization'] = `Basic ${encodedCredentials}`;
            resolve();
        });
    };
}

export default ApiClient;