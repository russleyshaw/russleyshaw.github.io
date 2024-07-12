import MillionLint from "@million/lint";
// next.config.js

import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
const withMDX = createMDX({
    // Add markdown plugins here, as desired
    options: {
        remarkPlugins: [
            remarkGfm,
            [
                remarkToc,
                {
                    maxDepth: 2,
                },
            ],
            remarkRehype,
        ],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
    },
});
const config = withMDX({
    pageExtensions: ["js", "jsx", "md", "mdx", "tsx", "ts"],
});
export default MillionLint.next({
    rsc: true,
})(config);
