import Board from "@/components/game/board";
import { useRouter } from "@/routes/hooks";
import { useLocalGameStore } from "@/stores/local-game-store";

export default function LocalIndexPage() {
    const router = useRouter();
    const { game, newGame, makeMove } = useLocalGameStore();

    const handleRestartGame = () => {
        newGame(
            "Local",
            "X",
            game?.board?.length ?? 3,
            game?.winningCondition ?? 3
        );
    };

    const handleResetGame = () => {
        router.push("/");
    };

    const handleCellClick = (row: number, col: number) => {
        if (!game) return;
        makeMove(row, col, game.currentPlayer);
    };

    const gameWidth = () => {
        if (!game) return "w-3/6";

        if (game.board.length <= 10) return "lg:w-2/6 md:w-3/6 w-5/6";

        return "lg:w-3/6 md:w-5/6 w-5/6";
    };

    return (
        <div className="flex flex-col gap-4 justify-center w-full align-middle">
            <div className={`${gameWidth()} mx-auto flex flex-col gap-6 my-4`}>
                <div
                    className={`text-xl text-center ${
                        game?.winner
                            ? `bg-primary text-primary-content`
                            : `text-primary`
                    }  p-2 rounded border-primary border-2`}
                >
                    {game?.winner
                        ? `Player ${game?.winner} wins!`
                        : game?.isDraw
                        ? "It's a draw!"
                        : `Player ${game?.currentPlayer}'s turn`}
                </div>

                <Board
                    board={game?.board ?? []}
                    handleCellClick={handleCellClick}
                    hasWinner={!!game?.winner}
                    isDraw={!!game?.isDraw}
                />

                <div className="flex flex-col gap-4">
                    <button
                        className="btn btn-primary w-full"
                        onClick={handleRestartGame}
                    >
                        Restart game
                    </button>
                    <button
                        className="btn btn-secondary w-full"
                        onClick={handleResetGame}
                    >
                        Main menu
                    </button>
                </div>
            </div>
        </div>
    );
}
