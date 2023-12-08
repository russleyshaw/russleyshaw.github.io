import { RouteObject } from "react-router-dom";

import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { PostPage } from "./pages/PostPage";

export const routes: RouteObject[] = [
    {
        element: <RootLayout />,
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/blog/:slug",
                element: <PostPage />,
            },
        ],
    },
];
