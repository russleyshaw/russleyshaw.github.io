import { BlogManifest } from "./";
import { lazy } from "react";

export default {
    blogs: [
        {
            title: "MDX is Markdown++",
            description: "MDX is Markdown with JSX",
            created: "2023-12-4",
            tags: ["typescript", "mdx"],
            author: "Russley Shaw",
            component: lazy(() => import("./2023-12-4-mdx-is-mdpp.mdx")),
            slug: "mdx-is-mdpp",
        },
    ],
} satisfies BlogManifest;
