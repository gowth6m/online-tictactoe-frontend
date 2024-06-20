import { Game } from "@/types";
import React from "react";
import CoreIcon from "../core/core-icon";

interface Props {
    game: Game;
}

const OnlineGameStatsBlock: React.FC<Props> = ({ game }) => {
    const numberOfPlayers = game.xPlayer && game.oPlayer ? 2 : 1;

    return (
        <div
            className={`text-xl text-center text-secondary-content p-2 rounded text-ellipsis overflow-hidden flex flex-row item-center justify-between gap-2 bg-secondary`}
        >
            <p className="text-ellipsis overflow-hidden">
                {`# ${game.gameName.toUpperCase()}`}{" "}
            </p>
            <div className="badge badge-primary flex flex-row gap-2 p-3 flex-1">
                <CoreIcon.User size={16} />
                {`${numberOfPlayers}/2`}
            </div>
        </div>
    );
};

export default OnlineGameStatsBlock;
