import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import rehypeHighlight from "rehype-highlight";

import million from "million/compiler";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        million.vite({ auto: true }),
        {
            enforce: "pre",
            ...mdx({
                remarkPlugins: [remarkFrontmatter],
            }),
        },
        react(),
    ],
});
