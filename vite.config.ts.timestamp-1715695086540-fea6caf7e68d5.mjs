// vite.config.ts
import { defineConfig } from "file:///D:/Projects/Code/russleyshaw/russleyshaw.github.io/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Projects/Code/russleyshaw/russleyshaw.github.io/node_modules/@vitejs/plugin-react/dist/index.mjs";
import mdx from "file:///D:/Projects/Code/russleyshaw/russleyshaw.github.io/node_modules/@mdx-js/rollup/index.js";
import remarkGfm from "file:///D:/Projects/Code/russleyshaw/russleyshaw.github.io/node_modules/remark-gfm/index.js";
import remarkToc from "file:///D:/Projects/Code/russleyshaw/russleyshaw.github.io/node_modules/remark-toc/index.js";
import { visualizer } from "file:///D:/Projects/Code/russleyshaw/russleyshaw.github.io/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import { TanStackRouterVite } from "file:///D:/Projects/Code/russleyshaw/russleyshaw.github.io/node_modules/@tanstack/router-vite-plugin/dist/esm/index.js";
import million from "file:///D:/Projects/Code/russleyshaw/russleyshaw.github.io/node_modules/million/dist/packages/compiler.mjs";
var vite_config_default = defineConfig({
  publicDir: "public",
  plugins: [
    million.vite({ auto: true }),
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: "@mdx-js/react",
        remarkPlugins: [remarkGfm, [remarkToc, { maxDepth: 1 }]]
      })
    },
    react(),
    visualizer(),
    TanStackRouterVite()
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxQcm9qZWN0c1xcXFxDb2RlXFxcXHJ1c3NsZXlzaGF3XFxcXHJ1c3NsZXlzaGF3LmdpdGh1Yi5pb1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcUHJvamVjdHNcXFxcQ29kZVxcXFxydXNzbGV5c2hhd1xcXFxydXNzbGV5c2hhdy5naXRodWIuaW9cXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Byb2plY3RzL0NvZGUvcnVzc2xleXNoYXcvcnVzc2xleXNoYXcuZ2l0aHViLmlvL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcclxuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xyXG5pbXBvcnQgbWR4IGZyb20gXCJAbWR4LWpzL3JvbGx1cFwiO1xyXG5pbXBvcnQgcmVtYXJrR2ZtIGZyb20gXCJyZW1hcmstZ2ZtXCI7XHJcbmltcG9ydCByZW1hcmtUb2MgZnJvbSBcInJlbWFyay10b2NcIjtcclxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXZpc3VhbGl6ZXJcIjtcclxuaW1wb3J0IHsgVGFuU3RhY2tSb3V0ZXJWaXRlIH0gZnJvbSBcIkB0YW5zdGFjay9yb3V0ZXItdml0ZS1wbHVnaW5cIjtcclxuXHJcbmltcG9ydCBtaWxsaW9uIGZyb20gXCJtaWxsaW9uL2NvbXBpbGVyXCI7XHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xyXG4gIHB1YmxpY0RpcjogXCJwdWJsaWNcIixcclxuICBwbHVnaW5zOiBbXHJcbiAgICBtaWxsaW9uLnZpdGUoeyBhdXRvOiB0cnVlIH0pLFxyXG4gICAge1xyXG4gICAgICBlbmZvcmNlOiBcInByZVwiLFxyXG4gICAgICAuLi5tZHgoe1xyXG4gICAgICAgIHByb3ZpZGVySW1wb3J0U291cmNlOiBcIkBtZHgtanMvcmVhY3RcIixcclxuICAgICAgICByZW1hcmtQbHVnaW5zOiBbcmVtYXJrR2ZtLCBbcmVtYXJrVG9jLCB7IG1heERlcHRoOiAxIH1dXSxcclxuICAgICAgfSksXHJcbiAgICB9LFxyXG4gICAgcmVhY3QoKSxcclxuICAgIHZpc3VhbGl6ZXIoKSxcclxuICAgIFRhblN0YWNrUm91dGVyVml0ZSgpLFxyXG4gIF0sXHJcbn0pO1xyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtWLFNBQVMsb0JBQW9CO0FBQy9XLE9BQU8sV0FBVztBQUNsQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sZUFBZTtBQUN0QixTQUFTLGtCQUFrQjtBQUMzQixTQUFTLDBCQUEwQjtBQUVuQyxPQUFPLGFBQWE7QUFHcEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsV0FBVztBQUFBLEVBQ1gsU0FBUztBQUFBLElBQ1AsUUFBUSxLQUFLLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFBQSxJQUMzQjtBQUFBLE1BQ0UsU0FBUztBQUFBLE1BQ1QsR0FBRyxJQUFJO0FBQUEsUUFDTCxzQkFBc0I7QUFBQSxRQUN0QixlQUFlLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO0FBQUEsTUFDekQsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFBQSxJQUNYLG1CQUFtQjtBQUFBLEVBQ3JCO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
