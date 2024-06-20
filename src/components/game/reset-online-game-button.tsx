import ApiClient from "@/services/api-client";
import { Game } from "@/types";
import React from "react";
import { useMutation, useQueryClient } from "react-query";

interface Props {
    game: Game;
}

const ResetOnlineGameButton: React.FC<Props> = ({ game }) => {
    const queryClient = useQueryClient();

    const hasAnyMoveBeenMade = game.board.some((row) =>
        row.some((cell) => cell.value !== null)
    );

    const resetGameMutation = useMutation({
        mutationFn: async () => {
            return await ApiClient.game.resetGame(game.gameName!);
        },
        onMutate: async () => {
            await queryClient.cancelQueries(["game", game.gameName]);

            const previousGame = queryClient.getQueryData([
                "game",
                game.gameName,
            ]);

            queryClient.setQueryData(["game", game.gameName], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    data: {
                        ...old.data,
                        board: old.data.board.map((row: any) =>
                            row.map((cell: any) => ({
                                ...cell,
                                value: null,
                                winningCell: false,
                            }))
                        ),
                        winner: null,
                        isDraw: false,
                        currentPlayer: "X",
                    },
                };
            });

            return { previousGame };
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(
                ["game", game.gameName],
                context?.previousGame
            );
        },
        onSettled: () => {
            queryClient.invalidateQueries(["game", game.gameName]);
        },
    });

    return (
        <button
            className="btn btn-secondary"
            onClick={() => resetGameMutation.mutate()}
            disabled={resetGameMutation.isLoading || !hasAnyMoveBeenMade}
        >
            New Game
        </button>
    );
};

export default ResetOnlineGameButton;
