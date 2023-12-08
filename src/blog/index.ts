import z from "zod";

import { LazyExoticComponent } from "react";
import { parse } from "date-fns";

export const BlogFrontMatterSchema = z.object({
    title: z.string(),
    description: z.string(),
    created: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    slug: z.string(),
});

export type BlogFrontMatter = z.infer<typeof BlogFrontMatterSchema>;

export interface BlogManifestEntry extends BlogFrontMatter {
    component: LazyExoticComponent<any>;
}

export interface BlogManifest {
    blogs: BlogManifestEntry[];
}

export function pathToSlug(filepath: string) {
    // Get last part of path
    const filename = filepath.split("/").pop()!;

    // Remove extension
    const slug = filename.replace(/\.[^.]+$/, "");
    return slug;
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
