import { RootLayout } from "./layouts/RootLayout";

import { RootRoute, Route, Router } from "@tanstack/react-router";
import { PostPage } from "./pages/PostPage";
import { HomePage } from "./pages/HomePage";
import { getBlogEntry } from "./pages/blog";
import { BLOG_MANIFEST } from "./pages/blog/manifest";

const rootRoute = new RootRoute({
    component: () => <RootLayout />,
});

const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: HomePage,
});

export const blogRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/blog/$slug",
    component: PostPage,
    loader: async ({ params }) => {
        const entry = getBlogEntry(BLOG_MANIFEST, params.slug);
        const component = await entry.component();

        return {
            entry,
            component,
        };
    },
});

const routeTree = rootRoute.addChildren([indexRoute, blogRoute]);

export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
