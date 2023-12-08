import { mkdir } from "fs/promises";
import path from "path";
import { getBlogRoute } from "../blog";
import manifest from "../blog/manifest";

async function main() {
    const baseIndexFile = "dist/index.html";
    const indexHtml = await Bun.file(baseIndexFile).text();

    const staticRoutes = ["/"];
    const blogRoutes = manifest.blogs.map(blog => getBlogRoute(blog.slug));

    const realRoutes = [...staticRoutes, ...blogRoutes];

    for (const route of realRoutes) {
        const filePath = path.join("dist", route, "index.html");
        await mkdir(path.dirname(filePath), { recursive: true });

        console.log(`Writing ${filePath}`);
        const newHtmlFile = Bun.file(filePath);
        await Bun.write(newHtmlFile, indexHtml);
    }
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
