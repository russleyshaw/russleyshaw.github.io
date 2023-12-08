import { Tag } from "@blueprintjs/core";
import { formatDistanceToNow } from "date-fns";
import { observer } from "mobx-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getBlogRoute, parseCreatedDate } from "../blog";
import { APP_DISPLAY_NAME } from "../config";
import { useTitle } from "../lib/hooks";
import { sortBy } from "lodash";
import manifest from "../blog/manifest";
import NewBadge from "../components/NewBadge";
import { AnimatePresence, motion } from "framer-motion";

const RootDiv = styled.div`
    width: 600px;
    align-self: center;
`;

const PostsDiv = styled(motion.div)`
    display: flex;
    flex-direction: column;

    margin-top: 2em;

    gap: 1em;
`;

export const HomePage = observer(() => {
    useTitle(`Home | ${APP_DISPLAY_NAME}`);

    const blogs = sortBy(manifest.blogs, b => parseCreatedDate(b.created)).reverse();

    return (
        <RootDiv>
            <PostsDiv>
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
            </PostsDiv>
        </RootDiv>
    );
});

const NEW_POST_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 7;

const NewBadgeDiv = styled.div`
    position: absolute;
    top: 0;
    right: 0;

    transform: translate(50%, -50%) rotate(30deg);
`;

const PostEntryDiv = styled(motion.div)`
    position: relative;
    display: grid;

    grid-template:
        "title tags" auto
        "description date" auto / 1fr auto;
    gap: 0.5em;

    background-color: rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 1em;
    padding: 1em;

    &:hover {
        box-shadow: 0.2em 0.2em 0.25em rgba(0, 0, 0, 0.2);
    }
`;

const PostEntryTitle = styled.h3`
    grid-area: title;
`;

const PostEntryDescription = styled.span`
    grid-area: description;
    font-size: 0.9em;
`;

const PostEntryTags = styled.div`
    grid-area: tags;

    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 0.2em;
`;

const PostEntryDate = styled.span`
    grid-area: date;
    justify-self: end;
`;

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
    const onClick = useCallback(() => {
        navigate(getBlogRoute(slug));
    }, [slug]);

    const isNew = Date.now() - parseCreatedDate(created).getTime() < NEW_POST_THRESHOLD_MS;

    const createdAt = new Date(created);
    const createdAtText = formatDistanceToNow(createdAt, { addSuffix: true });
    return (
        <PostEntryDiv
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
            <NewBadgeDiv>
                <AnimatePresence>{isNew && <NewBadge wiggle={hovered} />}</AnimatePresence>
            </NewBadgeDiv>

            <PostEntryTitle>{title}</PostEntryTitle>
            <PostEntryDescription>{description}</PostEntryDescription>
            <PostEntryTags>
                {tags.map(t => (
                    <Tag minimal>{t}</Tag>
                ))}
            </PostEntryTags>
            <PostEntryDate>{createdAtText}</PostEntryDate>
        </PostEntryDiv>
    );
});
