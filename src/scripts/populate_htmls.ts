import { mkdir } from "fs/promises";
import path from "path";
import { isNotNil } from "../lib/common";
import { routes } from "../router";

const baseIndexFile = "dist/index.html";

async function main() {
    let open = routes.map(route => ({ route, path: [route.path] }));

    let realRoutes: string[] = [];

    while (open.length > 0) {
        const route = open.shift()!;
        const path = route.path.filter(isNotNil);

        if ((path.length > 0 && route.route.element) || route.route.Component) {
            console.log(`Rendering ${path}`);
            realRoutes.push(path.join("/"));
        }

        for (const childRoute of route.route?.children ?? []) {
            open.push({ route: childRoute, path: [...path, childRoute.path].filter(isNotNil) });
        }
    }

    const indexFile = Bun.file(baseIndexFile);
    const indexHtml = await indexFile.text();

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
        console.log("Done");
    })
    .catch(err => {
        console.error(err);
    });
