import { LazyExoticComponent, lazy } from "react";

export interface BlogMeta {
    title: string;
    date: string;
    description: string;
    tags: string[];
    slug: string;
}

export interface BlogPost extends BlogMeta {
    lazy: LazyExoticComponent<() => JSX.Element>;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        title: "Undefined Element Access",
        date: "2023-9-30",
        tags: ["TypeScript", "Arrays"],

        slug: "hidden-index-undefineds",
        description:
            "Accessing first/last/rest elements and destructuring in Typescript can introduce hidden undefineds.",
        lazy: lazy(() => import("./head-tail.js")),
    },
    {
        title: "'Any' Small Scope",
        date: "2023-10-5",
        tags: ["TypeScript", "Generics"],
        slug: "any-small-scope",
        description:
            "Typescript has a powerful type system and a lot can simply be inferred, but some times a bit more massaging needs to happen.",
        lazy: lazy(() => import("./any-small-scope.js")),
    },
];

export function linkFromSlug(slug: string) {
    return `/blog/${slug}`;
}
