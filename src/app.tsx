import Routes from "@/routes";
import CoreToast from "@/components/core/core-toaster";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "./providers/session-provider";

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
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <CoreToast />
                <Routes />
            </SessionProvider>
        </QueryClientProvider>
    );
}
