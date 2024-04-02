import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { observer } from "mobx-react";
import { APP_DISPLAY_NAME } from "../config";
import { useTitle } from "../lib/react";

import MdxContent from "../components/MdxContent";
import { blogRoute } from "../router";
import { Tag } from "../components/aria/Tag";

export const PostPage = observer(() => {
    const loaderData = blogRoute.useLoaderData();

    const { entry, component: Component } = loaderData;

    useTitle(`${entry.title} | ${APP_DISPLAY_NAME}`);

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            exit={{
                opacity: 0,
                y: 20,
            }}
            transition={{
                duration: 0.5,
            }}
        >
            <div className="mb-4 grid grid-cols-2 gap-4">
                <h1 className="">{entry.title}</h1>

                <span title={entry.created} className="justify-self-end">
                    {getCreatedContents()}
                </span>

                <span className="text-sm">{entry.description}</span>
                <div className="flex flex-row flex-wrap justify-self-end gap-2">
                    {entry.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                    ))}
                </div>
            </div>
            <hr />
            <MdxContent>
                <Component />
            </MdxContent>
        </motion.div>
    );

    function getCreatedContents() {
        if (entry.updated) {
            const updatedAt = formatDistanceToNow(new Date(entry.updated), {
                addSuffix: true,
            });
            return `Updated ${updatedAt}`;
        }

        const createdAt = formatDistanceToNow(new Date(entry.created), {
            addSuffix: true,
        });

        return `Created ${createdAt}`;
    }
});
