import { type BlogManifest, type BlogManifestEntry, importMdx } from ".";
import { IS_DEV_MODE } from "../../env";

const BLOG_ENTRIES: BlogManifestEntry[] = [
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
        description: "Guard against unintended usage of primitive types.",
        created: "2023-11-3",
        tags: ["typescript", "arrays"],
        author: "Russley Shaw",
        component: importMdx(() => import("./2023-11-3-tagged-types.mdx")),
        slug: "tagged-types",
    },
];

export const BLOG_MANIFEST = {
    blogs: BLOG_ENTRIES.filter((blog) => {
        if (IS_DEV_MODE) return true;
        return !blog.draft;
    }),
} satisfies BlogManifest;
