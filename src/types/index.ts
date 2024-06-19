import { boardSchema, cellSchema, rowSchema } from "./validation"
import { z } from 'zod'

// --------------------------------------------------

export type XorO = 'X' | 'O';

export type Cell = z.infer<typeof cellSchema>;

export type Row = z.infer<typeof rowSchema>;

export type Board = z.infer<typeof boardSchema>;

export type Game = {
    id: string;
    gameName: string;
    winner: string | null;
    currentPlayer: XorO;
    winningCondition: number; // Number of cells in a row to win
    board: Board;
    isDraw: boolean;
    xPlayer?: string;
    oPlayer?: string;
}

// --------------------------------------------------

export type Session = {
    id: string;
    expiresAt: string;
}
