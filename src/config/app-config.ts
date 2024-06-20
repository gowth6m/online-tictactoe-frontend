export const AppConfig = {
    localStorageKey: {
        session: "gowtham-tictactoe-session",
        localGame: "gowtham-tictactoe-local-game",
    },
    api: {
        password: "gowthaman",
        url: import.meta?.env?.VITE_APP_STAGE === "dev" ? "http://localhost:8080" : "https://api-online-tictactoe.vercel.app",
    },
}