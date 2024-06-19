import React, { useCallback, useRef, useState } from "react";
import CoreIcon from "../core/core-icon";
import { ApiError } from "@/types/api";
import CoreToaster from "../core/core-toaster";
import { findError } from "@/utils/error";
import { useRouter } from "@/routes/hooks";

// --------------------------------------------------------------

const JoinOnlineGameButton = () => {
    const router = useRouter();
    const [errorMap] = useState<ApiError[]>([]);
    const ref = useRef<HTMLDialogElement>(null);
    const handleShow = useCallback(() => {
        ref.current?.showModal();
    }, [ref]);

    const [form, setForm] = useState({
        gameName: "",
    });

    const handleStartNewGame = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`/online/${form.gameName}`);
    };

    return (
        <>
            <button className="btn btn-accent btn-wide" onClick={handleShow}>
                Join online game <CoreIcon.UserPlus size={24} />
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
                            Join an existing game{" "}
                            <span className="text-base bg-accent text-accent-content p-2 rounded-lg mx-2">
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
                                    className={`input input-accent ${
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
                                            Ask your friend for the game name
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row gap-4 align-middle justify-between">
                                    <button
                                        className="btn btn-accent flex-1"
                                        type={"submit"}
                                    >
                                        Join game
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

export default JoinOnlineGameButton;
