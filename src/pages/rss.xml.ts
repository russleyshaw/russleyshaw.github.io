import rss from "@astrojs/rss";
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

export const GET: APIRoute = async (context) => {
    const blog = await getCollection("blog");
    return rss({
        title: "Russley Shaw",
        description: "Senior Software Engineer",
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        site: context.site!,
        items: blog.map((post) => ({
            title: post.data.title,
            pubDate: post.data.pubDate,
            description: post.data.description,
            link: `/blog/${post.slug}`,
        })),
        customData: "<language>en-us</language>",
    });
};
