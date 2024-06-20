/* eslint-disable react-refresh/only-export-components */
import React, { memo, useState } from "react";
import BoardCell from "./board-cell";
import { Board as BoardType } from "@/types";
import useIsMobile from "@/hooks/useIsMobile";

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
    const { isMobile } = useIsMobile();
    const [ignoreWarning, setIgnoreWarning] = useState(false);

    // --------------------------------------------------------------

    if (board.length > 10 && isMobile && !ignoreWarning) {
        return (
            <div className="text-center text-primary flex flex-col gap-2">
                Board size is too large for mobile devices
                <button
                    className="btn btn-primary"
                    onClick={() => setIgnoreWarning(true)}
                >
                    Continue anyway
                </button>
            </div>
        );
    }

    // --------------------------------------------------------------

    return (
        <div
            className={`grid gap-4 w-full h-full 
           
            `}
            style={{
                gridTemplateColumns: `repeat(${board.length}, minmax(0, 1fr))`,
            }}
        >
            {board.map((row, rowIndex) =>
                row.map((cell, colIndex) => (
                    <BoardCell
                        key={`${rowIndex}-${colIndex}`}
                        cell={cell}
                        disabled={hasWinner || isDraw || !myTurn}
                        handleCellClick={handleCellClick}
                    />
                ))
            )}
        </div>
    );
};

export default memo(Board);
