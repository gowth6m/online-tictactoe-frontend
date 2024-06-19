import React, { memo } from "react";
import BoardCell from "./board-cell";
import { Board as BoardType } from "@/types";

// --------------------------------------------------------------

interface Props {
    board: BoardType;
    hasWinner: boolean;
    isDraw: boolean;
    handleCellClick: (row: number, col: number) => void;
    myTurn?: boolean;
}

const Board: React.FC<Props> = ({
    board,
    hasWinner = false,
    isDraw = false,
    handleCellClick,
    myTurn = true,
}) => {
    return (
        <div
            className={`grid gap-4 w-full h-full`}
            style={{
                gridTemplateColumns: `repeat(${board?.[0]?.length}, minmax(0, 1fr))`,
            }}
        >
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <BoardCell
                        key={`${rowIndex}-${colIndex}`}
                        cell={cell}
                        disabled={hasWinner || isDraw || !myTurn}
                        handleCellClick={handleCellClick}
                        cellSize={
                            board.length <= 5
                                ? "2xl"
                                : board.length <= 7
                                ? "lg"
                                : board.length <= 9
                                ? "base"
                                : "sm"
                        }
                    />
                ))
            )}
        </div>
    );
};

export default memo(Board);
