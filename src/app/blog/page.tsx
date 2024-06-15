import Link from "next/link";
import { BLOG_MANIFEST } from "../../blog_manifest";
import Tag from "../../components/Tag";
import DateSince from "../../components/DateSince";

export default function () {
    return (
        <div className="p-4 flex flex-col gap-4 items-start self-center">
            <h2>Blog Posts</h2>
            <div className="flex flex-col gap-4 items-stretch">
                {BLOG_MANIFEST.map((b) => (
                    <div
                        key={b.slug}
                        className="grid grid-cols-2 p-4 bg-black/25 border border-black rounded-xl gap-2"
                    >
                        <Link href={`/blog/${b.slug}`}>{b.title}</Link>

                        <div className="justify-self-end text-sm">
                            {!b.updatedAt && (
                                <>
                                    Created <DateSince date={b.createdAt} />
                                </>
                            )}
                            {b.updatedAt && (
                                <>
                                    Updated <DateSince date={b.updatedAt} />
                                </>
                            )}
                        </div>

                        <span className="text-sm opacity-50">{b.description}</span>

                        <div className="flex flex-wrap flex-row gap-1 justify-self-end">
                            {b.tags.map((b) => (
                                <Tag key={b}>{b}</Tag>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
