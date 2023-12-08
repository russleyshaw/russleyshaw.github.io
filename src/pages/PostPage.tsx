import { formatDistanceToNow } from "date-fns";
import { observer } from "mobx-react";
import styled from "styled-components";
import { APP_DISPLAY_NAME } from "../config";

import { Card, Code } from "@blueprintjs/core";
import { HTMLProps, Suspense } from "react";
import { Navigate, useParams } from "react-router-dom";
import { getBlogEntry } from "../blog";
import manifest from "../blog/manifest";
import { CodeBlock } from "../components/CodeBlock";
import { useTitle } from "../lib/hooks";
import { trimLines } from "../lib/string";
import { motion } from "framer-motion";

import styles from "./PostPage.module.css";

const RootDiv = styled(motion.div)`
    width: 600px;
    align-self: center;

    margin-top: 2em;

    display: flex;
    flex-direction: column;
    gap: 2em;
`;

const ContentDiv = styled.div`
    margin-bottom: 5em;
`;

function code(props: HTMLProps<HTMLDivElement>) {
    const text = props.children as any as string;
    const lines = trimLines(text).split("\n");

    if (lines.length === 1) {
        return <Code>{text}</Code>;
    }

    return <CodeBlock code={text} />;
}

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
        <RootDiv
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
            <ContentDiv className={styles.content}>
                <Suspense fallback="Loading...">
                    <meta.component components={{ code, Card: Card }} />
                </Suspense>
            </ContentDiv>
        </RootDiv>
    );
});
