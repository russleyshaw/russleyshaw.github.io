import { Navigate, RouteObject } from "react-router-dom";

import { RootLayout } from "./layouts/RootLayout";
import { HomePage } from "./pages/HomePage";
import { BLOG_POSTS, linkFromSlug } from "./blog";
import React from "react";
import { PostPage } from "./pages/PostPage";

export enum QueryParamKey {
    EULA_DIALOG = "eulaDg",
    CHANGELOG_DIALOG = "clgDg",
    SETTINGS_DRAWER = "stgDr",
}

export const routes: RouteObject[] = [
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
                        <PostPage meta={post}>
                            <React.Suspense fallback="Loading...">
                                <post.lazy />
                            </React.Suspense>
                        </PostPage>
                    ),
                }),
            ),
        ],
        errorElement: <Navigate to="/" />,
    },
];
