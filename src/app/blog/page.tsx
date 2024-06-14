import Link from "next/link";
import { BLOG_MANIFEST } from "../../blog_manifest";
import Tag from "../../components/Tag";

export default function () {
    return (
        <div className="p-4 flex flex-col gap-4 items-start">
            <h2>Blog Posts</h2>
            {BLOG_MANIFEST.map((b) => (
                <div key={b.slug} className="flex flex-col p-4 border border-white rounded gap-2">
                    <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                    <span className="text-sm opacity-50">{b.description}</span>

                    <div className="flex flex-wrap flex-row gap-1">
                        {b.tags.map((b) => (
                            <Tag key={b}>{b}</Tag>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
