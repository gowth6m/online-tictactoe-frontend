import { Navigate, useRoutes } from "react-router";
import { mainRoutes } from "./main-routes";

// ----------------------------------------------------------------------

export default function Routes() {
    return useRoutes([
        // Main routes
        ...mainRoutes,

        // No match 404
        { path: "*", element: <Navigate to="/404" replace /> },
    ]);
}
