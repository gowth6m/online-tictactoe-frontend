import { create } from "zustand";
import { XorO, Game } from "../types";
import { AppConfig } from "../config/app-config";
import { immer } from "zustand/middleware/immer";
import { createGameSchema } from "@/types/validation";
import { createJSONStorage, persist } from "zustand/middleware";

// --------------------------------------------------

const directions = [
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: 0, col: -1 },
    { row: -1, col: 0 },
    { row: 1, col: 1 },
    { row: -1, col: 1 },
    { row: 1, col: -1 },
    { row: -1, col: -1 },
];

/**
 * DFS to check if the player has winningCondition in a row, then return the path of
 * cells that form a winning row.
 *
 * @param board The game board object
 * @param row The row index to start the search
 * @param col The column index to start the search
 * @param player The player to check for a win (X or O)
 * @param direction The direction to search
 * @param count The number of cells in a row we seen - starts at 1
 * @param winningCondition The number of cells in a row to win
 * @param seen A set of seen cells
 * @param path The path of cells that form a winning row - starts with the current cell
 *
 * @returns The path of cells that form a winning row or null
 */
const dfs = (
    board: Game["board"],
    row: number,
    col: number,
    player: XorO,
    direction: { row: number; col: number },
    count: number,
    winningCondition: number,
    seen: Set<string>,
    path: { row: number; col: number }[]
): { row: number; col: number }[] | null => {
    if (count === winningCondition) return path;

    const newRow = row + direction.row;
    const newCol = col + direction.col;

    if (
        newRow >= 0 &&
        newRow < board.length &&
        newCol >= 0 &&
        newCol < board.length &&
        board[newRow][newCol].value === player &&
        !seen.has(`${newRow}-${newCol}`)
    ) {
        seen.add(`${newRow}-${newCol}`);
        const newPath = [...path, { row: newRow, col: newCol }];
        return dfs(
            board,
            newRow,
            newCol,
            player,
            direction,
            count + 1,
            winningCondition,
            seen,
            newPath
        );
    }

    return null;
};

/**
 *
 * @param board The game board object
 * @param player The player to check for a win (X or O)
 * @param winningCondition The number of cells in a row to win
 *
 * @returns The path of cells that form a winning row or null if no winner
 */
const isWinner = (
    board: Game["board"],
    player: XorO,
    winningCondition: number
): { row: number; col: number }[] | null => {
    const size = board.length;
    const seen = new Set<string>();

    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (
                board[row][col].value === player &&
                !seen.has(`${row}-${col}`)
            ) {
                for (const direction of directions) {
                    const newSeen = new Set(seen);
                    newSeen.add(`${row}-${col}`);
                    const path = dfs(
                        board,
                        row,
                        col,
                        player,
                        direction,
                        1,
                        winningCondition,
                        newSeen,
                        [{ row, col }]
                    );
                    if (path) {
                        return path;
                    }
                }
            }
        }
    }
    return null;
};

// --------------------------------------------------

type LocalGameState = {
    game: Game | null;
    newGame: (
        gameName: string,
        currentPlayer: XorO,
        boardSize: number,
        winningCondition: number
    ) => void;
    makeMove: (row: number, col: number, player: XorO) => void;
};

// --------------------------------------------------

export const useLocalGameStore = create<LocalGameState>()(
    persist(
        immer((set) => ({
            game: null,

            newGame: (gameName, currentPlayer, boardSize, winningCondition) => {
                createGameSchema.parse({
                    gameName,
                    currentPlayer,
                    boardSize,
                    winningCondition,
                });

                const emptyBoard = Array.from(
                    { length: boardSize },
                    (_, rowIndex) =>
                        Array.from({ length: boardSize }, (_, colIndex) => ({
                            value: null,
                            row: rowIndex,
                            col: colIndex,
                            winningCell: false,
                        }))
                );

                set({
                    game: {
                        id: Math.random().toString(36).substr(2, 9),
                        gameName,
                        currentPlayer,
                        board: emptyBoard,
                        winningCondition: winningCondition,
                        winner: null,
                        isDraw: false,
                    },
                });
            },

            makeMove: (row: number, col: number, player: XorO) => {
                set((state: LocalGameState) => {
                    if (!state.game) return;

                    const cell = state.game.board[row][col];
                    if (
                        cell.value === null &&
                        state.game.currentPlayer === player &&
                        !state.game.winner &&
                        !state.game.isDraw
                    ) {
                        cell.value = player;

                        // Check for a winner
                        const winningCells = isWinner(
                            state.game.board,
                            player,
                            state.game.winningCondition
                        );

                        if (winningCells) {
                            state.game.winner = player;
                            winningCells.forEach(({ row, col }) => {
                                state.game!.board[row][col].winningCell = true;
                            });
                        } else {
                            // Check for a draw
                            const isDraw = state.game.board.every((row) =>
                                row.every((cell) => cell.value !== null)
                            );
                            if (isDraw) {
                                state.game.isDraw = true;
                            } else {
                                // Update the current player
                                state.game.currentPlayer =
                                    player === "X" ? "O" : "X";
                            }
                        }
                    }
                });
            },
        })),
        {
            name: AppConfig.localStorageKey.localGame,
            storage: createJSONStorage(() => localStorage),
        }
    )
);
