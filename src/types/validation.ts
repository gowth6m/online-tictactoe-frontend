import { z } from "zod";

export const cellSchema = z.object({
    value: z.union([z.literal("X"), z.literal("O"), z.null()]),
    row: z.number(),
    col: z.number(),
    winningCell: z.boolean(),
});

export const rowSchema = z.object({
    data: z.array(cellSchema),
});

export const boardSchema = z.array(z.array(cellSchema));

export const createGameSchema = z.object({
    gameName: z.string(),
    currentPlayer: z.union([z.literal("X"), z.literal("O")]),
    boardSize: z.number().min(3).max(15),
    winningCondition: z.number().min(3).max(15),
}).superRefine((data, ctx) => {
    if (data.winningCondition > data.boardSize) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["winningCondition"],
            message: "Winning condition must be less than or equal to the board size",
        });
    }
});

export const moveSchema = z.object({
    gameName: z.string(),
    player: z.union([z.literal("X"), z.literal("O")]),
    row: z.number().min(0),
    col: z.number().min(0),
});