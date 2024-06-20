import { AxiosInstance, AxiosResponse } from "axios";
import { Game, XorO } from "../types";

// --------------------------------------------------------

export default class GameApiClient {
    private client: AxiosInstance;

    constructor(client: AxiosInstance, baseURL?: string) {
        this.client = client;
        if (baseURL) {
            client.defaults.baseURL += baseURL;
        }
    }

    async createGame({
        gameName,
        currentPlayer = 'X',
        boardSize,
        winningCondition
    }: {
        gameName: string,
        currentPlayer?: XorO,
        boardSize: number,
        winningCondition: number
    }): Promise<AxiosResponse> {
        const payload = { gameName, currentPlayer, boardSize, winningCondition };
        return this.client.post('/create', payload);
    }

    async getGame(gameName: string): Promise<AxiosResponse<{
        data: Game,
        message: string,
    }>> {
        return this.client.get(`/${gameName}`);
    }

    async makeMove({
        gameName,
        player,
        row,
        col
    }: {
        gameName: string,
        player: XorO,
        row: number,
        col: number
    }): Promise<AxiosResponse> {
        const payload = { gameName, player, row, col };
        return this.client.post('/move', payload);
    }

    async getGamesCount(): Promise<AxiosResponse> {
        return this.client.get('/all/count');
    }

    async resetGame(gameName: string): Promise<AxiosResponse> {
        return this.client.post(`/${gameName}/reset`);
    }
}