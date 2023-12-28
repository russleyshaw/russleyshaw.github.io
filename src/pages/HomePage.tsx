import { formatDistanceToNow } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { sortBy } from "lodash";
import { observer } from "mobx-react";
import { useCallback, useState } from "react";
import NewBadge from "../components/NewBadge";
import { APP_DISPLAY_NAME } from "../config";
import { useTitle } from "../lib/react";
import { parseCreatedDate } from "./blog";

import { useNavigate } from "@tanstack/react-router";
import styles from "./HomePage.module.css";
import { BLOG_MANIFEST } from "./blog/manifest";

export const HomePage = observer(() => {
    useTitle(`Home | ${APP_DISPLAY_NAME}`);

    const blogs = sortBy(BLOG_MANIFEST.blogs, (b) => {
        if (b.updated) return parseCreatedDate(b.updated);

        return parseCreatedDate(b.created);
    }).reverse();

    return (
        <div className={styles.root}>
            <div className={styles.posts}>
                {blogs.map((meta) => (
                    <PostEntry
                        created={meta.created}
                        updated={meta.updated}
                        description={meta.description}
                        slug={meta.slug}
                        tags={meta.tags}
                        title={meta.title}
                        key={meta.slug}
                    />
                ))}
            </div>
        </div>
    );
});

const NEW_POST_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 7;

interface PostEntryProps {
    slug: string;
    title: string;
    description: string;
    created: string;
    updated?: string;
    tags: string[];
}

const PostEntry = observer((props: PostEntryProps) => {
    const { slug, title, tags, description, created, updated } = props;

    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate();
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const onClick = useCallback(() => {
        navigate({ to: "/blog/$slug", params: { slug } });
    }, [slug]);

    const updatedDate = updated ? parseCreatedDate(updated) : parseCreatedDate(created);

    const isNew = Date.now() - updatedDate.getTime() < NEW_POST_THRESHOLD_MS;

    return (
        <motion.div
            className={styles.postEntry}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onClick}
            initial={{
                opacity: 0,
                x: 20,
            }}
            animate={{
                opacity: 1,
                x: 0,
            }}
            exit={{
                opacity: 0,
                x: 20,
            }}
        >
            <div className={styles.newBadge}>
                <AnimatePresence>{isNew && <NewBadge wiggle={hovered} />}</AnimatePresence>
            </div>

            <h3 className={styles.title}>{title}</h3>
            <div className={styles.description}>{description}</div>
            <div className={styles.tags}>
                {tags.map((t) => (
                    <div key={t} className="badge">
                        {t}
                    </div>
                ))}
            </div>
            <div className={styles.postDate}>{getDateContents()}</div>
        </motion.div>
    );

    function getDateContents() {
        if (props.updated) {
            const updatedAt = formatDistanceToNow(new Date(props.updated), {
                addSuffix: true,
            });
            return `Updated ${updatedAt}`;
        }

        const createdAt = formatDistanceToNow(new Date(props.created), {
            addSuffix: true,
        });

        return `Created ${createdAt}`;
    }
});
