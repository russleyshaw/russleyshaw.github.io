import { RouteObject, createHashRouter as createMyRouter } from "react-router-dom";
import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { BLOG_POSTS, linkFromSlug } from "./blog";
import React from "react";

export enum QueryParamKey {
    EULA_DIALOG = "eulaDg",
    CHANGELOG_DIALOG = "clgDg",
    SETTINGS_DRAWER = "stgDr",
}

export function createRouter() {
    return createMyRouter([
        {
            element: <RootLayout />,
            children: [
                {
                    path: "/",
                    element: <HomePage />,
                },
                ...BLOG_POSTS.map(
                    (post): RouteObject => ({
                        path: linkFromSlug(post.slug),
                        element: (
                            <React.Suspense fallback="Loading...">
                                <post.lazy />
                            </React.Suspense>
                        ),
                    }),
                ),
            ],
        },
    ]);
}
