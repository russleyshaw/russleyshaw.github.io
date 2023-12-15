import { formatDistanceToNow } from "date-fns";
import { motion, stagger } from "framer-motion";
import { observer } from "mobx-react";
import React, { Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getBlogEntry } from "./blog";
import manifest from "./blog/manifest";
import { APP_DISPLAY_NAME } from "../config";
import { useTitle } from "../lib/hooks";

import styles from "./PostPage.module.css";
import { CodeBlock } from "../components/CodeBlock";

const components = {
    pre: (props: any) => {
        console.log("Pre", props);
        if (props.children.type === "code") {
            console.log("Code", props.children);
            const language = props.children.props.className?.replace("language-", "");
            return <CodeBlock code={props.children.props.children} language={language} />;
        }

        return <pre {...props} />;
    },
};

export const PostPage = observer(() => {
    const params = useParams();
    const slug = params.slug;
    if (!slug) {
        return <Navigate to="/" />;
    }

    const meta = getBlogEntry(manifest, slug);

    useTitle(`${meta.title} | ${APP_DISPLAY_NAME}`);

    const createdAt = formatDistanceToNow(new Date(meta.created), {
        addSuffix: true,
    });
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
                <h1 className={styles.title}>{meta.title}</h1>
                <span className={styles.description}>{meta.description}</span>
                <span className={styles.date} title={meta.created}>
                    {createdAt}
                </span>
            </div>

            <div className={styles.content}>
                <Suspense fallback="Loading...">
                    <meta.component components={components} />
                </Suspense>
            </div>
        </motion.div>
    );
});
