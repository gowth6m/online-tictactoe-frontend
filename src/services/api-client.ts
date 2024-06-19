
import axios from "axios";
import GameApiClient from "./game-api-client";

const APP_PASSWORD = "gowthaman" // TODO: Replace this method with JWT token from server

const client = axios.create({
    // baseURL: '/api',
    // baseURL: 'http://localhost:8080',
    baseURL: 'https://api-online-tictactoe.vercel.app',
    headers: {
        'Content-Type': 'application/json',
    },
});

class ApiClient {
    static game = new GameApiClient(client, '/game');

    static setAuthorizationHeader = (sessionId: string) => {
        const credentials = `${sessionId}:${APP_PASSWORD}`;
        const encodedCredentials = btoa(credentials);
        client.defaults.headers.common['Authorization'] = `Basic ${encodedCredentials}`;
    };
}

export default ApiClient;