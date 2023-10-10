import { observer } from "mobx-react";
import { BLOG_POSTS, BlogPost, linkFromSlug } from "../blog";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { formatDistanceToNow } from "date-fns";
import { Tag } from "@blueprintjs/core";
import { useCallback, useMemo } from "react";
import { useTitle } from "../lib/react";
import { APP_DISPLAY_NAME } from "../config";
import { sortBy } from "lodash";

const RootDiv = styled.div`
    width: 600px;
    align-self: center;
`;

const PostsDiv = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 2em;

    gap: 1em;
`;

export const HomePage = observer(() => {
    useTitle(`Home | ${APP_DISPLAY_NAME}`);

    const sortedPosts = useMemo(() => sortBy(BLOG_POSTS, p => p.date), [BLOG_POSTS]);

    return (
        <RootDiv>
            <PostsDiv>
                {sortedPosts.map(post => (
                    <PostEntry post={post} />
                ))}
            </PostsDiv>
        </RootDiv>
    );
});

const PostEntryDiv = styled.div`
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
    gap: 0.2em;
`;

const PostEntryDate = styled.span`
    grid-area: date;
    justify-self: end;
`;

const PostEntry = observer((props: { post: BlogPost }) => {
    const { post } = props;

    const navigate = useNavigate();
    const onClick = useCallback(() => {
        const link = linkFromSlug(post.slug);
        navigate(link);
    }, [post.slug]);

    const createdAt = new Date(post.date);
    const createdAtText = formatDistanceToNow(createdAt, { addSuffix: true });
    return (
        <PostEntryDiv onClick={onClick}>
            <PostEntryTitle>{post.title}</PostEntryTitle>
            <PostEntryDescription>{post.description}</PostEntryDescription>
            <PostEntryTags>
                {post.tags.map(t => (
                    <Tag minimal>{t}</Tag>
                ))}
            </PostEntryTags>
            <PostEntryDate>published {createdAtText}</PostEntryDate>
        </PostEntryDiv>
    );
});
