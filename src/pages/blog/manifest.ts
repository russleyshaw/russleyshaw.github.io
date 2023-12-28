import { BlogManifest, BlogManifestEntry, importMdx } from ".";

export const TS_LESSONS = [
    {
        title: "TS 0: A TypeScript Vision",
        description: "An Introduction and Motivation to TypeScript",
        created: "2023-12-14",
        updated: "2023-12-22",
        tags: ["typescript", "lesson"],
        author: "Russley Shaw",
        component: importMdx(() => import("./ts-lesson-0-introduction.mdx")),
        slug: "ts-lesson-0-introduction",
    },
    {
        title: "TS 1: Basic Types",
        description: "Learn the basic types in TypeScript",
        created: "2023-12-22",
        tags: ["typescript", "lesson"],
        author: "Russley Shaw",
        component: importMdx(() => import("./ts-lesson-1-simple-types.mdx")),
        slug: "ts-lesson-1-simple-types",
    },
] satisfies BlogManifestEntry[];

export const BLOG_MANIFEST = {
    blogs: [
        ...TS_LESSONS,
        {
            title: "Diagrams as Code",
            description: "Using Mermaid to create diagrams in Markdown",
            created: "2023-12-27",
            tags: ["typescript", "mermaid"],
            author: "Russley Shaw",
            component: importMdx(() => import("./2023-12-27-diagrams-as-code.mdx")),
            slug: "diagrams-as-code",
        },
        // {
        //     title: "CSS Layouts",
        //     description: "Flex, Grid, Floats, and more",
        //     created: "2023-12-15",
        //     tags: ["css"],
        //     author: "Russley Shaw",
        //     component: lazy(() => import("./2023-12-15-css-layouts.mdx")),
        //     slug: "css-layouts",
        // },
        {
            title: "MDX is Markdown++",
            description: "MDX is Markdown with JSX",
            created: "2023-12-4",
            tags: ["typescript", "mdx"],
            author: "Russley Shaw",
            component: importMdx(() => import("./2023-12-4-mdx-is-mdpp.mdx")),
            slug: "mdx-is-mdpp",
        },
        {
            title: "Tagged Types",
            description: "Guard against unintended usage of primative types.",
            created: "2023-11-3",
            tags: ["typescript", "arrays"],
            author: "Russley Shaw",
            component: importMdx(() => import("./2023-11-3-tagged-types.mdx")),
            slug: "tagged-types",
        },
        // {
        //     title: "Heads and Tails",
        //     description: "Get the first element and the rest of an array",
        //     created: "2023-9-30",
        //     tags: ["typescript", "arrays"],
        //     author: "Russley Shaw",
        //     component: lazy(() => import("./2023-9-30-head-tail.mdx")),
        //     slug: "heads-and-tails",
        // },
        // {
        //     title: "Minimizing Ambiguous Types in TypeScript",
        //     description:
        //         "Optimizing TypeScript code by limiting the usage of any and undefined types to the smallest possible scope.",
        //     created: "2023-01-01",
        //     tags: ["typescript"],
        //     author: "Russley Shaw",
        //     component: lazy(() => import("./2023-10-6-ambiguous-types.mdx")),
        //     slug: "any-small-scope",
        // },
    ],
} satisfies BlogManifest;
