"use client";

import { usePathname } from "next/navigation";
import { BLOG_MANIFEST } from "../../../blog_manifest";
import Tag from "../../../components/Tag";

export default function PostLayout(props: { children: React.ReactNode }) {
    const pathname = usePathname();
    const meta = BLOG_MANIFEST.find((post) => pathname.endsWith(post.slug));

    if (!meta) {
        return <div>Post Info Not Found</div>;
    }

    return (
        <div className="flex flex-col gap-2 max-w-2xl self-center">
            <h1>{meta.title}</h1>
            <span className="opacity-50">{meta.description}</span>
            <div className="flex flex-wrap flex-row gap-1 self-end">
                {meta.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                ))}
            </div>
            <hr />

            <div className="flex flex-col gap-4">{props.children}</div>
        </div>
    );
}
