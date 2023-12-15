import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

import million from "million/compiler";

// https://vitejs.dev/config/
export default defineConfig({
    publicDir: "public",
    plugins: [
        million.vite({ auto: true }),
        {
            enforce: "pre",
            ...mdx({}),
        },
        react(),
    ],
});
