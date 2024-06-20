import { useSessionStore } from "@/stores/session-store";
import { useCallback, useEffect, useRef, useState } from "react";

const SessionInfo = () => {
    const { session, resetSession } = useSessionStore();
    const [isClient, setIsClient] = useState(false);
    const ref = useRef<HTMLDialogElement>(null);

    const handleShow = useCallback(() => {
        ref.current?.showModal();
    }, [ref]);

    const handleClose = useCallback(() => {
        ref.current?.close();
    }, [ref]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="card card-compact w-84 bg-transparent border-primary border-2">
            <div className="card-body">
                <h2 className="card-title text-primary">Session Info</h2>
                <div className="text-sm text-white flex flex-col gap-2">
                    {session ? (
                        <>
                            <div>{session.id}</div>
                            {isClient && (
                                <div className="text-opacity-50">
                                    Expires At:{" "}
                                    {new Date(
                                        session.expiresAt
                                    ).toLocaleString()}
                                </div>
                            )}
                            <button
                                onClick={() => {
                                    handleShow();
                                }}
                                className="btn btn-primary"
                            >
                                Reset Session
                            </button>
                        </>
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>

            <dialog ref={ref} id="session-info-dialog" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>

                    <div className="flex flex-col gap-4">
                        <p className="mt-4">
                            Are you sure? This will prevent you from joining
                            previous games you played online!
                        </p>

                        <div className="flex flex-row gap-4">
                            <button
                                className="btn btn-secondary flex-1"
                                onClick={() => {
                                    handleClose();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="btn btn-primary flex-1"
                                onClick={() => {
                                    resetSession();
                                    handleClose();
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default SessionInfo;
