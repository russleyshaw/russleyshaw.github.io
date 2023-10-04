import { observer } from "mobx-react";
import { BlogMeta } from "../blog";
import { formatDistanceToNow } from "date-fns";
import styled from "styled-components";
import { useTitle } from "../lib/react";
import { APP_DISPLAY_NAME } from "../config";

interface PostPageProps {
    meta: BlogMeta;
    children: React.ReactNode;
}

const RootDiv = styled.div`
    width: 600px;
    align-self: center;

    margin-top: 2em;

    display: flex;
    flex-direction: column;
    gap: 2em;
`;

const HeadingDiv = styled.div`
    padding-bottom: 0.5em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    display: flex;
    align-items: end;
    justify-content: space-between;
`;

const ContentDiv = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;

    p {
        line-height: 1.75em;
    }
`;

export const PostPage = observer((props: PostPageProps) => {
    const { meta, children } = props;

    useTitle(`${meta.title} | ${APP_DISPLAY_NAME}`);

    const createdAt = formatDistanceToNow(new Date(meta.date), {
        addSuffix: true,
    });
    return (
        <RootDiv>
            <HeadingDiv>
                <h1>{meta.title}</h1>
                <span title={meta.date}>published {createdAt}</span>
            </HeadingDiv>
            <ContentDiv>{children}</ContentDiv>
        </RootDiv>
    );
});
