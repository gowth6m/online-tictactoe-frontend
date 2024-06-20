import React, { useEffect } from "react";
import { useSessionStore } from "@/stores/session-store";
import { useNavigate } from "react-router-dom";
import LoadingScreen from "@/components/loading/loading-screen";

interface Props {
    children: React.ReactNode;
}

const SessionGuard: React.FC<Props> = ({ children }) => {
    const { session, loading, initialiseSession } = useSessionStore();
    const navigate = useNavigate();

    useEffect(() => {
        initialiseSession();
    }, [initialiseSession]);

    useEffect(() => {
        if (!loading && !session) {
            navigate("/");
        }
    }, [loading, session, navigate]);

    if (loading || !session) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
};

export default SessionGuard;
