"use client";

import { usePathname } from "next/navigation";
import { BLOG_MANIFEST } from "../../../blog_manifest";
import Tag from "../../../components/Tag";
import DateSince from "../../../components/DateSince";

export default function PostLayout(props: { children: React.ReactNode }) {
    const pathname = usePathname();
    const meta = BLOG_MANIFEST.find((post) => pathname.endsWith(post.slug));

    return (
        <div className="flex flex-col gap-2 max-w-2xl self-center">
            <h1>{meta?.title ?? "Blog Title Here"}</h1>
            <div className="flex flex-row justify-between gap-4">
                <span className="opacity-50">{meta?.description ?? "Fill out Description"}</span>
                <div className="flex flex-wrap flex-row gap-1 self-end">
                    {(meta?.tags ?? []).map((t) => (
                        <Tag key={t}>{t}</Tag>
                    ))}
                </div>
            </div>

            <div className="flex flex-row justify-between text-sm">
                <div>
                    Created <DateSince date={meta?.createdAt ?? new Date(0)} />
                </div>

                {meta?.updatedAt && (
                    <div>
                        Updated <DateSince date={meta.updatedAt} />
                    </div>
                )}
            </div>

            <hr />

            <div className="flex flex-col gap-4 mb-[10rem] blog-content min-w-[600px]">
                {props.children}
            </div>
        </div>
    );
}
