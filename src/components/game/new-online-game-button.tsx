import React, { useCallback, useRef, useState } from "react";
import CoreIcon from "../core/core-icon";
import { useMutation } from "react-query";
import ApiClient from "@/services/api-client";
import toast from "react-hot-toast";
import LoadingTopbar from "../core/loading-topbar";
import CoreToaster from "../core/core-toaster";
import { ApiError } from "@/types/api";
import { findError } from "@/utils/error";
import { useRouter } from "@/routes/hooks";

// --------------------------------------------------------------

const NewOnlineGameButton = () => {
    const router = useRouter();
    const [errorMap, setErrorMap] = useState<ApiError[]>([]);
    const ref = useRef<HTMLDialogElement>(null);
    const handleShow = useCallback(() => {
        ref.current?.showModal();
    }, [ref]);

    const [form, setForm] = useState({
        gameName: "",
        currentPlayer: "X",
        boardSize: 3,
        winningCondition: 3,
    });

    const handleClose = useCallback(() => {
        ref.current?.close();
    }, [ref]);

    const handleStartNewGame = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        newGameMutation.mutate();
    };

    const newGameMutation = useMutation({
        mutationFn: () => {
            return ApiClient.game.createGame({
                gameName: form.gameName,
                boardSize: form.boardSize,
                winningCondition: form.winningCondition,
            });
        },
        onSuccess: () => {
            handleClose();
            router.push(`/online/${form.gameName}`);
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
            setErrorMap(error.response.data.errors);
            toast.error("Failed to start new game");
        },
    });

    return (
        <>
            {newGameMutation.isLoading && <LoadingTopbar />}

            <button className="btn btn-primary btn-wide" onClick={handleShow}>
                New online game <CoreIcon.GlobeHemisphereWest size={24} />
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
                                Online
                            </span>
                        </div>

                        <form
                            className="flex flex-col gap-4 rounded-md"
                            onSubmit={handleStartNewGame}
                        >
                            <div className="flex flex-col gap-2 -mb-2">
                                <label>Game name</label>
                                <input
                                    value={form.gameName}
                                    onChange={(e) =>
                                        setForm({
                                            ...form,
                                            gameName: e.target.value,
                                        })
                                    }
                                    className={`input input-primary ${
                                        findError(errorMap, "gameName")
                                            ? "input-error"
                                            : ""
                                    }`}
                                />
                                <div className="label -mt-2">
                                    {findError(errorMap, "gameName") ? (
                                        <span className="label-text-alt text-error">
                                            {
                                                findError(errorMap, "gameName")
                                                    ?.message
                                            }
                                        </span>
                                    ) : (
                                        <span className="label-text-alt text-opacity-50">
                                            Unique game name so your friend can
                                            join
                                        </span>
                                    )}
                                </div>
                            </div>

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

export default NewOnlineGameButton;
