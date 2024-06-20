/* eslint-disable react-refresh/only-export-components */
import React, { memo, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Cell } from "@/types";
import CoreIcon from "../core/core-icon";

interface Props {
    cell: Cell;
    handleCellClick: (row: number, col: number) => void;
    disabled?: boolean;
}

const BoardCell: React.FC<Props> = ({ cell, disabled, handleCellClick }) => {
    const onClick = useCallback(() => {
        if (!disabled && !cell.value) {
            handleCellClick(cell.row, cell.col);
        }
    }, [disabled, cell.value, handleCellClick, cell.row, cell.col]);

    const className = useMemo(() => {
        const baseClasses =
            "border-2 border-primary flex items-center justify-center font-bold aspect-square";
        const cursorClass =
            cell.value || disabled ? "cursor-not-allowed" : "cursor-pointer";
        const winningCellClass = cell.winningCell
            ? "bg-primary text-primary-content"
            : "";

        return `${baseClasses} ${cursorClass} ${winningCellClass}`;
    }, [cell.value, disabled, cell.winningCell]);

    const animationProps = useMemo(
        () => ({
            animate: cell.winningCell ? { scale: [1, 1.5, 1] } : { scale: 1 },
            transition: { duration: 0.5, ease: "easeInOut" },
        }),
        [cell.winningCell]
    );

    return (
        <motion.div className={className} onClick={onClick} {...animationProps}>
            {cell.value === "X" ? (
                <CoreIcon.X width={"90%"} height={"90%"} />
            ) : cell.value === "O" ? (
                <CoreIcon.Circle width={"90%"} height={"90%"} />
            ) : null}
        </motion.div>
    );
};

export default memo(BoardCell);
