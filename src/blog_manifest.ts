export interface BlogManifestPost {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    createdAt: Date;
    updatedAt?: Date;
}

export enum Tag {
    TS = "TypeScript",
    PY = "Python",
    Tutorial = "Tutorial",
    Snippet = "Snippet",
}

export const BLOG_MANIFEST: BlogManifestPost[] = [
    {
        slug: "running-ts-on-websites",
        title: "Running TypeScript on Websites",
        description: "Using TypeScript on the frontend.",
        tags: [Tag.TS],
        createdAt: new Date("2024-06-14"),
        updatedAt: new Date("2024-06-13"),
    },
    {
        slug: "exhaustive-switch-case",
        title: "Exhaustive Switch Case",
        description: "Using never to assert things.",
        tags: [Tag.TS],
        createdAt: new Date("2024-05-20"),
    },
    {
        slug: "tagged-types",
        title: "Tagged Types",
        description: "Using branding in TS to tag a type",
        tags: [Tag.TS],
        createdAt: new Date("2021-10-03"),
    },
];
