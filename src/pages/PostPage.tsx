import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";
import { observer } from "mobx-react";
import { APP_DISPLAY_NAME } from "../config";
import { useTitle } from "../lib/react";

import Mdx from "../components/Mdx";
import { blogRoute } from "../router";
import styles from "./PostPage.module.css";

export const PostPage = observer(() => {
    const loaderData = blogRoute.useLoaderData();

    const { entry, component: Component } = loaderData;

    useTitle(`${entry.title} | ${APP_DISPLAY_NAME}`);

    return (
        <motion.div
            className={styles.root}
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
            <div className={styles.heading}>
                <h1 className={styles.title}>{entry.title}</h1>
                <span className={styles.description}>{entry.description}</span>
                <span className={styles.date} title={entry.created}>
                    {getCreatedContents()}
                </span>
            </div>
            <Mdx>
                <Component />
            </Mdx>
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
