import React, { LazyExoticComponent, lazy } from "react";

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
        title: "Head Tail",
        date: "2023-9-30",
        tags: ["head", "tail", "command line"],

        slug: "head-tail",
        description: "A simple head-tail command line utility",
        lazy: lazy(() => import("./head-tail.js")),
    },
];

export function linkFromSlug(slug: string) {
    return `/blog/${slug}`;
}
