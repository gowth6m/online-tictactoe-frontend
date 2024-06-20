/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { Outlet } from "react-router-dom";
import BaseLayout from "@/layouts/base-layout";
import IndexPage from "@/pages/index-page";
import LocalIndexPage from "@/pages/local/local-index-page";
import SessionGuard from "./guards/session-guard";

// ----------------------------------------------------------------------

const Page404 = lazy(() => import("../pages/404-page"));
const OnlineGameNameIndexPage = lazy(
    () => import("../pages/online/[gameName]")
);

// ----------------------------------------------------------------------

export const mainRoutes = [
    {
        path: "/",
        element: (
            <BaseLayout>
                <Outlet />
            </BaseLayout>
        ),
        children: [
            {
                path: "/",
                element: <IndexPage />,
            },
            {
                path: "/local",
                element: <LocalIndexPage />,
            },
            {
                path: "/online/:gameName",
                element: (
                    <SessionGuard>
                        <OnlineGameNameIndexPage />
                    </SessionGuard>
                ),
            },

            { path: "404", element: <Page404 /> },
        ],
    },
];
