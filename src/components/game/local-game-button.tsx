import React, { useCallback, useRef, useState } from "react";
import { useLocalGameStore } from "@/stores/local-game-store";
import CoreIcon from "../core/core-icon";
import toast from "react-hot-toast";
import CoreToaster from "../core/core-toaster";
import { useRouter } from "@/routes/hooks";

// --------------------------------------------------------------

const LocalGameButton = () => {
    const router = useRouter();
    const { game, newGame } = useLocalGameStore();
    const [form, setForm] = useState({
        gameName: "",
        currentPlayer: "X",
        boardSize: 3,
        winningCondition: 3,
    });

    const ref = useRef<HTMLDialogElement>(null);
    const handleShow = useCallback(() => {
        ref.current?.showModal();
    }, [ref]);

    const handleClose = useCallback(() => {
        ref.current?.close();
    }, [ref]);

    const handleStartNewGame = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await newGame(
                "Local",
                "X",
                Number(form.boardSize),
                form.winningCondition
            );
            handleClose();
            router.push("/local");
        } catch (error) {
            // TODO: Handle error for zod validation

            toast.error("Failed to start new game");
        }
    };

    return (
        <>
            <button className="btn btn-secondary btn-wide" onClick={handleShow}>
                Local game <CoreIcon.WifiSlash size={24} />
            </button>

            <dialog id={"local-game-modal"} ref={ref} className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>

                    <div className="flex flex-col gap-4">
                        <div className="font-bold text-2xl text-center">
                            Choose game settings{" "}
                            <span className="text-base bg-primary text-primary-content p-2 rounded-lg mx-2">
                                Local
                            </span>
                        </div>

                        <form
                            className="flex flex-col gap-4 rounded-md"
                            onSubmit={handleStartNewGame}
                        >
                            <div className="flex flex-col gap-2">
                                <label>Board size</label>
                                <input
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={form.boardSize}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            boardSize: Number(e.target.value),
                                        })
                                    }
                                    className="input input-primary"
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label>Winning condition</label>
                                <input
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    value={form.winningCondition}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            winningCondition: Number(
                                                e.target.value
                                            ),
                                        })
                                    }
                                    min={3}
                                    max={form.boardSize}
                                    className="input input-primary"
                                />
                                <div className="label -mt-2">
                                    <span className="label-text-alt text-opacity-50">
                                        How many in a row to win?
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row gap-4 align-middle justify-between">
                                    {game && (
                                        <button
                                            className="btn btn-secondary flex-1"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.push("/local");
                                            }}
                                        >
                                            Continue
                                        </button>
                                    )}

                                    <button
                                        className="btn btn-primary flex-1"
                                        type={"submit"}
                                    >
                                        New game
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <CoreToaster />
            </dialog>
        </>
    );
};

export default LocalGameButton;
