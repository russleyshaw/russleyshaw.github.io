import { LazyExoticComponent, lazy } from "react";

interface BlogPost {
    title: string;
    date: string;
    description: string;
    tags: string[];
    slug: string;
    lazy: LazyExoticComponent<() => JSX.Element>;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        title: "Head Tail",
        date: "2021-04-01",
        tags: ["head", "tail", "command line"],

        slug: "head-tail",
        description: "A simple head-tail command line utility",
        lazy: lazy(() => import("./head-tail.js")),
    },
];

export function linkFromSlug(slug: string) {
    return `/blog/${slug}`;
}
