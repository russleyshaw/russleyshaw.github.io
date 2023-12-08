import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";

import million from "million/compiler";
import { browserslistToTargets } from "lightningcss";
import browserslist from "browserslist";

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
    css: {
        transformer: "lightningcss",
        lightningcss: {
            targets: browserslistToTargets(browserslist(">= 0.25%")),
        },
    },
    build: {
        cssMinify: "lightningcss",
    },
});
