import { LazyExoticComponent } from "react";
import { parse } from "date-fns";

export interface BlogManifestEntry {
    title: string;
    description: string;
    created: string;
    tags: string[];
    author: string;
    slug: string;

    component: LazyExoticComponent<any>;
}

export interface BlogManifest {
    blogs: BlogManifestEntry[];
}

export function getBlogRoute(slug: string) {
    return `/blog/${slug}`;
}

export function parseCreatedDate(created: string) {
    return parse(created, "yyyy-MM-dd", new Date(0));
}

export function getBlogEntry(manifest: BlogManifest, slug: string) {
    const entry = manifest.blogs.find(blog => blog.slug === slug);
    if (!entry) {
        throw new Error(`No blog entry found for ${slug}`);
    }

    return entry;
}
