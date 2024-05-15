import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import { visualizer } from "rollup-plugin-visualizer";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";

import million from "million/compiler";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: "public",
  plugins: [
    million.vite({ auto: true }),
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkGfm, [remarkToc, { maxDepth: 1 }]],
      }),
    },
    react(),
    visualizer(),
    TanStackRouterVite(),
  ],
});
