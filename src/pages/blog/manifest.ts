import { BlogManifest } from ".";
import { lazy } from "react";

export default {
    blogs: [
        {
            title: "CSS Layouts",
            description: "Flex, Grid, Floats, and more",
            created: "2023-12-15",
            tags: ["css"],
            author: "Russley Shaw",
            component: lazy(() => import("./2023-12-15-css-layouts.mdx")),
            slug: "css-layouts",
        },
        {
            title: "MDX is Markdown++",
            description: "MDX is Markdown with JSX",
            created: "2023-12-4",
            tags: ["typescript", "mdx"],
            author: "Russley Shaw",
            component: lazy(() => import("./2023-12-4-mdx-is-mdpp.mdx")),
            slug: "mdx-is-mdpp",
        },
        {
            title: "Tagged Types",
            description: "Guard against unintended usage of primative types.",
            created: "2023-11-3",
            tags: ["typescript", "arrays"],
            author: "Russley Shaw",
            component: lazy(() => import("./2023-11-3-tagged-types.mdx")),
            slug: "tagged-types",
        },
        {
            title: "Heads and Tails",
            description: "Get the first element and the rest of an array",
            created: "2023-9-30",
            tags: ["typescript", "arrays"],
            author: "Russley Shaw",
            component: lazy(() => import("./2023-9-30-head-tail.mdx")),
            slug: "heads-and-tails",
        },
        {
            title: "Minimizing Ambiguous Types in TypeScript",
            description:
                "Optimizing TypeScript code by limiting the usage of any and undefined types to the smallest possible scope.",
            created: "2023-01-01",
            tags: ["typescript"],
            author: "Russley Shaw",
            component: lazy(() => import("./2023-10-6-ambiguous-types.mdx")),
            slug: "any-small-scope",
        },
    ],
} satisfies BlogManifest;
