import { formatDistanceToNow } from "date-fns";
import { observer } from "mobx-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getBlogRoute, parseCreatedDate } from "./blog";
import { APP_DISPLAY_NAME } from "../config";
import { useTitle } from "../lib/hooks";
import { sortBy } from "lodash";
import manifest from "./blog/manifest";
import NewBadge from "../components/NewBadge";
import { AnimatePresence, motion } from "framer-motion";

import styles from "./HomePage.module.css";

export const HomePage = observer(() => {
    useTitle(`Home | ${APP_DISPLAY_NAME}`);

    const blogs = sortBy(manifest.blogs, b => parseCreatedDate(b.created)).reverse();

    return (
        <div className={styles.root}>
            <div className={styles.posts}>
                {blogs.map(meta => (
                    <PostEntry
                        created={meta.created}
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
    tags: string[];
}

const PostEntry = observer((props: PostEntryProps) => {
    const { slug, title, tags, description, created } = props;

    const [hovered, setHovered] = useState(false);

    const navigate = useNavigate();
    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const onClick = useCallback(() => {
        navigate(getBlogRoute(slug));
    }, [slug]);

    const isNew = Date.now() - parseCreatedDate(created).getTime() < NEW_POST_THRESHOLD_MS;

    const createdAt = new Date(created);
    const createdAtText = formatDistanceToNow(createdAt, { addSuffix: true });
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
                {tags.map(t => (
                    <div className="badge">{t}</div>
                ))}
            </div>
            <div className={styles.postDate}>{createdAtText}</div>
        </motion.div>
    );
});
