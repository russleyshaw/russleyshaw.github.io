import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { observer } from "mobx-react";
import { APP_DISPLAY_NAME } from "../config";
import { useTitle } from "../lib/react";

import MdxContent from "../components/MdxContent";
import { blogRoute } from "../router";

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
            <div className="">
                <h1 className="">{entry.title}</h1>
                <span>{entry.description}</span>
                <span title={entry.created}>{getCreatedContents()}</span>
            </div>
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
