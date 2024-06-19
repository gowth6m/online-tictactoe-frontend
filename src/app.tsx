import Routes from "@/routes";
import { useEffect } from "react";
import CoreToast from "@/components/core/core-toaster";
import { useSessionStore } from "./stores/session-store";
import { QueryClient, QueryClientProvider } from "react-query";

// ----------------------------------------------------------------------

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
        },
    },
});

export function App() {
    const { initialiseSession } = useSessionStore();

    useEffect(() => {
        initialiseSession();
    }, [initialiseSession]);

    return (
        <QueryClientProvider client={queryClient}>
            <CoreToast />
            <Routes />
        </QueryClientProvider>
    );
}
