/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";
import { Outlet } from "react-router-dom";
import BaseLayout from "@/layouts/base-layout";
import IndexPage from "@/pages/index-page";

// ----------------------------------------------------------------------

const Page404 = lazy(() => import("../pages/404-page"));

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

            { path: "404", element: <Page404 /> },
        ],
    },
];
