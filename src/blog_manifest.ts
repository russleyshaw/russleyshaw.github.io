export interface BlogManifestPost {
    slug: string;
    title: string;
    description: string;
    tags: string[];
}

export const BLOG_MANIFEST: BlogManifestPost[] = [
    {
        slug: "exhaustive-switch-case",
        title: "Exhaustive Switch Case",
        description: "Using never to assert things.",
        tags: ["typescript"],
    },
    {
        slug: "tagged-types",
        title: "Tagged Types",
        description: "Using branding in TS to tag a type",
        tags: ["typescript"],
    },
];
