import "@/styles/globals.css";
import { App } from "@/app";
import { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import LoadingScreen from "./components/loading/loading-screen";

// ---------------------------------------------------------

const root = createRoot(document.getElementById("root")!);

root.render(
    <HelmetProvider>
        <BrowserRouter>
            <Suspense fallback={<LoadingScreen />}>
                <App />
            </Suspense>
        </BrowserRouter>
    </HelmetProvider>
);
