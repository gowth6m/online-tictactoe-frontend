/* eslint-disable react-refresh/only-export-components */
import LoadingScreen from "@/components/loading/loading-screen";
import { useSessionStore } from "@/stores/session-store";
import {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

// ----------------------------------------------------------------------

interface SessionContextType {
    initialised: boolean;
    loading: boolean;
}

const SessionContext = createContext<SessionContextType | null>(null);

const SessionProvider = ({ children }: { children: ReactNode }) => {
    const { initialiseSession, loading } = useSessionStore();
    const [initialised, setInitialised] = useState(false);

    useEffect(() => {
        initialiseSession().then(() => {
            setInitialised(true);
        });
    }, [initialiseSession]);

    if (!initialised) {
        return <LoadingScreen />;
    }

    return (
        <SessionContext.Provider
            value={{
                initialised,
                loading,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

const useSessionContext = () => {
    const context = useContext(SessionContext);
    if (!context) {
        throw new Error(
            "useSessionContext must be used within a SessionProvider"
        );
    }
    return context;
};

export { SessionProvider, useSessionContext };
