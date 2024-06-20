import LoadingTopbar from "@/components/core/loading-topbar";
import Board from "@/components/game/board";
import pusher from "@/lib/pusher";
import { useParams, useRouter } from "@/routes/hooks";
import ApiClient from "@/services/api-client";
import { useSessionStore } from "@/stores/session-store";
import { XorO } from "@/types";
import { useCallback, useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Board as BoardType } from "@/types";
import GameTitleBlock from "@/components/game/game-title-block";
import ScoreBoard from "@/components/game/score-board";
import ResetOnlineGameButton from "@/components/game/reset-online-game-button";
import { motion, useAnimation } from "framer-motion";
import toast from "react-hot-toast";

// ----------------------------------------------------------------------

export default function OnlineGameNameIndexPage() {
    const router = useRouter();
    const params = useParams<{ gameName: string }>();
    const queryClient = useQueryClient();
    const { session, loading } = useSessionStore();
    const controls = useAnimation();

    /**
     * Query to get the game state
     * - Fetches the game state from the server
     * - Enabled only when the session is loaded and not loading
     */
    const getGame = useQuery({
        queryKey: ["game", params.gameName],
        queryFn: async () => {
            const res = await ApiClient.game.getGame(params.gameName!);
            return res?.data;
        },
        enabled: !!session && !loading,
    });

    /**
     * Determines if the player is X or O
     */
    const whatMoveAmI = useMemo(() => {
        if (!getGame.data) return null;
        if (getGame.data.data.xPlayer === session?.id) {
            return "X";
        } else if (getGame.data.data.oPlayer === session?.id) {
            return "O";
        }
        return null;
    }, [getGame.data, session?.id]);

    /**
     * Handles the move-made event from the channel
     * - Invalidates the game query on event
     * - Animates the game board
     */
    const handleReceiveMoveMadeFromChannel = useCallback(
        (data: any) => {
            if (
                data.gameName === getGame.data?.data?.gameName &&
                data?.currentPlayer === whatMoveAmI
            ) {
                queryClient.invalidateQueries("game");
                controls.start({ scale: [1, 1.05, 1], speed: 0.2 });
            }
        },
        [getGame.data?.data?.gameName, whatMoveAmI, queryClient, controls]
    );

    /**
     * Handles the game-reset event from the channel
     * - Invalidates the game query on event
     * - Animates the game board
     * - Shows a toast message
     */
    const handleReceiveGameResetFromChannel = useCallback(
        (data: any) => {
            if (data.gameName === getGame.data?.data?.gameName) {
                queryClient.invalidateQueries("game");
                controls.start({ scale: [1, 1.05, 1], speed: 0.2 });
                toast.success("Starting new game!");
            }
        },
        [getGame.data?.data?.gameName, queryClient, controls]
    );

    /**
     * Handles the player-joined event from the channel
     * - Invalidates the game query on event
     * - Animates the game board
     * - Shows a toast message if the joining player is not the current player
     */
    const handleReceivePlayerJoinedFromChannel = useCallback(
        (data: any) => {
            if (data.gameName === getGame.data?.data?.gameName) {
                queryClient.invalidateQueries("game");
                controls.start({ scale: [1, 1.05, 1], speed: 0.2 });
                if (data.joiningPlayer !== whatMoveAmI) {
                    toast.success("Opponent joined the game!");
                }
            }
        },
        [getGame.data?.data?.gameName, queryClient, controls, whatMoveAmI]
    );

    /**
     * Subscribes to the game channel when the game is loaded
     * - Unsubscribes when the component is unmounted
     * - Binds the move-made, game-reset and player-joined events
     * - Invalidates the game query on event
     * - Updates the board state, currentPlayer, winner, isDraw
     *  and game history on event
     */
    useEffect(() => {
        if (!session || loading) return;

        const channel = pusher.subscribe("game-channel");
        channel.bind("move-made", handleReceiveMoveMadeFromChannel);
        channel.bind("game-reset", handleReceiveGameResetFromChannel);
        channel.bind("player-joined", handleReceivePlayerJoinedFromChannel);

        return () => {
            channel.unbind("move-made", handleReceiveMoveMadeFromChannel);
            channel.unbind("game-reset", handleReceiveGameResetFromChannel);
            channel.unbind(
                "player-joined",
                handleReceivePlayerJoinedFromChannel
            );
            pusher.unsubscribe("game-channel");
        };
    }, [
        session,
        loading,
        getGame?.data?.data.gameName,
        params.gameName,
        queryClient,
        handleReceiveMoveMadeFromChannel,
        handleReceiveGameResetFromChannel,
        handleReceivePlayerJoinedFromChannel,
    ]);

    /**
     * Determines if it's the player's turn or not
     */
    const isMyTurn = useMemo(() => {
        if (!getGame.data) return false;

        if (getGame.data.data.xPlayer === session?.id) {
            return getGame.data.data?.currentPlayer === "X";
        } else if (getGame.data.data.oPlayer === session?.id) {
            return getGame.data.data.currentPlayer === "O";
        }

        return false;
    }, [getGame.data, session?.id]);

    /**
     * Handles the cell click event
     * - If it's not the player's turn, do nothing
     *
     * @param row The row of the cell
     * @param col The column of the cell
     * @returns void - Makes a move in the game
     */
    const handleCellClick = async (row: number, col: number) => {
        if (!isMyTurn) return;

        playerMoveMutation.mutate({ row, col });
    };

    /**
     * Mutation to make a move in the game
     * - Optimistically updates the board state
     * - If there is an error, reverts the board state
     * - Invalidates the game query on success
     * - Updates the board state, currentPlayer, winner, isDraw
     *   and game history on success
     *
     * @returns Game state
     */
    const playerMoveMutation = useMutation({
        mutationFn: async (payload: { row: number; col: number }) => {
            return await ApiClient.game.makeMove({
                gameName: params.gameName!,
                player: getGame?.data?.data.currentPlayer as XorO,
                row: payload.row,
                col: payload.col,
            });
        },
        onMutate: async (payload) => {
            await queryClient.cancelQueries(["game", params.gameName]);

            const previousGame = queryClient.getQueryData([
                "game",
                params.gameName,
            ]);

            queryClient.setQueryData(["game", params.gameName], (old: any) => {
                if (!old) return old;

                return {
                    ...old,
                    data: {
                        ...old.data,
                        board: old.data.board.map(
                            (row: any, rowIndex: number) =>
                                row.map((cell: any, colIndex: number) => {
                                    if (
                                        rowIndex === payload.row &&
                                        colIndex === payload.col
                                    ) {
                                        return {
                                            ...cell,
                                            value: old.data.currentPlayer,
                                        };
                                    }

                                    return cell;
                                })
                        ),
                        currentPlayer:
                            old.data.currentPlayer === "X" ? "O" : "X",
                    },
                };
            });

            return { previousGame };
        },
        onError: (_error, _variables, context) => {
            queryClient.setQueryData(
                ["game", params.gameName],
                context?.previousGame
            );
            toast.error("Failed to make move!");
        },
        onSettled: () => {
            queryClient.invalidateQueries(["game", params.gameName]);
        },
    });

    // -------------------- RENDER ------------------------------------

    if (getGame.isLoading || loading) return <LoadingTopbar />;

    if (getGame.isError || !getGame.data) {
        return (
            <div className="text-2xl mx-auto text-center">Game not found!</div>
        );
    }

    const gameWidth = () => {
        if (!getGame?.data?.data?.board) return "w-3/6";

        if (getGame?.data?.data?.board.length <= 10) {
            return "lg:w-2/6 md:w-3/6 w-5/6";
        }
        return "lg:w-3/6 md:w-5/6 w-5/6";
    };

    return (
        <div className="flex flex-col gap-4 justify-center w-full align-middle">
            <div className={`${gameWidth()} mx-auto flex flex-col gap-6 my-4`}>
                <GameTitleBlock
                    winner={getGame?.data?.data?.winner}
                    isDraw={getGame?.data?.data?.isDraw}
                    whatAmI={whatMoveAmI}
                    isMyTurn={isMyTurn}
                    game={getGame.data.data}
                />

                <motion.div animate={controls}>
                    <Board
                        board={(getGame?.data?.data?.board as BoardType) ?? []}
                        handleCellClick={handleCellClick}
                        hasWinner={!!getGame?.data?.data?.winner}
                        isDraw={!!getGame?.data?.data?.isDraw}
                        myTurn={isMyTurn}
                    />
                </motion.div>

                <ResetOnlineGameButton game={getGame.data.data} />

                <button
                    className="btn btn-accent w-full"
                    onClick={() => {
                        router.push("/");
                    }}
                >
                    Leave game
                </button>

                <ScoreBoard game={getGame.data.data} />
            </div>
        </div>
    );
}
