import { Game } from "@/types";
import React from "react";

interface Props {
    game: Game;
}

const ScoreBoard: React.FC<Props> = ({ game }) => {
    return (
        <div className="border-primary border-2 p-4 flex flex-col gap-4">
            <div className="text-center bg-primary text-primary-content rounded text-lg">
                Score Board
            </div>
            <div className="flex flex-col gap-2">
                <div className="flex flex-row justify-between">
                    <p>Player X</p>
                    <p>{game.xWins}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p>Player O</p>
                    <p>{game.oWins}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p>Draws</p>
                    <p>{game.draws}</p>
                </div>
            </div>
        </div>
    );
};

export default ScoreBoard;
