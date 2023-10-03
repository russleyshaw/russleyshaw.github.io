import { observer } from "mobx-react";
import { BLOG_POSTS, BlogMeta, linkFromSlug } from "../blog";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

interface PostPageProps {
    meta: BlogMeta;
    children: React.ReactNode;
}

export const PostPage = observer((props: PostPageProps) => {
    const { meta, children } = props;

    const createdAt = formatDistanceToNow(new Date(meta.date), {
        addSuffix: true,
    });
    return (
        <div>
            <h1>{meta.title}</h1>
            <span title={meta.date}>{createdAt}</span>
            <div>{children}</div>
        </div>
    );
});
