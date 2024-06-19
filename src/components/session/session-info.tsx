import { useSessionStore } from "@/stores/session-store";
import { useEffect, useState } from "react";

const SessionInfo = () => {
    const { session, resetSession } = useSessionStore();
    const [isClient, setIsClient] = useState(false);

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
                                    resetSession();
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
        </div>
    );
};

export default SessionInfo;
