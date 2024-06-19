/* eslint-disable react-refresh/only-export-components */
import React, { memo } from "react";
import { Cell } from "../../types";
import { motion } from "framer-motion";

interface Props {
    cell: Cell;
    handleCellClick: (row: number, col: number) => void;
    disabled?: boolean;
    cellSize?: "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl";
}

const BoardCell: React.FC<Props> = ({
    cell,
    disabled,
    handleCellClick,
    cellSize = "2xl",
}) => {
    return (
        <motion.div
            className={`border-2 border-primary flex items-center justify-center text-${cellSize} font-bold aspect-square ${
                cell.value || disabled ? "cursor-not-allowed" : "cursor-pointer"
            } ${cell.winningCell ? "bg-primary text-primary-content" : ""}`}
            onClick={() => handleCellClick(cell.row, cell.col)}
            animate={cell.winningCell ? { scale: [1, 1.5, 1] } : { scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            {cell.value}
        </motion.div>
    );
};

export default memo(BoardCell);
