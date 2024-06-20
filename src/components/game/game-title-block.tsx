import React from "react";
import { motion } from "framer-motion";
import CoreIcon from "../core/core-icon";
import { Game } from "@/types";

interface Props {
    winner: string | null;
    isDraw: boolean;
    whatAmI: string | null;
    isMyTurn: boolean;
    game: Game;
}

const GameTitleBlock: React.FC<Props> = ({
    winner,
    isDraw,
    whatAmI,
    isMyTurn,
    game,
}) => {
    const numberOfPlayers = game.xPlayer && game.oPlayer ? 2 : 1;

    const getTitle = () => {
        if (winner) {
            return `You ${whatAmI === winner ? "Win!" : "Lost :("}`;
        } else if (isDraw) {
            return "It's a draw!";
        } else if (isMyTurn) {
            return "Your turn!";
        }
        return (
            <>
                Waiting for opponent
                <motion.span
                    className="ellipsis"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {" . . ."}
                </motion.span>
            </>
        );
    };

    return (
        <div
            className={`text-xl text-center ${
                winner ? `bg-primary text-primary-content` : `text-primary`
            } p-2 rounded border-primary border-2 flex flex-row item-center justify-center gap-2`}
        >
            {getTitle()}{" "}
            <div className="badge badge-primary flex flex-row gap-2 p-3">
                <CoreIcon.User size={16} />
                {`${numberOfPlayers}/2`}
            </div>
        </div>
    );
};

export default GameTitleBlock;
