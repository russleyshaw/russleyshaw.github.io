import Handlebars from "handlebars";
import { sortBy } from "lodash";
import path from "path";
import { read } from "to-vfile";
import { matter } from "vfile-matter";
import { ZodError } from "zod";
import { BlogFrontMatterSchema, parseCreatedDate } from "../pages/blog";

interface TemplateInfo {
    blogs: Array<{
        title: string;
        description: string;
        created: string;
        tags: string[];
        author: string;
        slug: string;
        filename: string;
    }>;
}

async function main() {
    const template = Handlebars.compile<TemplateInfo>(
        `
import { BlogManifest } from "./";
import { lazy } from "react";

export default {

    blogs: [
        {{#each blogs}}
        {
            title: "{{title}}",
            description: "{{description}}",
            created: "{{created}}",
            tags: [{{#each tags}}"{{this}}",{{/each}}],
            author: "{{author}}",
            component: lazy(() => import("./{{filename}}")),
            slug: "{{slug}}",
        },
        {{/each}}
    ]
} satisfies BlogManifest;
`,
    );

    const templateInfo: TemplateInfo = {
        blogs: [],
    };

    const blogFolder = "./src/blog";
    const mdxFiles = new Bun.Glob("./src/blog/*.mdx");
    for await (const blogPath of mdxFiles.scan()) {
        const file = await read(blogPath);
        matter(file);

        const relativeFilePath = path.relative(blogFolder, blogPath);

        try {
            const frontMatter = BlogFrontMatterSchema.parse(file.data.matter);

            templateInfo.blogs.push({
                ...frontMatter,
                filename: relativeFilePath,
            });
        } catch (err: unknown) {
            if (err instanceof ZodError) {
                console.error(`Error parsing ${path}`);
                for (const e of err.errors) {
                    console.error(`> ${e.code}: ${e.message} at ${e.path.join(".")}`);
                }
            } else {
                console.error(err);
            }
            continue;
        }
    }

    templateInfo.blogs = sortBy(templateInfo.blogs, b => parseCreatedDate(b.created)).reverse();

    await Bun.write("src/blog/manifest.ts", template(templateInfo));
}

main()
    .then(() => {
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
